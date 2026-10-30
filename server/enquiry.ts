import net from "node:net";
import type { Express, Request, Response } from "express";
import type { CampaignKey, LeadCheckResponse, LeadResponse } from "../src/types";
import {
  CleanEnquiry,
  CONTACT_METHODS,
  cleanLine,
  isSubmissionId,
  refFromSubmissionId,
  validateEnquiry,
} from "../src/landing/validation";
import { addOnPriceLabel, getAddOn, getPackage, priceLabel } from "../src/landing/content";
import { OutgoingMail, readSmtpSettings, SEND_DEADLINE_MS, sendMail, verifySmtp } from "./mailer";

// POST /api/lead and GET /api/lead/status/:id for the Digital Marketing Packages page.
// Enquiries are emailed and never stored: the only state is in memory (rate-limit counters
// and recent submission IDs with their outcome, without any personal data). Kept separate
// from /api/contact, which this module doesn't touch.

const MIN_COMPLETION_MS = 3_000;
const SUBMISSION_TTL_MS = 15 * 60_000;
const SUBMIT_WINDOW_MS = 10 * 60_000;
const SUBMIT_MAX_PER_IP = 5;
const STATUS_WINDOW_MS = 60_000;
const STATUS_MAX_PER_IP = 30;
const STATUS_MAX_TOTAL = 600;
const EMAIL_WINDOW_MS = 60 * 60_000;
const DEFAULT_EMAILS_PER_HOUR = 30;

type SubmissionState = "sending" | "accepted" | "not_sent" | "uncertain";

interface SubmissionRecord {
  state: SubmissionState;
  ref: string;
  deadlineAt: number;
  updatedAt: number;
}

const submissions = new Map<string, SubmissionRecord>();
const submitHits = new Map<string, number[]>();
const statusHits = new Map<string, number[]>();
const statusTotal: number[] = [];
const emailsSent: number[] = [];

type LogLevel = "info" | "warn";

/** One JSON line per event. Never pass names, contact details, messages or IP addresses. */
function logEvent(event: string, fields: Record<string, unknown> = {}, level: LogLevel = "info") {
  const line = JSON.stringify({ time: new Date().toISOString(), scope: "enquiry", event, ...fields });
  if (level === "warn") console.warn(line);
  else console.log(line);
}

// ---------------------------------------------------------------------------------------
// Visitor IP behind the hosting proxy
// ---------------------------------------------------------------------------------------

const TRUST_PRESETS = new Set(["loopback", "linklocal", "uniquelocal"]);

function isCidr(value: string) {
  const [address, prefix, extra] = value.split("/");
  if (extra !== undefined || prefix === undefined || !/^\d{1,3}$/.test(prefix)) return false;
  const version = net.isIP(address);
  const bits = Number(prefix);
  return (version === 4 && bits <= 32) || (version === 6 && bits <= 128);
}

/**
 * Parses TRUST_PROXY for Express's "trust proxy" setting. Only address-based values
 * (loopback, linklocal, uniquelocal, IPs, CIDR ranges) or a hop count are accepted;
 * "true" would trust spoofable X-Forwarded-For entries and is rejected.
 */
export function parseTrustProxy(raw: string | undefined): {
  value?: string | number;
  perIpLimit: boolean;
  warning?: string;
} {
  const setting = raw?.trim() ?? "";
  if (!setting || setting.toLowerCase() === "false") {
    return { perIpLimit: false, warning: "TRUST_PROXY is not set" };
  }
  if (setting.toLowerCase() === "true") {
    return { perIpLimit: false, warning: "TRUST_PROXY=true is rejected because it trusts spoofable headers" };
  }
  if (/^\d+$/.test(setting)) {
    const hops = Number(setting);
    if (hops > 10) return { perIpLimit: false, warning: "TRUST_PROXY hop count is out of range" };
    return { value: hops, perIpLimit: true };
  }
  const entries = setting.split(",").map((entry) => entry.trim()).filter(Boolean);
  const valid = entries.every(
    (entry) => TRUST_PRESETS.has(entry.toLowerCase()) || net.isIP(entry) !== 0 || isCidr(entry),
  );
  if (!entries.length || !valid) {
    return { perIpLimit: false, warning: "TRUST_PROXY has an unrecognised value" };
  }
  return { value: entries.join(","), perIpLimit: true };
}

/** The eight 16-bit groups of a valid IPv6 address, with "::" and any IPv4 tail expanded */
function expandIPv6(address: string): string[] | null {
  let addr = address;
  if (addr.includes(".")) {
    const lastColon = addr.lastIndexOf(":");
    const v4 = addr.slice(lastColon + 1);
    if (!net.isIPv4(v4)) return null;
    const o = v4.split(".").map(Number);
    addr = `${addr.slice(0, lastColon + 1)}${((o[0] << 8) | o[1]).toString(16)}:${((o[2] << 8) | o[3]).toString(16)}`;
  }
  const halves = addr.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  return [...head, ...new Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
}

/** Rate-limit key: IPv4 as is, IPv4-mapped IPv6 as IPv4, other IPv6 grouped by its /64 */
export function rateKey(ip: string | undefined): string {
  if (!ip) return "unknown";
  const address = ip.split("%")[0].toLowerCase();
  const mapped = address.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped && net.isIPv4(mapped[1])) return mapped[1];
  if (net.isIPv4(address)) return address;
  if (net.isIPv6(address)) {
    const groups = expandIPv6(address);
    if (groups) return `${groups.slice(0, 4).map((g) => parseInt(g, 16).toString(16)).join(":")}::/64`;
  }
  return address;
}

// ---------------------------------------------------------------------------------------
// In-memory counters, swept on each request (no background job)
// ---------------------------------------------------------------------------------------

function prune(times: number[], windowMs: number, now: number) {
  while (times.length && now - times[0] >= windowMs) times.shift();
}

function sweep(now: number) {
  for (const [id, record] of submissions) {
    if (now - record.updatedAt >= SUBMISSION_TTL_MS) submissions.delete(id);
  }
  for (const [map, windowMs] of [
    [submitHits, SUBMIT_WINDOW_MS],
    [statusHits, STATUS_WINDOW_MS],
  ] as const) {
    for (const [key, times] of map) {
      prune(times, windowMs, now);
      if (!times.length) map.delete(key);
    }
  }
  prune(statusTotal, STATUS_WINDOW_MS, now);
  prune(emailsSent, EMAIL_WINDOW_MS, now);
}

function underLimit(map: Map<string, number[]>, key: string, max: number) {
  return (map.get(key)?.length ?? 0) < max;
}

function hit(map: Map<string, number[]>, key: string, now: number) {
  const times = map.get(key) ?? [];
  times.push(now);
  map.set(key, times);
}

function emailsPerHour() {
  const value = Number(process.env.LEAD_MAX_EMAILS_PER_HOUR);
  return Number.isInteger(value) && value > 0 ? value : DEFAULT_EMAILS_PER_HOUR;
}

function setState(id: string, ref: string, state: SubmissionState, deadlineAt: number) {
  submissions.set(id, { state, ref, deadlineAt, updatedAt: Date.now() });
}

// ---------------------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------------------

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const CAMPAIGN_KEYS: CampaignKey[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

interface EmailContext {
  ref: string;
  possibleDuplicate: boolean;
  consentVersion: string;
  pageUrl: string;
  campaign: Partial<Record<CampaignKey, string>>;
  receivedAt: Date;
}

function composeEmail(enquiry: CleanEnquiry, ctx: EmailContext): OutgoingMail {
  const pkg = getPackage(enquiry.packageId);
  const notGiven = "Not provided";
  const addOns = enquiry.addOnIds
    .map((id) => getAddOn(id))
    .filter((addOn) => addOn !== undefined)
    .map((addOn) => `${addOn.name} (${addOnPriceLabel(addOn)})`);
  const method = CONTACT_METHODS.find((m) => m.id === enquiry.contactMethod)?.label ?? enquiry.contactMethod;
  const received = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(ctx.receivedAt);

  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: "Package",
      rows: [
        ["Package", `${pkg.name} (${priceLabel(pkg)})`],
        ["Add-ons", addOns.length ? addOns.join("; ") : "None"],
      ],
    },
    {
      title: "Contact",
      rows: [
        ["Name", enquiry.name],
        ["Business name", enquiry.businessName],
        ["Preferred contact method", method],
        ["Phone / WhatsApp", enquiry.phone || notGiven],
        ["Email", enquiry.email || notGiven],
      ],
    },
    {
      title: "Details",
      rows: [
        ["Message", enquiry.message || notGiven],
      ],
    },
    {
      title: "Consent",
      rows: [
        ["Contact about this enquiry", `By ${method.toLowerCase()} (the visitor's chosen method)`],
        ["Marketing opt-in", enquiry.marketingOptIn ? "Yes" : "No"],
        ["Consent wording version", ctx.consentVersion],
      ],
    },
    {
      title: "Source",
      rows: [
        ["Page", ctx.pageUrl || notGiven],
        ...CAMPAIGN_KEYS.filter((key) => ctx.campaign[key]).map(
          (key) => [key, ctx.campaign[key]!] as [string, string],
        ),
      ],
    },
  ];

  const duplicateNote = ctx.possibleDuplicate
    ? "Possible duplicate: an earlier attempt with this reference had an uncertain outcome, and the visitor chose to send it again."
    : "";

  const text = [
    "New enquiry from the Digital Marketing Packages page",
    duplicateNote,
    `Reference: ${ctx.ref}`,
    `Received: ${received} (UAE time)`,
    ...sections.map(
      (section) =>
        `${section.title.toUpperCase()}\n` +
        section.rows
          .map(([label, value]) => (label === "Message" ? `${label}:\n${value}` : `${label}: ${value}`))
          .join("\n"),
    ),
  ]
    .filter(Boolean)
    .join("\n\n");

  const rowHtml = ([label, value]: [string, string]) =>
    `<tr><th align="left" valign="top" style="padding:4px 16px 4px 0;color:#555;font-weight:600;white-space:nowrap">${escapeHtml(label)}</th>` +
    `<td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;

  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#16151c">` +
    `<h1 style="font-size:18px;margin:0 0 8px">New enquiry from the Digital Marketing Packages page</h1>` +
    (duplicateNote
      ? `<p style="margin:0 0 12px;padding:8px 12px;background:#fff4d6;border-radius:6px"><strong>${escapeHtml(duplicateNote)}</strong></p>`
      : "") +
    `<p style="margin:0 0 16px">Reference: <strong>${escapeHtml(ctx.ref)}</strong><br>Received: ${escapeHtml(received)} (UAE time)</p>` +
    sections
      .map(
        (section) =>
          `<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#7e22ce;margin:20px 0 6px">${escapeHtml(section.title)}</h2>` +
          `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${section.rows.map(rowHtml).join("")}</table>`,
      )
      .join("") +
    `</div>`;

  const subject = cleanLine(
    `${ctx.possibleDuplicate ? "[Possible duplicate] " : ""}New enquiry: ${pkg.name} · ${enquiry.businessName} · Ref ${ctx.ref}`,
  );

  return { subject, text, html, replyTo: enquiry.email || undefined };
}

function readContext(body: Record<string, unknown>) {
  const pageUrl = cleanLine(body.page_url).slice(0, 300);
  const rawCampaign = body.campaign && typeof body.campaign === "object" ? (body.campaign as Record<string, unknown>) : {};
  const campaign: Partial<Record<CampaignKey, string>> = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = cleanLine(rawCampaign[key]).slice(0, 200);
    if (value) campaign[key] = value;
  }
  const version = cleanLine(body.consent_version);
  return {
    pageUrl: /^https?:\/\//i.test(pageUrl) ? pageUrl : "",
    campaign,
    consentVersion: /^[\w.-]{1,40}$/.test(version) ? version : "unknown",
  };
}

// ---------------------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------------------

export function registerEnquiryRoutes(app: Express, options: { perIpLimit: boolean }) {
  if (!options.perIpLimit) {
    logEvent(
      "rate_limit_per_ip_disabled",
      { reason: "TRUST_PROXY is not configured; the per-IP limit stays off until it is verified and set" },
      "warn",
    );
  }

  app.post("/api/lead", async (req: Request, res: Response) => {
    // Express 4 doesn't catch errors from async handlers, so nothing may escape this one
    const progress = { submissionId: "", ref: "", recorded: false, sendStarted: false };
    try {
      await handleLead(req, res, options, progress);
    } catch (err) {
      const name = err instanceof Error ? err.name : "UnknownError";
      logEvent("enquiry_error", { ref: progress.ref || undefined, error: name }, "warn");
      // If the send had started, the outcome is unknown; otherwise nothing was sent
      const status = progress.sendStarted ? "uncertain" : "not_sent";
      if (progress.recorded) setState(progress.submissionId, progress.ref, status, 0);
      if (!res.headersSent) {
        res.setHeader("Cache-Control", "no-store");
        res.status(status === "uncertain" ? 504 : 503).json({ status, ref: progress.ref || undefined });
      }
    }
  });

  // Read-only status check: never sends an email and never changes anything
  app.get("/api/lead/status/:id", (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-store");
    const now = Date.now();
    sweep(now);

    const id = req.params.id;
    if (!isSubmissionId(id)) return res.status(400).json({ error: "invalid_id" });

    const key = rateKey(req.ip);
    if (
      statusTotal.length >= STATUS_MAX_TOTAL ||
      (options.perIpLimit && !underLimit(statusHits, key, STATUS_MAX_PER_IP))
    ) {
      return res.status(429).json({ error: "rate_limited" });
    }
    statusTotal.push(now);
    if (options.perIpLimit) hit(statusHits, key, now);

    const record = submissions.get(id);
    const ref = refFromSubmissionId(id);
    let body: LeadCheckResponse;
    if (!record) body = { status: "unknown", ref };
    else if (record.state === "sending") {
      body = { status: "in_progress", ref, remaining_ms: Math.max(0, record.deadlineAt - now) };
    } else body = { status: record.state, ref };
    return res.status(200).json(body);
  });
}

async function handleLead(
  req: Request,
  res: Response,
  options: { perIpLimit: boolean },
  progress: { submissionId: string; ref: string; recorded: boolean; sendStarted: boolean },
) {
  res.setHeader("Cache-Control", "no-store");
  const reply = (code: number, body: LeadResponse) => res.status(code).json(body);
  const now = Date.now();
  sweep(now);

  const body: Record<string, unknown> = req.body && typeof req.body === "object" ? req.body : {};
  const submissionId = body.submission_id;
  if (!isSubmissionId(submissionId)) {
    logEvent("enquiry_rejected", { reason: "validation" });
    return reply(400, { status: "invalid", errors: {} });
  }
  const ref = refFromSubmissionId(submissionId);
  progress.submissionId = submissionId;
  progress.ref = ref;

  // Spam trap and minimum completion time: neutral response, never emailed
  const elapsed = Number(body.elapsed_ms);
  const trapFilled = typeof body.website === "string" && body.website.trim() !== "";
  if (trapFilled || !Number.isFinite(elapsed) || elapsed < MIN_COMPLETION_MS) {
    logEvent("enquiry_rejected", { ref, reason: "spam" });
    return reply(200, { status: "accepted", ref });
  }

  // Best-effort duplicate suppression (in memory, 15 minutes)
  const known = submissions.get(submissionId);
  const resendRequested = body.resend_after_uncertain === true;
  let possibleDuplicate = false;
  if (known) {
    if (known.state === "accepted") {
      logEvent("enquiry_duplicate", { ref, state: known.state });
      return reply(200, { status: "accepted", ref, duplicate: true });
    }
    if (known.state === "sending") {
      logEvent("enquiry_duplicate", { ref, state: known.state });
      return reply(409, { status: "in_progress", ref, remaining_ms: Math.max(0, known.deadlineAt - now) });
    }
    if (known.state === "uncertain") {
      if (!resendRequested) {
        logEvent("enquiry_duplicate", { ref, state: known.state });
        return reply(504, { status: "uncertain", ref });
      }
      possibleDuplicate = true;
    }
    // not_sent: nothing was sent before, so sending again is safe
  } else if (resendRequested) {
    possibleDuplicate = true;
  }

  const result = validateEnquiry(body);
  if (result.ok === false) {
    logEvent("enquiry_rejected", { ref, reason: "validation", fields: Object.keys(result.errors) });
    return reply(400, { status: "invalid", ref, errors: result.errors });
  }

  // Repeats of a known submission don't count again towards the per-IP limit
  const key = rateKey(req.ip);
  if (!known && options.perIpLimit && !underLimit(submitHits, key, SUBMIT_MAX_PER_IP)) {
    logEvent("enquiry_rejected", { ref, reason: "rate_limited", limit: "per_ip" });
    return reply(429, { status: "rate_limited", ref });
  }
  if (emailsSent.length >= emailsPerHour()) {
    logEvent("enquiry_rejected", { ref, reason: "rate_limited", limit: "hourly_total" });
    return reply(429, { status: "rate_limited", ref });
  }

  const enquiry = result.value;
  setState(submissionId, ref, "sending", now + SEND_DEADLINE_MS);
  progress.recorded = true;
  logEvent("enquiry_received", { ref, package: enquiry.packageId, possible_duplicate: possibleDuplicate });

  const smtp = readSmtpSettings();
  if (smtp.ok === false) {
    setState(submissionId, ref, "not_sent", 0);
    logEvent("email_not_sent", { ref, error_code: "SMTP_NOT_CONFIGURED", ms: 0 }, "warn");
    return reply(503, { status: "not_sent", ref });
  }

  if (!known && options.perIpLimit) hit(submitHits, key, now);
  emailsSent.push(now);

  const mail = composeEmail(enquiry, { ref, possibleDuplicate, receivedAt: new Date(now), ...readContext(body) });
  progress.sendStarted = true;
  const outcome = await sendMail(smtp.settings, mail);

  if (outcome.kind === "accepted") {
    setState(submissionId, ref, "accepted", 0);
    logEvent("email_sent", { ref, package: enquiry.packageId, ms: outcome.ms });
    return reply(200, { status: "accepted", ref });
  }
  setState(submissionId, ref, outcome.kind, 0);
  logEvent(
    outcome.kind === "not_sent" ? "email_not_sent" : "email_uncertain",
    { ref, error_code: outcome.code, smtp_response_code: outcome.responseCode, ms: outcome.ms },
    "warn",
  );
  return reply(outcome.kind === "not_sent" ? 503 : 504, { status: outcome.kind, ref });
}

/** Non-blocking: called after the server is listening, and only logs the result */
export function startSmtpStartupCheck() {
  try {
    const smtp = readSmtpSettings();
    if (smtp.ok === false) {
      logEvent("smtp_not_configured", { missing: smtp.missing }, "warn");
      return;
    }
    verifySmtp(smtp.settings).then(
      (result) =>
        result.ok === false
          ? logEvent("smtp_check_failed", { error_code: result.code }, "warn")
          : logEvent("smtp_ready"),
      () => logEvent("smtp_check_failed", { error_code: "UNKNOWN" }, "warn"),
    );
  } catch {
    logEvent("smtp_check_failed", { error_code: "UNKNOWN" }, "warn");
  }
}

export function logStartupWarning(message: string) {
  logEvent("config_warning", { message }, "warn");
}

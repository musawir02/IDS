import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { readSmtpSettings, sendMail } from "./mailer";

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]!);

// Dependency injection lets delivery outcomes be tested without sending real email.
export function createContactHandler(deps = { readSmtpSettings, sendMail }) {
  const attempts: number[] = [];
  return async (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-store");
    let sending = false;
    const ref = `IDS-${randomUUID()}`;
    try {
      const body = req.body;
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({ success: false, error: "Please enter your name and a valid email address." });
      }
      const limits = { name: 150, company: 200, email: 254, phone: 80, location: 200, service: 200, notes: 5000 };
      const fields: Record<string, string> = {};
      for (const [key, limit] of Object.entries(limits)) {
        const value = body[key] ?? "";
        if (typeof value !== "string" || value.length > limit || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)) {
          return res.status(400).json({ success: false, error: `Please check the ${key} field (maximum ${limit} characters).` });
        }
        fields[key] = value.trim();
      }
      if (!fields.name || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) {
        return res.status(400).json({ success: false, error: "Please enter your name and a valid email address." });
      }
      const now = Date.now();
      while (attempts.length && now - attempts[0] >= 3600000) attempts.shift();
      const configuredLimit = Number(process.env.LEAD_MAX_EMAILS_PER_HOUR);
      const limit = Number.isInteger(configuredLimit) && configuredLimit > 0 ? configuredLimit : 30;
      if (attempts.length >= limit) {
        return res.status(429).json({ success: false, error: "Too many enquiries. Please contact us directly or try again later." });
      }
      const smtp = deps.readSmtpSettings();
      if (smtp.ok === false) {
        return res.status(503).json({ success: false, error: "Your enquiry was not sent. Please email grow@impulsedigitalsolutions.us or try again later." });
      }
      const text = ["New strategy call enquiry", `Reference: ${ref}`, ...Object.entries(fields).map(([key, value]) => `${key}: ${value || "Not provided"}`)].join("\n\n");
      attempts.push(now);
      sending = true;
      const outcome = await deps.sendMail(smtp.settings, {
        subject: `Strategy call enquiry · ${ref}`,
        text,
        html: `<pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(text)}</pre>`,
        replyTo: fields.email,
      });
      if (outcome.kind === "accepted") {
        return res.json({ success: true, ref, message: "Thank you! Your enquiry has been accepted by our mail server for delivery to our team. We'll contact you to arrange your strategy call." });
      }
      return res.status(outcome.kind === "uncertain" ? 504 : 503).json({
        success: false, ref,
        error: outcome.kind === "uncertain"
          ? `We couldn't confirm delivery. Your enquiry may have been sent. Please contact grow@impulsedigitalsolutions.us with reference ${ref} before resubmitting.`
          : "Your enquiry was not sent. Please email grow@impulsedigitalsolutions.us or try again later.",
      });
    } catch {
      return res.status(503).json({ success: false, ref, error: sending
        ? `We couldn't confirm delivery. Please contact grow@impulsedigitalsolutions.us with reference ${ref} before resubmitting.`
        : "Your enquiry was not sent. Please try again later or email grow@impulsedigitalsolutions.us." });
    }
  };
}

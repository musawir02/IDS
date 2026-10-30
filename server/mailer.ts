import SMTPConnection from "nodemailer/lib/smtp-connection";
import MailComposer from "nodemailer/lib/mail-composer";

// SMTP delivery for landing-page enquiries. Settings come only from server environment
// variables, never from frontend code. The low-level SMTPConnection is used instead of a
// transport so we always know which stage failed: before the message was handed over, an
// error means nothing was sent; while it was being handed over, the outcome is uncertain.

export const SMTP_TIMEOUTS = {
  connectionMs: 10_000,
  greetingMs: 10_000,
  socketMs: 15_000,
};

/** Hard limit for a whole send, from connecting to the server's final reply */
export const SEND_DEADLINE_MS = 25_000;

/** Hard limit for the startup check */
const VERIFY_CAP_MS = 20_000;

export interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "LEAD_TO_EMAIL"];

export function readSmtpSettings(
  env: NodeJS.ProcessEnv = process.env,
): { ok: true; settings: SmtpSettings } | { ok: false; missing: string[] } {
  // Placeholders copied from .env.example ("MY_…") count as not set
  const missing = REQUIRED.filter((key) => {
    const value = env[key]?.trim();
    return !value || value.startsWith("MY_");
  });
  const port = Number(env.SMTP_PORT);
  if (!missing.includes("SMTP_PORT") && !(Number.isInteger(port) && port > 0 && port < 65536)) {
    missing.push("SMTP_PORT");
  }
  if (missing.length) return { ok: false, missing };

  const secureSetting = env.SMTP_SECURE?.trim().toLowerCase();
  return {
    ok: true,
    settings: {
      host: env.SMTP_HOST!.trim(),
      port,
      // Implicit TLS when SMTP_SECURE=true (usually port 465); otherwise STARTTLS is required
      secure: secureSetting ? secureSetting === "true" : port === 465,
      user: env.SMTP_USER!.trim(),
      pass: env.SMTP_PASS!,
      from: env.SMTP_FROM!.trim(),
      to: env.LEAD_TO_EMAIL!.trim(),
    },
  };
}

export interface OutgoingMail {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

type Outcome =
  | { kind: "accepted" }
  | { kind: "not_sent" | "uncertain"; code: string; responseCode?: number };

export type SendOutcome = Outcome & { ms: number };

type Stage = "build" | "connect" | "login" | "send";

interface SmtpError {
  code?: unknown;
  responseCode?: unknown;
  command?: unknown;
}

function errorDetails(err: unknown) {
  const e = (err ?? {}) as SmtpError;
  return {
    code: typeof e.code === "string" ? e.code : "UNKNOWN",
    responseCode: typeof e.responseCode === "number" ? e.responseCode : undefined,
    command: typeof e.command === "string" ? e.command : undefined,
  };
}

function classify(stage: Stage, err: unknown): Outcome {
  const { code, responseCode, command } = errorDetails(err);
  // Nothing has been handed to the server before the send stage
  if (stage !== "send") return { kind: "not_sent", code, responseCode };
  // During the send, only an explicit refusal means the message wasn't accepted: the
  // envelope (MAIL FROM, RCPT TO, DATA) was rejected, the message was refused with a reply
  // code, or it was refused before any data went out
  if (code === "EENVELOPE" || code === "EREQUIRETLS") return { kind: "not_sent", code, responseCode };
  if (code === "EMESSAGE" && (responseCode || command === "API" || command === "MAIL FROM")) {
    return { kind: "not_sent", code, responseCode };
  }
  // Time-outs, dropped connections and anything unrecognised: the server may have accepted it
  return { kind: "uncertain", code, responseCode };
}

function openConnection(settings: SmtpSettings) {
  return new SMTPConnection({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    requireTLS: !settings.secure,
    connectionTimeout: SMTP_TIMEOUTS.connectionMs,
    greetingTimeout: SMTP_TIMEOUTS.greetingMs,
    socketTimeout: SMTP_TIMEOUTS.socketMs,
    logger: false,
    debug: false,
  });
}

async function buildMessage(settings: SmtpSettings, mail: OutgoingMail) {
  const node = new MailComposer({
    from: settings.from,
    to: settings.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    disableFileAccess: true,
    disableUrlAccess: true,
  }).compile();
  const envelope = node.getEnvelope();
  const raw = await node.build();
  return { envelope, raw };
}

export function sendMail(
  settings: SmtpSettings,
  mail: OutgoingMail,
  deadlineMs = SEND_DEADLINE_MS,
): Promise<SendOutcome> {
  const started = Date.now();

  return new Promise((resolve) => {
    let stage: Stage = "build";
    let settled = false;
    let connection: SMTPConnection | undefined;

    const finish = (outcome: Outcome) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      try {
        if (outcome.kind === "accepted") connection?.quit();
        else connection?.close();
      } catch {
        // The connection is being discarded either way
      }
      resolve({ ...outcome, ms: Date.now() - started });
    };

    const fail = (err: unknown) => finish(classify(stage, err));

    const deadline = setTimeout(() => {
      finish(
        stage === "send"
          ? { kind: "uncertain", code: "DEADLINE" }
          : { kind: "not_sent", code: "DEADLINE" },
      );
    }, deadlineMs);

    buildMessage(settings, mail)
      .then(({ envelope, raw }) => {
        if (settled) return;
        stage = "connect";
        const conn = openConnection(settings);
        connection = conn;
        // SMTPConnection reports socket problems as 'error' events; without a listener Node
        // would throw and stop the process
        conn.on("error", fail);
        conn.connect((connectErr) => {
          if (connectErr) return fail(connectErr);
          if (settled) return;
          stage = "login";
          conn.login({ user: settings.user, pass: settings.pass }, (loginErr) => {
            if (loginErr) return fail(loginErr);
            if (settled) return;
            stage = "send";
            conn.send(envelope, raw, (sendErr) => {
              if (sendErr) return fail(sendErr);
              finish({ kind: "accepted" });
            });
          });
        });
      })
      // Covers build errors and anything thrown while starting the connection
      .catch(fail);
  });
}

/** Connects and logs in without sending anything. Never throws. */
export function verifySmtp(settings: SmtpSettings): Promise<{ ok: true } | { ok: false; code: string }> {
  return new Promise((resolve) => {
    let settled = false;
    const connection = openConnection(settings);

    const finish = (result: { ok: true } | { ok: false; code: string }) => {
      if (settled) return;
      settled = true;
      clearTimeout(cap);
      try {
        if (result.ok) connection.quit();
        else connection.close();
      } catch {
        // The connection is being discarded either way
      }
      resolve(result);
    };

    const cap = setTimeout(() => finish({ ok: false, code: "DEADLINE" }), VERIFY_CAP_MS);
    connection.on("error", (err) => finish({ ok: false, code: errorDetails(err).code }));
    try {
      connection.connect((connectErr) => {
        if (connectErr) return finish({ ok: false, code: errorDetails(connectErr).code });
        connection.login({ user: settings.user, pass: settings.pass }, (loginErr) => {
          if (loginErr) return finish({ ok: false, code: errorDetails(loginErr).code });
          finish({ ok: true });
        });
      });
    } catch (err) {
      finish({ ok: false, code: errorDetails(err).code });
    }
  });
}

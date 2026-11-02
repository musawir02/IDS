import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response } from "express";
import { createContactHandler } from "./contact";
import type { OutgoingMail, SendOutcome } from "./mailer";

const settings = { host: "smtp.example.com", port: 465, secure: true, user: "test", pass: "test", from: "sender@example.com", to: "team@example.com" };
const valid = { name: "Test Visitor", email: "visitor@example.com", notes: "<script>alert(1)</script>" };
function setup(outcome: SendOutcome = { kind: "accepted", ms: 1 }, configured = true) {
  const mails: OutgoingMail[] = [];
  const handler = createContactHandler({
    readSmtpSettings: () => configured ? { ok: true, settings } : { ok: false, missing: ["SMTP_HOST"] },
    sendMail: async (_settings, mail) => { mails.push(mail); return outcome; },
  });
  return { handler, mails };
}
async function submit(handler: ReturnType<typeof createContactHandler>, body: unknown) {
  let status = 200;
  let result: any;
  const res = { setHeader() {}, status(code: number) { status = code; return this; }, json(value: unknown) { result = value; return this; } };
  await handler({ body } as Request, res as unknown as Response);
  return { status, body: result };
}
test("success requires mail acceptance, with a real reference and escaped content", async () => {
  const { handler, mails } = setup();
  const result = await submit(handler, valid);
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.match(result.body.ref, /^IDS-[a-f0-9-]{36}$/);
  assert.equal(mails[0].replyTo, valid.email);
  assert.ok(mails[0].text.includes(result.body.ref));
  assert.ok(mails[0].html.includes("&lt;script&gt;"));
  assert.ok(!mails[0].html.includes("<script>"));
});
test("missing SMTP never sends or reports success", async () => {
  const { handler, mails } = setup(undefined, false);
  assert.equal((await submit(handler, valid)).status, 503);
  assert.equal(mails.length, 0);
});
for (const [kind, expected] of [["not_sent", 503], ["uncertain", 504]] as const) {
  test(`${kind} delivery is reported as failure`, async () => {
    const { handler } = setup({ kind, code: "TEST", ms: 1 });
    const result = await submit(handler, valid);
    assert.equal(result.status, expected);
    assert.equal(result.body.success, false);
    if (kind === "uncertain") assert.match(result.body.error, /before resubmitting/);
  });
}
test("invalid inputs cannot send email", async () => {
  const { handler, mails } = setup();
  for (const body of [null, [], {}, { ...valid, name: " " }, { ...valid, email: "x@example.com\r\nBcc: x@example.com" }, { ...valid, notes: "x".repeat(5001) }, { ...valid, company: {} }]) {
    assert.equal((await submit(handler, body)).status, 400);
  }
  assert.equal(mails.length, 0);
});
test("unexpected transport failures do not report success", async () => {
  const handler = createContactHandler({ readSmtpSettings: () => ({ ok: true, settings }), sendMail: async () => { throw new Error("private transport details"); } });
  const result = await submit(handler, valid);
  assert.equal(result.status, 503);
  assert.equal(result.body.success, false);
  assert.ok(!result.body.error.includes("private transport details"));
});
test("hourly cap blocks extra email attempts", async () => {
  const previous = process.env.LEAD_MAX_EMAILS_PER_HOUR;
  process.env.LEAD_MAX_EMAILS_PER_HOUR = "1";
  try {
    const { handler, mails } = setup();
    assert.equal((await submit(handler, valid)).status, 200);
    assert.equal((await submit(handler, valid)).status, 429);
    assert.equal(mails.length, 1);
  } finally {
    if (previous === undefined) delete process.env.LEAD_MAX_EMAILS_PER_HOUR;
    else process.env.LEAD_MAX_EMAILS_PER_HOUR = previous;
  }
});

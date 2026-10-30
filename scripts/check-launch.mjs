// Pre-launch check for the Digital Marketing Packages landing page. Run after `npm run build`.
// Fails while any "[TO CONFIRM: …]" placeholder remains in the built page, or if server-only
// settings (SMTP credentials, the enquiry recipient) appear in the code sent to browsers.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const pagePath = path.join(dist, "digital-marketing", "index.html");
if (!fs.existsSync(pagePath)) {
  console.error("dist/digital-marketing/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

const page = fs.readFileSync(pagePath, "utf8");
const assetPaths = [...page.matchAll(/(?:src|href)="\/(assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]);
const files = [
  { name: "digital-marketing/index.html", text: page },
  ...assetPaths.map((asset) => ({ name: asset, text: fs.readFileSync(path.join(dist, asset), "utf8") })),
];

const problems = [];

const placeholders = new Set();
for (const file of files) {
  for (const match of file.text.matchAll(/\[TO CONFIRM: ([^\]]+)\]/g)) placeholders.add(match[1]);
}
for (const item of [...placeholders].sort()) problems.push(`Unconfirmed: ${item}`);

const secrets = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "LEAD_TO_EMAIL"];
// The business email is shown on the page on purpose, and may also be the enquiry recipient or
// the SMTP login, so that one address is allowed. Every other server-only value is still a leak.
const content = fs.existsSync(path.resolve("src/landing/content.ts"))
  ? fs.readFileSync(path.resolve("src/landing/content.ts"), "utf8")
  : "";
const publicEmail = content.match(/publicEmail:\s*"([^"]+)"/)?.[1]?.toLowerCase();
const values = secrets
  .map((key) => process.env[key])
  .filter((value) => value && value.length > 3 && value.toLowerCase() !== publicEmail);
for (const file of files) {
  for (const word of [...secrets, ...values]) {
    if (file.text.includes(word)) problems.push(`Server-only setting found in ${file.name}`);
  }
}

if (problems.length) {
  console.error(`Launch check failed (${problems.length}):`);
  for (const problem of [...new Set(problems)]) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`Launch check passed: ${files.length} files checked, no placeholders or server-only settings.`);

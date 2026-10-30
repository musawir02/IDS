import { AddOnId, ContactMethod, LeadErrors, PackageId } from "../types";
import { ADD_ONS, PACKAGES, PHONE_COUNTRIES } from "./content";

// Form rules shared by the browser and the /api/lead endpoint, so the two can't disagree.

export const LIMITS = {
  name: 100,
  businessName: 120,
  email: 254,
  message: 1000,
};

export const CONTACT_METHODS: { id: ContactMethod; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "call", label: "Phone call" },
  { id: "email", label: "Email" },
];

export interface CleanEnquiry {
  packageId: PackageId;
  addOnIds: AddOnId[];
  name: string;
  businessName: string;
  contactMethod: ContactMethod;
  /** International format, for example +971501234567, or "" when not given */
  phone: string;
  email: string;
  message: string;
  marketingOptIn: boolean;
}

export type ValidationResult =
  | { ok: true; value: CleanEnquiry }
  | { ok: false; errors: LeadErrors };

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const isSubmissionId = (value: unknown): value is string =>
  typeof value === "string" && UUID_V4.test(value);

/** The reference shown to the visitor and used in the email subject, for example ENQ-7F3A9C */
export const refFromSubmissionId = (id: string) =>
  `ENQ-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;

const text = (value: unknown) => (typeof value === "string" ? value : "");

/** Single-line text: no line breaks or control characters, collapsed spaces */
export const cleanLine = (value: unknown) =>
  text(value)
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Multi-line text: keeps line breaks, drops other control characters */
const cleanMultiline = (value: unknown) =>
  text(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ")
    .trim();

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function normalizeEmail(value: unknown): string | null {
  const email = cleanLine(value);
  if (!email) return "";
  if (email.length > LIMITS.email || !EMAIL.test(email)) return null;
  const at = email.lastIndexOf("@");
  return email.slice(0, at) + "@" + email.slice(at + 1).toLowerCase();
}

export const isUaeMobile = (national: string) => /^5\d{8}$/.test(national);

/**
 * Returns the number in international format, "" when empty, or null when it isn't a
 * plausible phone number (8 to 15 digits in total, including the country code)
 */
export function normalizePhone(country: unknown, number: unknown): string | null {
  const raw = cleanLine(number);
  if (!raw) return "";
  const code = text(country);
  if (code === "other") {
    const digits = raw.replace(/[\s().-]/g, "");
    if (!/^\+\d{8,15}$/.test(digits)) return null;
    return digits;
  }
  if (!PHONE_COUNTRIES.some((option) => option.code === code)) return null;
  let national = raw.replace(/[\s().-]/g, "");
  if (national.startsWith("+")) {
    // Accept a number typed with its own country code if it matches the selected one
    if (!national.startsWith(`+${code}`)) return null;
    national = national.slice(code.length + 1);
  }
  if (!/^\d+$/.test(national)) return null;
  // Drop the trunk prefix used in national formats, for example 050 → 50 in the UAE
  if (code !== "1") national = national.replace(/^0/, "");
  const total = code.length + national.length;
  if (total < 8 || total > 15) return null;
  return `+${code}${national}`;
}

export function validateEnquiry(input: Record<string, unknown>): ValidationResult {
  const errors: LeadErrors = {};

  const packageId = text(input.package_id) as PackageId;
  if (!PACKAGES.some((pkg) => pkg.id === packageId)) errors.package_id = "Choose a package.";

  const rawAddOns = Array.isArray(input.addon_ids) ? input.addon_ids : [];
  const addOnIds = [...new Set(rawAddOns.map(text))] as AddOnId[];
  if (addOnIds.some((id) => !ADD_ONS.some((addOn) => addOn.id === id))) {
    errors.addon_ids = "Choose add-ons from the list.";
  }

  const name = cleanLine(input.name);
  if (name.length < 2) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  const businessName = cleanLine(input.business_name);
  if (businessName.length < 2) errors.business_name = "Enter your business name.";
  else if (businessName.length > LIMITS.businessName) {
    errors.business_name = `Keep your business name under ${LIMITS.businessName} characters.`;
  }

  const contactMethod = text(input.contact_method) as ContactMethod;
  const methodChosen = CONTACT_METHODS.some((method) => method.id === contactMethod);
  if (!methodChosen) errors.contact_method = "Choose how you'd like us to reply.";

  const phone = normalizePhone(input.phone_country, input.phone_number);
  const phoneRequired = contactMethod === "whatsapp" || contactMethod === "call";
  if (phone === null) {
    errors.phone_number = "Enter a valid phone number.";
  } else if (!phone && phoneRequired) {
    errors.phone_number =
      contactMethod === "whatsapp"
        ? "Enter your phone number so we can reply on WhatsApp."
        : "Enter your phone number so we can call you.";
  } else if (
    phone &&
    contactMethod === "whatsapp" &&
    text(input.phone_country) === "971" &&
    !isUaeMobile(phone.slice(4))
  ) {
    errors.phone_number =
      "Enter a UAE mobile number (for example 050 123 4567) so we can reply on WhatsApp.";
  }

  const email = normalizeEmail(input.email);
  if (email === null) errors.email = "Enter a valid email address.";
  else if (!email && contactMethod === "email") {
    errors.email = "Enter your email address so we can reply by email.";
  }

  const message = cleanMultiline(input.message);
  if (message.length > LIMITS.message) {
    errors.message = `Keep your message under ${LIMITS.message.toLocaleString("en-US")} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      packageId,
      addOnIds,
      name,
      businessName,
      contactMethod,
      phone: phone ?? "",
      email: email ?? "",
      message,
      marketingOptIn: input.marketing_opt_in === true,
    },
  };
}

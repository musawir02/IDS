import { AddOnId, PackageId } from "../types";
import { CONTACT, formatAed, getAddOn, getPackage } from "../landing/content";
import { CONTACT_METHODS } from "../landing/validation";

// WhatsApp click-to-chat links. Nothing is sent until the visitor presses send in WhatsApp.

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const generalMessage = () =>
  "Hi IDS! I saw your digital marketing packages on your website. Could you help me choose the right package for my business?";

export const packageMessage = (id: PackageId) => {
  const pkg = getPackage(id);
  return [
    `Hi IDS! I'm interested in your ${pkg.name} digital marketing package.`,
    `AED ${formatAed(pkg.priceAed)}/month + VAT. Ad budget is separate.`,
    "Could we discuss whether this package is a good fit for my business and how to get started?",
  ].join("\n\n");
};

export interface EnquiryDetails {
  packageId: PackageId;
  addOnIds: AddOnId[];
  name: string;
  businessName: string;
  contactMethod: string;
  phone: string;
  email: string;
  message: string;
  ref: string;
}

/** Draft offered when the enquiry email could not be sent: every form detail, blank ones left out */
export const notSentMessage = (details: EnquiryDetails) => {
  const pkg = getPackage(details.packageId);
  const addOns = details.addOnIds.map((addOnId) => getAddOn(addOnId)?.name).filter(Boolean);
  const fields: [string, string | undefined][] = [
    ["Name", details.name],
    ["Business", details.businessName],
    ["Package", `${pkg.name} — AED ${formatAed(pkg.priceAed)}/month + VAT (ad budget separate)`],
    ["Add-ons", addOns.join(", ")],
    ["Preferred reply", CONTACT_METHODS.find((method) => method.id === details.contactMethod)?.label],
    ["Phone", details.phone],
    ["Email", details.email],
    ["Message", details.message],
  ];
  return [
    "Hi IDS! I'd like to discuss digital marketing for my business. Here are my details:",
    fields
      .filter(([, value]) => value?.trim())
      .map(([label, value]) => `${label}: ${value!.trim()}`)
      .join("\n"),
    "Could you review my requirements and let me know the next steps?",
    details.ref.trim() ? `Enquiry reference: ${details.ref.trim()}` : "",
  ].filter(Boolean).join("\n\n");
};

/** Draft offered when it isn't known whether the enquiry email arrived */
export const uncertainMessage = (id: PackageId, ref: string) =>
  [
    `Hi IDS! I tried submitting an enquiry about your ${getPackage(id).name} package on your website, but couldn't confirm it reached you.`,
    `Enquiry reference: ${ref}`,
    "Could you check whether you received it before I send it again?",
  ].join("\n\n");

/** Continue an accepted enquiry without making it look like a new package request. */
export const followUpMessage = (id: PackageId, ref: string) =>
  [
    `Hi IDS! I'm following up on my website enquiry about your ${getPackage(id).name} package.`,
    `Enquiry reference: ${ref}`,
    "I'd like to discuss the next steps here on WhatsApp.",
  ].join("\n\n");

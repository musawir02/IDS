import { AddOnId, PackageId } from "../types";
import { CONTACT, formatAed, getAddOn, getPackage } from "../landing/content";
import { CONTACT_METHODS } from "../landing/validation";

// WhatsApp click-to-chat links. Nothing is sent until the visitor presses send in WhatsApp.

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const generalMessage = () =>
  "Hi IDS, I'd like to know more about your Digital Marketing Packages. Ref: LP-DM";

export const packageMessage = (id: PackageId) => {
  const pkg = getPackage(id);
  return `Hi IDS, I'm interested in the ${pkg.name} package (AED ${formatAed(pkg.priceAed)}/month). Ref: LP-DM-${pkg.id}`;
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
    ["Package", `${pkg.name} (AED ${formatAed(pkg.priceAed)}/month)`],
    ["Add-ons", addOns.join(", ")],
    ["Contact me by", CONTACT_METHODS.find((method) => method.id === details.contactMethod)?.label],
    ["Phone", details.phone],
    ["Email", details.email],
    ["Message", details.message],
  ];
  return [
    "Hi IDS, I'd like to enquire about a Digital Marketing Package.",
    fields
      .filter(([, value]) => value?.trim())
      .map(([label, value]) => `${label}: ${value!.trim()}`)
      .join("\n"),
    `Ref: ${details.ref}`,
  ].join("\n\n");
};

/** Draft offered when it isn't known whether the enquiry email arrived */
export const uncertainMessage = (id: PackageId, ref: string) =>
  `Hi IDS, I sent an enquiry about the ${getPackage(id).name} package from your website (Ref ${ref}) but couldn't confirm it went through.`;

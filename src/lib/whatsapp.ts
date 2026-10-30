import { AddOnId, PackageId } from "../types";
import { CONTACT, formatAed, getAddOn, getPackage } from "../landing/content";

// WhatsApp click-to-chat links. Nothing is sent until the visitor presses send in WhatsApp.

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const generalMessage = () =>
  "Hi IDS, I'd like to know more about your Digital Marketing Packages. Ref: LP-DM";

export const packageMessage = (id: PackageId) => {
  const pkg = getPackage(id);
  return `Hi IDS, I'm interested in the ${pkg.name} package (AED ${formatAed(pkg.priceAed)}/month). Ref: LP-DM-${pkg.id}`;
};

/** Draft offered when the enquiry email could not be sent */
export const notSentMessage = (
  id: PackageId,
  addOnIds: AddOnId[],
  message: string,
  ref: string,
) => {
  const pkg = getPackage(id);
  const addOns = addOnIds.map((addOnId) => getAddOn(addOnId)?.name).filter(Boolean);
  return [
    `Hi IDS, I'd like to enquire about the ${pkg.name} package (AED ${formatAed(pkg.priceAed)}/month).`,
    addOns.length ? `Add-ons: ${addOns.join(", ")}` : "",
    message,
    `Ref: ${ref}`,
  ]
    .filter(Boolean)
    .join("\n\n");
};

/** Draft offered when it isn't known whether the enquiry email arrived */
export const uncertainMessage = (id: PackageId, ref: string) =>
  `Hi IDS, I sent an enquiry about the ${getPackage(id).name} package from your website (Ref ${ref}) but couldn't confirm it went through.`;

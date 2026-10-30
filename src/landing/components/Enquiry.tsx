import { forwardRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { AddOnId, PackageId } from "../../types";
import { CONTACT, CTA_LABEL, NEXT_STEPS } from "../content";
import { generalMessage, whatsappUrl } from "../../lib/whatsapp";
import { track } from "../../lib/analytics";
import { WhatsAppIcon } from "./ui/WhatsAppButton";
import LeadForm from "./LeadForm";

interface EnquiryProps {
  packageId: PackageId;
  onPackageChange: (id: PackageId) => void;
  addOns: AddOnId[];
  onAddOnsChange: (ids: AddOnId[]) => void;
  focusRequest: number;
}

const Enquiry = forwardRef<HTMLElement, EnquiryProps>(function Enquiry(props, ref) {
  return (
    <section id="enquire" ref={ref} aria-labelledby="enquire-title" className="py-16 lg:py-24">
      <div className="container-lp grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-reveal className="lg:col-span-5">
          <h2 id="enquire-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {CTA_LABEL}
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">Choose your package and tell us how to reach you.</p>

          <h3 className="mt-10 text-[12px] font-bold uppercase tracking-[0.18em] text-lilac">What happens next</h3>
          <ol className="mt-4 space-y-4">
            {NEXT_STEPS.map((stepText, index) => (
              <li key={stepText} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-lilac/30 text-sm font-bold tabular-nums text-lilac"
                >
                  {index + 1}
                </span>
                <span className="pt-1 text-base text-ink">{stepText}</span>
              </li>
            ))}
          </ol>

          <ul className="mt-10 space-y-4 text-base">
            <li>
              <a
                href={whatsappUrl(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "enquiry_contacts" })}
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-lilac"
              >
                <WhatsAppIcon />
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <Phone aria-hidden="true" className="size-5 shrink-0 text-lilac" />
              {CONTACT.publicPhone}
            </li>
            <li className="flex items-center gap-3 text-muted">
              <Mail aria-hidden="true" className="size-5 shrink-0 text-lilac" />
              {CONTACT.publicEmail}
            </li>
            <li className="flex items-center gap-3 text-muted">
              <MapPin aria-hidden="true" className="size-5 shrink-0 text-lilac" />
              {CONTACT.businessAddress}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <LeadForm {...props} />
        </div>
      </div>
    </section>
  );
});

export default Enquiry;

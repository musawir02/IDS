import { forwardRef } from "react";
import { Mail } from "lucide-react";
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
    <section id="enquire" ref={ref} aria-labelledby="enquire-title" className="border-t border-white/10 bg-plum py-14 lg:py-20">
      <div className="container-lp grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 id="enquire-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {CTA_LABEL}
          </h2>
          <p className="mt-2 text-muted sm:text-lg">Choose your package and tell us how to reach you.</p>

          <h3 className="mt-10 font-semibold text-ink">What happens next</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted marker:text-muted">
            {NEXT_STEPS.map((stepText) => (
              <li key={stepText} className="pl-1">
                {stepText}
              </li>
            ))}
          </ol>

          <ul className="mt-10 space-y-3">
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
            <li>
              <a
                href={`mailto:${CONTACT.publicEmail}`}
                onClick={() => track("email_click", { location: "enquiry_contacts" })}
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-lilac"
              >
                <Mail aria-hidden="true" className="size-5 shrink-0 text-muted" />
                {CONTACT.publicEmail}
              </a>
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

import { forwardRef, ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { AddOnId, PackageId } from "../../types";
import { getPackage } from "../content";
import { notSentMessage, packageMessage, uncertainMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import WhatsAppButton from "./ui/WhatsAppButton";

export type ResultPhase = "sent" | "not_sent" | "uncertain" | "rate_limited";

const METHOD_PHRASE: Record<string, string> = { whatsapp: "WhatsApp", call: "phone", email: "email" };

interface LeadResultProps {
  phase: ResultPhase;
  reference: string;
  name: string;
  packageId: PackageId;
  addOns: AddOnId[];
  contactMethod: string;
  message: string;
  onTryAgain: () => void;
  onSendAgain: () => void;
  onEdit: () => void;
  onReset: () => void;
}

function Panel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
      <div className="mb-5">{icon}</div>
      {children}
    </div>
  );
}

const headingClass = "text-2xl font-bold tracking-tight outline-none";

const LeadResult = forwardRef<HTMLHeadingElement, LeadResultProps>(function LeadResult(
  { phase, reference, name, packageId, addOns, contactMethod, message, onTryAgain, onSendAgain, onEdit, onReset },
  ref,
) {
  const pkg = getPackage(packageId);

  if (phase === "sent") {
    return (
      <Panel icon={<CheckCircle2 aria-hidden="true" className="size-10 text-lilac" />}>
        <h3 ref={ref} tabIndex={-1} className={headingClass}>
          Thanks, {name}.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We've received your enquiry about {pkg.name} and will contact you by{" "}
          {METHOD_PHRASE[contactMethod] ?? "your chosen method"}.
        </p>
        <p className="mt-3 text-base text-ink">
          Reference: <strong className="font-mono">{reference}</strong>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton message={packageMessage(packageId)} label="Chat on WhatsApp" location="enquiry_sent" packageId={packageId} />
          <Button variant="secondary" onClick={onReset}>
            Send another enquiry
          </Button>
        </div>
      </Panel>
    );
  }

  if (phase === "not_sent") {
    return (
      <Panel icon={<AlertTriangle aria-hidden="true" className="size-10 text-error" />}>
        <h3 ref={ref} tabIndex={-1} className={headingClass}>
          We couldn't send your enquiry.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Nothing was sent, so it's safe to try again, or send it to us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onTryAgain}>
            Try again
          </Button>
          <WhatsAppButton
            message={notSentMessage(packageId, addOns, message, reference)}
            label="Send on WhatsApp"
            location="enquiry_not_sent"
            packageId={packageId}
          />
        </div>
        <button type="button" onClick={onEdit} className="mt-5 min-h-11 text-sm font-semibold text-lilac underline underline-offset-4">
          Edit my details
        </button>
      </Panel>
    );
  }

  if (phase === "uncertain") {
    return (
      <Panel icon={<Clock aria-hidden="true" className="size-10 text-lilac" />}>
        <h3 ref={ref} tabIndex={-1} className={headingClass}>
          We couldn't confirm whether your enquiry reached us.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          It may have been received. To avoid sending it twice, please message us on WhatsApp with reference{" "}
          <strong className="font-mono text-ink">{reference}</strong> and we'll confirm.
        </p>
        <div className="mt-6">
          <WhatsAppButton
            message={uncertainMessage(packageId, reference)}
            label="Confirm on WhatsApp"
            location="enquiry_uncertain"
            packageId={packageId}
          />
        </div>
        <button type="button" onClick={onSendAgain} className="mt-5 min-h-11 text-sm font-semibold text-lilac underline underline-offset-4">
          Send again anyway
        </button>
      </Panel>
    );
  }

  return (
    <Panel icon={<AlertTriangle aria-hidden="true" className="size-10 text-error" />}>
      <h3 ref={ref} tabIndex={-1} className={headingClass}>
        Too many attempts right now.
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Please wait a few minutes and try again, or send your enquiry to us on WhatsApp.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton
          message={notSentMessage(packageId, addOns, message, reference)}
          label="Send on WhatsApp"
          location="enquiry_rate_limited"
          packageId={packageId}
        />
        <Button variant="secondary" onClick={onEdit}>
          Back to the form
        </Button>
      </div>
    </Panel>
  );
});

export default LeadResult;

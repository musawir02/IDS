import { Check } from "lucide-react";
import { MarketingPackage, PackageId } from "../../types";
import { FOOTNOTE, formatAed, getPackage } from "../content";
import { packageMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import RecommendedBadge from "./ui/RecommendedBadge";
import WhatsAppButton from "./ui/WhatsAppButton";
import IncludedFeatures from "./IncludedFeatures";

interface PackageCardProps {
  pkg: MarketingPackage;
  idPrefix: string;
  showFootnote?: boolean;
  onEnquire: (id: PackageId, location: string) => void;
}

/** One package, worded exactly as on the poster */
export default function PackageCard({ pkg, idPrefix, showFootnote = false, onEnquire }: PackageCardProps) {
  const parent = pkg.inheritsFrom ? getPackage(pkg.inheritsFrom) : undefined;
  const titleId = `${idPrefix}-${pkg.id}-title`;

  return (
    <article
      id={`${idPrefix}-${pkg.id}`}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={`flex h-full flex-col rounded-2xl border bg-card p-6 outline-none sm:p-8 ${
        pkg.recommended ? "border-violet ring-1 ring-violet" : "border-white/10"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 id={titleId} className="text-2xl font-bold tracking-tight">
          <span className="mr-2 tabular-nums text-muted">{pkg.number}</span>
          {pkg.name}
        </h3>
        {pkg.recommended && <RecommendedBadge />}
      </div>
      <p className="mt-1 text-muted">{pkg.tagline}</p>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-4xl font-bold tabular-nums text-ink">AED {formatAed(pkg.priceAed)}</span>
        <span className="text-muted">/ month</span>
      </p>
      {pkg.note && <p className="mt-3 font-medium text-lilac">{pkg.note}</p>}
      {showFootnote && <p className="mt-3 text-sm text-muted">{FOOTNOTE}</p>}

      <div aria-hidden="true" className="my-6 h-px bg-white/10" />

      {parent && <p className="mb-3 font-semibold text-ink">Everything in {parent.name}, plus:</p>}
      <ul className="space-y-2.5">
        {pkg.inclusions.map((inclusion) => (
          <li key={inclusion.label} className="flex gap-3 text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-lilac" />
            <span>{inclusion.label}</span>
          </li>
        ))}
      </ul>
      <IncludedFeatures pkg={pkg} idPrefix={idPrefix} />

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Button
          variant={pkg.recommended ? "primary" : "secondary"}
          fullWidth
          onClick={() => onEnquire(pkg.id, `package_card_${idPrefix}`)}
        >
          Enquire about {pkg.name}
        </Button>
        <WhatsAppButton
          message={packageMessage(pkg.id)}
          label={`WhatsApp about ${pkg.name}`}
          location={`package_card_${idPrefix}`}
          packageId={pkg.id}
          fullWidth
        />
      </div>
    </article>
  );
}

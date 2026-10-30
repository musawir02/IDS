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
      className={`relative flex h-full flex-col rounded-3xl border p-6 outline-none sm:p-8 ${
        pkg.recommended ? "lp-growth-glow border-violet bg-[#1d1330]" : "border-lilac/15 bg-card"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span aria-hidden="true" className="text-3xl font-extrabold tabular-nums text-lilac/70">
          {pkg.number}
        </span>
        <h3 id={titleId} className="text-2xl font-extrabold uppercase tracking-tight">
          <span className="sr-only">{pkg.number} </span>
          {pkg.name}
        </h3>
        {pkg.recommended && <RecommendedBadge />}
      </div>
      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{pkg.tagline}</p>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-lg font-bold text-lilac">AED</span>
        <span className="text-5xl font-extrabold tabular-nums text-lilac">{formatAed(pkg.priceAed)}</span>
        <span className="text-sm font-semibold uppercase tracking-wider text-muted">/ month</span>
      </p>
      {pkg.note && <p className="mt-3 text-[15px] font-medium text-lilac">{pkg.note}</p>}
      {showFootnote && <p className="mt-3 text-sm text-muted">{FOOTNOTE}</p>}

      <div aria-hidden="true" className="my-6 h-px bg-lilac/15" />

      {parent && (
        <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-lilac">
          Everything in {parent.name}, plus
        </p>
      )}
      <ul className="space-y-3">
        {pkg.inclusions.map((inclusion) => (
          <li key={inclusion.label} className="flex gap-3 text-base text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-lilac" />
            <span>{inclusion.label}</span>
          </li>
        ))}
      </ul>
      <IncludedFeatures pkg={pkg} idPrefix={idPrefix} />

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Button
          variant={pkg.recommended ? "primary" : "secondary"}
          arrow={pkg.recommended}
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

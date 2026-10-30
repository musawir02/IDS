import { formatAed, PACKAGES } from "../../content";

/** The poster's "Starting from AED 1,799 / month" */
export default function PricePill() {
  const from = Math.min(...PACKAGES.map((pkg) => pkg.priceAed));
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-base text-muted">Starting from</span>
      {/* The price and "/ month" wrap as one unit on narrow screens */}
      <span className="inline-flex items-baseline gap-x-2 whitespace-nowrap">
        <span className="text-3xl font-bold tabular-nums text-ink">AED {formatAed(from)}</span>
        <span className="text-base text-muted">/ month</span>
      </span>
    </p>
  );
}

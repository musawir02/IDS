import { formatAed, PACKAGES } from "../../content";

/** The poster's "Starting from AED 1,799 / month" pill */
export default function PricePill() {
  const from = Math.min(...PACKAGES.map((pkg) => pkg.priceAed));
  return (
    <p className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-full border border-lilac/40 bg-plum/80 px-5 py-2.5">
      <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">Starting from</span>
      {/* The price and "/ month" wrap as one unit on narrow screens */}
      <span className="inline-flex items-baseline gap-x-3 whitespace-nowrap">
        <span className="text-2xl font-extrabold tabular-nums text-ink sm:text-3xl">AED {formatAed(from)}</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">/ month</span>
      </span>
    </p>
  );
}

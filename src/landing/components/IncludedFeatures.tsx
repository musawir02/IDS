import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { MarketingPackage } from "../../types";
import { getPackage, inheritedFeatures } from "../content";

/** "Also includes everything in …": the inherited features, opened in place */
export default function IncludedFeatures({ pkg, idPrefix }: { pkg: MarketingPackage; idPrefix: string }) {
  const [open, setOpen] = useState(false);
  if (!pkg.inheritsFrom) return null;

  const parent = getPackage(pkg.inheritsFrom);
  const groups = inheritedFeatures(pkg.id);
  const count = groups.reduce((total, group) => total + group.items.length, 0);
  const regionId = `${idPrefix}-${pkg.id}-inherited`;

  return (
    <div className="mt-5 rounded-2xl border border-lilac/15 bg-night/40">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-ink"
      >
        <span>
          Also includes everything in {parent.name} ({count} features)
        </span>
        <span className="flex shrink-0 items-center gap-1 text-lilac">
          {open ? "Hide" : "Show"}
          <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      <div id={regionId} className="lp-collapse" data-open={open} inert={!open} aria-hidden={!open}>
        <div>
          <div className="space-y-4 px-4 pb-4">
            {groups.map((group) => (
              <div key={group.from.id}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  From {group.from.name}
                </p>
                <ul className="mt-2 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] text-ink">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lilac" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

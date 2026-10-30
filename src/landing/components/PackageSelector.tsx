import { KeyboardEvent, useRef } from "react";
import { Check, Crown } from "lucide-react";
import { PackageId } from "../../types";
import { formatAed, PACKAGES } from "../content";

interface PackageSelectorProps {
  selected: PackageId;
  onSelect: (id: PackageId) => void;
  hintId: string;
}

/** Mobile 2×2 picker: a radio group changed by tapping (or arrow keys), never by swiping */
export default function PackageSelector({ selected, onSelect, hintId }: PackageSelectorProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + PACKAGES.length) % PACKAGES.length;
    onSelect(PACKAGES[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      id="package-picker"
      role="radiogroup"
      aria-label="Choose a package"
      aria-describedby={hintId}
      className="mt-3 grid grid-cols-2 gap-3"
    >
      {PACKAGES.map((pkg, index) => {
        const isSelected = pkg.id === selected;
        return (
          <button
            key={pkg.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${pkg.number} ${pkg.name}, AED ${formatAed(pkg.priceAed)} per month${
              pkg.recommended ? ", recommended" : ""
            }`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(pkg.id)}
            onKeyDown={(event) => move(event, index)}
            className={`min-h-16 rounded-xl border p-3 text-left transition-colors ${
              isSelected ? "border-violet bg-violet/10 ring-1 ring-violet" : "border-white/10 bg-card"
            }`}
          >
            <span className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight text-ink">
              <span className="tabular-nums text-muted">{pkg.number}</span>
              <span>{pkg.name}</span>
              {pkg.recommended && <Crown aria-hidden="true" className="size-3.5 shrink-0 text-lilac" />}
            </span>
            <span className="mt-1 block text-sm tabular-nums text-muted">AED {formatAed(pkg.priceAed)}/month</span>
            {isSelected && (
              <span aria-hidden="true" className="mt-1 flex items-center gap-1 text-xs font-semibold text-lilac">
                <Check className="size-3.5" />
                Selected
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

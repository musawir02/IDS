import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CompareRow, PackageId } from "../../types";
import { COMPARE_GROUPS, COMPARE_PRICE_ROW_LABEL, formatAed, PACKAGES } from "../content";
import { track } from "../../lib/analytics";
import Button from "./ui/Button";
import RecommendedBadge from "./ui/RecommendedBadge";
import CompareTwo, { CompareCell } from "./CompareTwo";

const allSame = (row: CompareRow) => new Set(PACKAGES.map((pkg) => String(row.values[pkg.id]))).size === 1;

function CompareTable({ onlyDifferences, onEnquire }: { onlyDifferences: boolean; onEnquire: (id: PackageId) => void }) {
  const cell = (recommended: boolean) =>
    `px-4 py-3 text-center align-middle ${recommended ? "bg-violet/10" : ""}`;
  const firstCol = "sticky left-0 z-[1] bg-card px-4 py-3 text-left font-medium text-ink";

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 lg:overflow-visible">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">Comparison of the four Digital Marketing Packages</caption>
        <thead>
          <tr>
            <th scope="col" className={`${firstCol} lg:sticky lg:top-16 lg:z-[2]`}>
              <span className="sr-only">Feature</span>
            </th>
            {PACKAGES.map((pkg) => (
              <th
                key={pkg.id}
                scope="col"
                className={`bg-card px-4 py-4 text-center align-bottom lg:sticky lg:top-16 lg:z-[1] ${
                  pkg.recommended ? "bg-[#21182d]" : ""
                }`}
              >
                {pkg.recommended && (
                  <span className="mb-2 flex justify-center">
                    <RecommendedBadge small />
                  </span>
                )}
                <span className="block text-xs tabular-nums text-muted">{pkg.number}</span>
                <span className="block text-base font-bold text-ink">{pkg.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          <tr>
            <th scope="row" className={firstCol}>
              {COMPARE_PRICE_ROW_LABEL}
            </th>
            {PACKAGES.map((pkg) => (
              <td key={pkg.id} className={cell(pkg.recommended)}>
                <span className="font-semibold tabular-nums text-ink">AED {formatAed(pkg.priceAed)}</span>
                <span className="block text-xs text-muted">/ month</span>
              </td>
            ))}
          </tr>
          {COMPARE_GROUPS.map((group) => {
            const rows = group.rows.filter((row) => !(onlyDifferences && allSame(row)));
            if (!rows.length) return null;
            return (
              <Fragment key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={PACKAGES.length + 1}
                    className="bg-plum px-4 pb-2 pt-5 text-left text-sm font-semibold text-muted"
                  >
                    {group.title}
                  </th>
                </tr>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className={firstCol}>
                      {row.label}
                    </th>
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.id} className={cell(pkg.recommended)}>
                        <CompareCell value={row.values[pkg.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className={firstCol}>
              <span className="sr-only">Enquire</span>
            </td>
            {PACKAGES.map((pkg) => (
              <td key={pkg.id} className={`${cell(pkg.recommended)} py-5`}>
                <Button
                  size="sm"
                  variant={pkg.recommended ? "primary" : "secondary"}
                  aria-label={`Enquire about ${pkg.name}`}
                  onClick={() => onEnquire(pkg.id)}
                >
                  Enquire
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function ComparePanel({ onEnquire }: { onEnquire: (id: PackageId, location: string) => void }) {
  const [open, setOpen] = useState(false);
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const toggle = () => {
    if (!open) track("compare_open");
    setOpen((value) => !value);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="compare-panel"
          onClick={toggle}
          className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 px-5 text-[15px] font-semibold text-ink transition-colors hover:border-white/40 hover:bg-white/5"
        >
          {open ? "Hide the comparison" : "Compare all four packages"}
          <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div id="compare-panel" hidden={!open} className="mt-6">
        {open && (
          <div>
            <label className="mb-4 inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-ink">
              <input
                type="checkbox"
                role="switch"
                checked={onlyDifferences}
                onChange={(event) => setOnlyDifferences(event.target.checked)}
                className="size-5 accent-violet"
              />
              Only differences
            </label>
            <div className="hidden md:block">
              <CompareTable onlyDifferences={onlyDifferences} onEnquire={(id) => onEnquire(id, "compare_table")} />
            </div>
            <div className="md:hidden">
              <CompareTwo onlyDifferences={onlyDifferences} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

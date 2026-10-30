import { Fragment, useState } from "react";
import { Check } from "lucide-react";
import { CompareValue, PackageId } from "../../types";
import { COMPARE_GROUPS, COMPARE_PRICE_ROW_LABEL, formatAed, getPackage, PACKAGES } from "../content";
import { track } from "../../lib/analytics";

export function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto size-5 text-lilac" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-muted">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="font-semibold tabular-nums text-ink">{value}</span>;
}

/** Mobile comparison of any two packages, Starter vs Growth by default */
export default function CompareTwo({ onlyDifferences }: { onlyDifferences: boolean }) {
  const [first, setFirst] = useState<PackageId>("starter");
  const [second, setSecond] = useState<PackageId>("growth");

  // Choosing the package already in the other column swaps the two
  const choose = (side: "first" | "second", id: PackageId) => {
    const other = side === "first" ? second : first;
    if (id === other) {
      setFirst(side === "first" ? id : second);
      setSecond(side === "first" ? first : id);
    } else if (side === "first") setFirst(id);
    else setSecond(id);
    track("compare_change", { package_id: id });
  };

  const columns = [getPackage(first), getPackage(second)];
  const select = "mt-1 block h-12 w-full rounded-xl border border-lilac/20 bg-night/60 px-3 text-base text-ink";

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-semibold text-muted">
          Compare
          <select className={select} value={first} onChange={(event) => choose("first", event.target.value as PackageId)}>
            {PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.number} {pkg.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-muted">
          with
          <select className={select} value={second} onChange={(event) => choose("second", event.target.value as PackageId)}>
            {PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.number} {pkg.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="mt-4 w-full border-collapse overflow-hidden rounded-2xl text-sm">
        <caption className="sr-only">
          Comparison of {columns[0].name} and {columns[1].name}
        </caption>
        <thead>
          <tr className="bg-card">
            <th scope="col" className="px-3 py-3 text-left">
              <span className="sr-only">Feature</span>
            </th>
            {columns.map((pkg) => (
              <th key={pkg.id} scope="col" className={`w-24 px-2 py-3 text-center ${pkg.recommended ? "bg-violet/15" : ""}`}>
                <span className="block text-[12px] tabular-nums text-lilac">{pkg.number}</span>
                <span className="block font-extrabold uppercase text-ink">{pkg.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-lilac/10 bg-card/60">
          <tr>
            <th scope="row" className="px-3 py-3 text-left font-medium text-ink">
              {COMPARE_PRICE_ROW_LABEL}
            </th>
            {columns.map((pkg) => (
              <td key={pkg.id} className={`px-2 py-3 text-center ${pkg.recommended ? "bg-violet/10" : ""}`}>
                <span className="font-bold tabular-nums text-lilac">AED {formatAed(pkg.priceAed)}</span>
                <span className="block text-xs text-muted">/ month</span>
              </td>
            ))}
          </tr>
          {COMPARE_GROUPS.map((group) => {
            const rows = group.rows.filter(
              (row) => !(onlyDifferences && String(row.values[first]) === String(row.values[second])),
            );
            if (!rows.length) return null;
            return (
              <Fragment key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={3}
                    className="bg-plum px-3 pb-2 pt-4 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-lilac"
                  >
                    {group.title}
                  </th>
                </tr>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-3 py-3 text-left font-medium text-ink">
                      {row.label}
                    </th>
                    {columns.map((pkg) => (
                      <td key={pkg.id} className={`px-2 py-3 text-center ${pkg.recommended ? "bg-violet/10" : ""}`}>
                        <CompareCell value={row.values[pkg.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

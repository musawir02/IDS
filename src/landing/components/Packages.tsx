import { AddOnId, PackageId } from "../../types";
import { FOOTNOTE, getPackage, PACKAGES } from "../content";
import AddOns from "./AddOns";
import ComparePanel from "./ComparePanel";
import PackageCard from "./PackageCard";
import PackageSelector from "./PackageSelector";

interface PackagesProps {
  selected: PackageId;
  onSelect: (id: PackageId) => void;
  onEnquire: (id: PackageId, location: string) => void;
  addOns: AddOnId[];
  onAddAddOn: (id: AddOnId) => void;
  onRemoveAddOn: (id: AddOnId) => void;
}

export default function Packages({ selected, onSelect, onEnquire, addOns, onAddAddOn, onRemoveAddOn }: PackagesProps) {
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-plum py-14 lg:py-20">
      <div className="container-lp">
        <h2 id="packages-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose your package
        </h2>
        <p className="mt-2 text-muted sm:text-lg">Four monthly packages. Growth is our recommended package.</p>

        {/* Tablet and desktop: the poster's 2×2 grid */}
        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id}>
              <PackageCard pkg={pkg} idPrefix="package" onEnquire={onEnquire} />
            </div>
          ))}
        </div>

        {/* Mobile: tap a package, then see all of it */}
        <div className="mt-8 md:hidden">
          <p id="package-picker-hint" className="text-sm text-muted">
            Tap a package to see everything included.
          </p>
          <PackageSelector selected={selected} onSelect={onSelect} hintId="package-picker-hint" />
          {/* Keyed by package, so each one opens with its inherited list closed */}
          <div key={selected} className="mt-5">
            <PackageCard pkg={getPackage(selected)} idPrefix="package-mobile" showFootnote onEnquire={onEnquire} />
          </div>
        </div>

        <ComparePanel onEnquire={onEnquire} />
        <AddOns selected={addOns} onAdd={onAddAddOn} onRemove={onRemoveAddOn} />
        <p className="mt-6 text-sm text-muted">{FOOTNOTE}</p>
      </div>
    </section>
  );
}

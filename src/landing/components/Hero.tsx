import { forwardRef } from "react";
import { ChevronRight, Crown } from "lucide-react";
import { PackageId } from "../../types";
import { CTA_LABEL, FOOTNOTE, formatAed, HERO, PACKAGES } from "../content";
import { generalMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import PricePill from "./ui/PricePill";
import WhatsAppButton from "./ui/WhatsAppButton";

interface HeroProps {
  onSeePackages: () => void;
  onQuickLink: (id: PackageId) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero({ onSeePackages, onQuickLink }, ref) {
  return (
    <section ref={ref} aria-labelledby="hero-title" className="border-b border-white/10">
      <div className="container-lp grid grid-cols-1 gap-10 pb-14 pt-10 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {HERO.title}
          </h1>
          <p className="mt-3 text-lg font-medium text-lilac sm:text-xl">{HERO.tagline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{HERO.subhead}</p>

          <div className="mt-7">
            <PricePill />
            <p className="mt-2 text-sm text-muted">{FOOTNOTE}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onSeePackages}>{CTA_LABEL}</Button>
            <WhatsAppButton message={generalMessage()} label="WhatsApp us" location="hero" />
          </div>
        </div>

        <nav aria-label="Packages" className="lg:col-span-5">
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-card">
            {PACKAGES.map((pkg) => (
              <li key={pkg.id}>
                <button
                  type="button"
                  onClick={() => onQuickLink(pkg.id)}
                  className="flex min-h-14 w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5"
                >
                  <span className="w-6 text-sm tabular-nums text-muted">{pkg.number}</span>
                  <span className="flex flex-1 items-center gap-1.5 font-semibold text-ink">
                    {pkg.name}
                    {pkg.recommended && (
                      <>
                        <Crown aria-hidden="true" className="size-3.5 text-lilac" />
                        <span className="sr-only">(recommended)</span>
                      </>
                    )}
                  </span>
                  <span className="text-sm tabular-nums text-muted">AED {formatAed(pkg.priceAed)} / month</span>
                  <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
});

export default Hero;

import { forwardRef } from "react";
import { PackageId } from "../../types";
import { CTA_LABEL, FOOTNOTE, HERO, PACKAGES } from "../content";
import { generalMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import PricePill from "./ui/PricePill";
import WhatsAppButton from "./ui/WhatsAppButton";
import { PostVisual, ReelVisual, SearchAdVisual } from "./IllustrativeFrame";
import { Crown } from "lucide-react";

interface HeroProps {
  onSeePackages: () => void;
  onQuickLink: (id: PackageId) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero({ onSeePackages, onQuickLink }, ref) {
  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="lp-hero-glow pointer-events-none absolute -right-40 -top-40 size-[44rem]" />

      <div className="container-lp relative grid gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="text-[clamp(2.6rem,9vw,5.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]"
          >
            <span className="lp-rise block">{HERO.titleLead}</span>
            <span className="lp-rise lp-gradient-text block [animation-delay:120ms]">{HERO.titleAccent}</span>
          </h1>
          <p className="lp-rise mt-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-lilac [animation-delay:200ms] sm:text-sm">
            {HERO.tagline}
          </p>
          <p className="lp-rise mt-5 max-w-xl text-base leading-relaxed text-muted [animation-delay:260ms] sm:text-lg">
            {HERO.subhead}
          </p>

          <div className="lp-rise mt-6 [animation-delay:320ms]">
            <PricePill />
            <p className="mt-3 text-sm text-muted">{FOOTNOTE}</p>
          </div>

          <ul aria-label="Services covered" className="mt-6 flex flex-wrap gap-2">
            {HERO.channels.map((channel) => (
              <li
                key={channel}
                className="rounded-full border border-lilac/20 bg-card/70 px-3 py-1.5 text-[13px] font-medium text-ink"
              >
                {channel}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button arrow onClick={onSeePackages}>
              {CTA_LABEL}
            </Button>
            <WhatsAppButton message={generalMessage()} label="WhatsApp us" location="hero" />
          </div>

          <nav aria-label="Packages" className="mt-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <button
                    type="button"
                    onClick={() => onQuickLink(pkg.id)}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    <span className="tabular-nums text-lilac">{pkg.number}</span>
                    {pkg.name}
                    {pkg.recommended && (
                      <>
                        <Crown aria-hidden="true" className="size-3.5 text-lilac" />
                        <span className="sr-only">(recommended)</span>
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto grid max-w-md grid-cols-[0.85fr_1fr] items-end gap-4 lg:max-w-none">
            <ReelVisual className="lp-rise [animation-delay:300ms]" />
            <div className="space-y-4">
              <PostVisual className="lp-rise [animation-delay:400ms]" />
              <SearchAdVisual className="lp-rise hidden [animation-delay:500ms] sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;

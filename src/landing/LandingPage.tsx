import { useCallback, useEffect, useRef, useState } from "react";
import { AddOnId, PackageId } from "../types";
import {
  ADD_ONS,
  BRAND_NAME,
  DEFAULT_PACKAGE,
  FAQ,
  getPackage,
  PACKAGES,
} from "./content";
import { track } from "../lib/analytics";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Packages from "./components/Packages";
import WhatYouGet from "./components/WhatYouGet";
import Faq from "./components/Faq";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";
import MobileActionBar from "./components/MobileActionBar";
import ConsentBanner from "./components/ConsentBanner";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToElement(element: Element | null) {
  element?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

/** Structured data from the same offer data as the page, so prices can't drift */
function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Digital Marketing Packages",
      serviceType: "Digital marketing",
      provider: { "@type": "Organization", name: BRAND_NAME },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Marketing Packages",
        itemListElement: [
          ...PACKAGES.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            description: pkg.tagline,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: pkg.priceAed,
              priceCurrency: "AED",
              unitText: "MONTH",
            },
          })),
          ...ADD_ONS.map((addOn) => ({
            "@type": "Offer",
            name: addOn.name,
            description: addOn.detail,
            priceSpecification: { "@type": "PriceSpecification", price: addOn.priceAed, priceCurrency: "AED" },
          })),
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      // Only questions with confirmed answers are included
      mainEntity: FAQ.filter((item) => !item.answer.some((paragraph) => paragraph.includes("[TO CONFIRM"))).map(
        (item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
        }),
      ),
    },
  ];
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export default function LandingPage() {
  const [selected, setSelected] = useState<PackageId>(DEFAULT_PACKAGE);
  const [addOns, setAddOns] = useState<AddOnId[]>([]);
  const [focusRequest, setFocusRequest] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const enquiryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    track("lp_view");
  }, []);

  // Scroll reveals, applied only once the observer is running
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    root.classList.add("lp-reveal-ready");
    return () => {
      observer.disconnect();
      root.classList.remove("lp-reveal-ready");
    };
  }, []);

  const selectPackage = useCallback((id: PackageId, location: string) => {
    setSelected(id);
    track("package_select", { package_id: id, package_price: getPackage(id).priceAed, location });
  }, []);

  const seePackages = (location: string) => {
    track("cta_click", { location });
    scrollToElement(document.getElementById("packages"));
  };

  const goToPackage = (id: PackageId) => {
    selectPackage(id, "hero_quick_link");
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const target = document.getElementById(desktop ? `package-${id}` : "package-picker");
    scrollToElement(target);
    if (desktop) (target as HTMLElement | null)?.focus({ preventScroll: true });
  };

  const enquire = (id: PackageId, location: string) => {
    selectPackage(id, location);
    track("cta_click", { location, package_id: id });
    scrollToElement(enquiryRef.current);
    setFocusRequest((count) => count + 1);
  };

  const addAddOn = (id: AddOnId) => {
    setAddOns((current) => (current.includes(id) ? current : [...current, id]));
    track("addon_select", { addon_id: id });
    scrollToElement(enquiryRef.current);
    setFocusRequest((count) => count + 1);
  };

  const removeAddOn = (id: AddOnId) => setAddOns((current) => current.filter((addOnId) => addOnId !== id));

  const changeAddOns = (ids: AddOnId[]) => {
    ids.filter((id) => !addOns.includes(id)).forEach((id) => track("addon_select", { addon_id: id }));
    setAddOns(ids);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-violet px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header onSeePackages={() => seePackages("header")} />
      <main id="main">
        <Hero ref={heroRef} onSeePackages={() => seePackages("hero")} onQuickLink={goToPackage} />
        <Packages
          selected={selected}
          onSelect={(id) => selectPackage(id, "mobile_picker")}
          onEnquire={enquire}
          addOns={addOns}
          onAddAddOn={addAddOn}
          onRemoveAddOn={removeAddOn}
        />
        <WhatYouGet />
        <Faq />
        <Enquiry
          ref={enquiryRef}
          packageId={selected}
          onPackageChange={(id) => selectPackage(id, "form")}
          addOns={addOns}
          onAddOnsChange={changeAddOns}
          focusRequest={focusRequest}
        />
      </main>
      <Footer />
      <MobileActionBar selected={selected} onEnquire={enquire} heroRef={heroRef} enquiryRef={enquiryRef} />
      <ConsentBanner />
      <StructuredData />
    </>
  );
}

import { RefObject, useEffect, useState } from "react";
import { PackageId } from "../../types";
import { getPackage } from "../content";
import { packageMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import WhatsAppButton from "./ui/WhatsAppButton";

interface MobileActionBarProps {
  selected: PackageId;
  onEnquire: (id: PackageId, location: string) => void;
  heroRef: RefObject<HTMLElement | null>;
  enquiryRef: RefObject<HTMLElement | null>;
}

/** Mobile only: appears once the hero has scrolled away, hides while the form is on screen */
export default function MobileActionBar({ selected, onEnquire, heroRef, enquiryRef }: MobileActionBarProps) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [enquiryVisible, setEnquiryVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroRef.current) setHeroVisible(entry.isIntersecting);
        if (entry.target === enquiryRef.current) setEnquiryVisible(entry.isIntersecting);
      }
    });
    if (heroRef.current) observer.observe(heroRef.current);
    if (enquiryRef.current) observer.observe(enquiryRef.current);
    return () => observer.disconnect();
  }, [heroRef, enquiryRef]);

  const show = !heroVisible && !enquiryVisible;
  const pkg = getPackage(selected);

  return (
    <div
      inert={!show}
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night px-4 pt-3 transition-transform duration-200 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <WhatsAppButton
          message={packageMessage(selected)}
          label="WhatsApp"
          location="mobile_bar"
          packageId={selected}
          className="shrink-0"
        />
        <Button fullWidth className="min-w-0" onClick={() => onEnquire(selected, "mobile_bar")}>
          Enquire · {pkg.name}
        </Button>
      </div>
    </div>
  );
}

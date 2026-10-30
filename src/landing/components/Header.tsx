import { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import { generalMessage } from "../../lib/whatsapp";
import Button from "./ui/Button";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Header({ onSeePackages }: { onSeePackages: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-lilac/15 bg-night/90 backdrop-blur-md" : "border-transparent bg-night/0"
      }`}
    >
      <div className="container-lp flex h-16 items-center justify-between gap-4">
        <Logo height={30} variant="simplified" />
        <div className="flex items-center gap-2 sm:gap-3">
          <WhatsAppButton message={generalMessage()} label="WhatsApp" location="header" size="sm" compact />
          <Button size="sm" onClick={onSeePackages}>
            See packages
          </Button>
        </div>
      </div>
    </header>
  );
}

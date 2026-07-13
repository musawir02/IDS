import { useState, useEffect } from "react";
import { Shield, Menu, X, ArrowRight, Globe } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  activePage?: string;
}

export default function Navbar({ activePage }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "The Challenge", href: "#challenge" },
    { name: "Services", href: "#services" },
    { name: "Creators & Influencers", href: "#creators" },
    { name: "Gulf Spotlight", href: "#uae-spotlight" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-ids-black/90 backdrop-blur-md border-b border-ids-purple/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Logo
              height={50}
              className="w-auto transform transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive = activePage
                ? item.href === `#${activePage}`
                : false;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-sans text-[13px] font-medium transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-ids-magenta after:transition-transform after:duration-300 after:origin-left ${
                    isActive
                      ? "text-ids-magenta after:scale-x-100"
                      : "text-slate-300 hover:text-ids-magenta after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/50 text-[11px] font-mono font-medium text-slate-300">
              <Globe className="w-3.5 h-3.5 text-ids-magenta animate-pulse" />
              <span>CA | DXB</span>
            </div>
            <a
              href="https://calendly.com/impulsedigitalsolutions"
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple text-sm font-semibold text-white shadow-[0_4px_15px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_25px_rgba(192,38,211,0.5)] transition-all duration-300 hover:-translate-y-0.5 group active:scale-95"
            >
              <span>Free Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with native CSS height transitions) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 max-h-[400px] border-b border-slate-800 bg-ids-black"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
          {menuItems.map((item) => {
            const isActive = activePage
              ? item.href === `#${activePage}`
              : false;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-xl font-medium transition-all ${
                  isActive
                    ? "text-ids-magenta bg-slate-800/20"
                    : "text-slate-300 hover:text-ids-magenta hover:bg-slate-800/30"
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3 px-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Globe className="w-4 h-4 text-ids-magenta" />
              <span>Dual Operations: California & Dubai</span>
            </div>
            <a
              href="https://calendly.com/impulsedigitalsolutions"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet text-sm font-semibold text-white shadow-md active:scale-95 transition-all"
            >
              Book Free Strategy Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

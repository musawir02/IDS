import {
  ShieldAlert,
  Terminal,
  Sparkles,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/impulse-digital-solutions",
      label: "LinkedIn",
    },
    // { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative z-10 bg-[#06060A] border-t border-white/5 overflow-hidden py-16">
      {/* Decorative ambient subtle lights near base */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-ids-purple/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center space-y-10">
        {/* Brand Information */}
        <div className="flex flex-col items-center space-y-4 max-w-lg">
          <Logo height={42} className="w-auto" />
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            IDS is California's only all in one digital partner integrating
            enterprise Cybersecurity, robust Web & App Development, cutting edge
            AI Powered SEO/AEO, creator monetization pipelines, and GCC/US
            Growth Execution.
          </p>
        </div>

        {/* Dual Core Offices coordinates mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl border-y border-white/5 py-8">
          <div className="space-y-2 font-sans sm:border-r sm:border-white/5 sm:pr-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest font-mono justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ids-magenta animate-pulse" />
              <span>US Operations Hub</span>
            </div>
            <p className="text-xs text-slate-400">California, USA</p>
            <p className="font-mono text-[9px] text-slate-500">
              2007 Delaware ST Huntington Beach, CA 92648, United States
            </p>
          </div>

          <div className="space-y-2 font-sans sm:pl-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest font-mono justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-ids-purple animate-pulse" />
              <span>UAE Operations Hub: IGS</span>
            </div>
            <p className="text-xs text-slate-400">Dubai, UAE</p>
            <p className="font-mono text-[9px] text-slate-500">
              B, Publishing Pavilion - Office 126 - Me'aisem First - Dubai
              Production City - Dubai
            </p>
          </div>
        </div>

        {/* Contact details */}
        <div className="font-sans text-xs text-slate-350 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2">
          <a
            href="mailto:grow@impulsedigitalsolutions.us"
            className="hover:text-ids-magenta transition-colors"
          >
            grow@impulsedigitalsolutions.us
          </a>
          <span className="text-white/25 hidden sm:inline">•</span>
          <a
            href="tel:+16575409315"
            className="hover:text-ids-magenta transition-colors"
          >
            +1 (657) 540 9315
          </a>
          <span className="text-white/25 hidden sm:inline">•</span>
          <a
            href="https://linkedin.com/company/impulse-digital-solutions"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ids-magenta transition-colors"
          >
            linkedin.com/company/impulse-digital-solutions
          </a>
        </div>

        {/* Social media connections row */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social, i) => {
            const SocialIcon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-ids-magenta/40 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <SocialIcon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Lower Legal rows */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5 w-full max-w-4xl text-xs text-slate-500 font-sans">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <span>© 2026 IDS. All rights reserved.</span>
            <span>California, USA</span>
            <span>Dubai, UAE</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 font-mono text-[10px] mt-2">
            <span className="uppercase tracking-widest text-[9px] text-slate-400">
              DIGITAL DOMINANCE GUARANTEED
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-xs font-sans text-slate-400">
              Developed by{" "}
              <a
                href="https://ids-agency.com"
                className="font-semibold text-ids-magenta hover:text-ids-purple transition-all"
              >
                IDS Global
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

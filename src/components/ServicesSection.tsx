import React, { useState } from "react";
import { PILLARS } from "../data";
import { Service } from "../types";
import { AnimatePresence, motion } from "motion/react";
import {
  Lock,
  Code,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Cpu,
  Terminal,
  Search,
  Bot,
  Palette,
  Megaphone,
  TrendingUp,
  Eye,
  Plane,
  Map,
  Compass,
  Briefcase,
  Tv,
  CheckCircle,
  X,
  Target,
} from "lucide-react";

// Flexible iconography mapper for services to make them look custom-styled
const serviceIconMap: Record<number, React.ComponentType<any>> = {
  1: Palette, // Brand Strategy
  2: Megaphone, // Full Funnel Marketing
  3: TrendingUp, // Lead Gen
  4: Search, // AI-Powered SEO
  5: Bot, // AEO
  6: Eye, // Media Monitoring
  7: Code, // Website Dev
  8: Smartphone, // Mobile App Dev
  9: ShieldCheck, // Managed Security
  10: Cpu, // Cloud Solutions
  11: Terminal, // Core IT Infrastructure
  12: Target, // Penetration Testing
  13: Terminal, // Digital Forensics
  14: Lock, // Application Protection
  15: Target, // Personal Brand Identity
  16: Cpu, // Content Growth Strategy
  17: Megaphone, // Monetization Systems
  18: Briefcase, // Brand Partnership
  19: Award, // Dubai Gulf Network Access
  20: Plane, // UAE Market entry
  21: Map, // MENA Market Research
  22: Compass, // GCC Marketing Execution
  23: Briefcase, // UAE Branding
};

const pillarColors: Record<
  string,
  {
    bgGlow: string;
    text: string;
    label: string;
    border: string;
    icon: React.ComponentType<any>;
  }
> = {
  "pillar-1": {
    bgGlow: "from-ids-magenta/20 to-transparent",
    text: "text-ids-magenta",
    label: "01 / DIGITAL GROWTH & MARKETING",
    border: "border-ids-magenta/20",
    icon: Sparkles,
  },
  "pillar-2": {
    bgGlow: "from-ids-purple/20 to-transparent",
    text: "text-ids-purple",
    label: "02 / WEB & APP DEVELOPMENT",
    border: "border-ids-purple/20",
    icon: Code,
  },
  "pillar-3": {
    bgGlow: "from-indigo-600/20 to-transparent",
    text: "text-indigo-400",
    label: "03 / CYBERSECURITY & IT INFRASTRUCTURE",
    border: "border-indigo-500/20",
    icon: Lock,
  },
  "pillar-4": {
    bgGlow: "from-pink-500/20 to-transparent",
    text: "text-pink-400",
    label: "04 / CREATORS & INFLUENCERS",
    border: "border-pink-500/20",
    icon: Tv,
  },
  "pillar-5": {
    bgGlow: "from-ids-magenta/20 to-transparent",
    text: "text-emerald-400",
    label: "05 / UAE & GCC REGIONAL EXPANSION",
    border: "border-emerald-500/20",
    icon: Award,
  },
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenDetail = (srv: Service) => {
    setSelectedService(srv);
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-ids-black relative overflow-hidden"
    >
      {/* Decorative full-spectrum glowing backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-ids-purple/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[45rem] h-[45rem] bg-ids-violet/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          id="services-header"
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <span className="inline-flex px-4 py-1.5 bg-ids-purple/10 border border-ids-purple/30 text-ids-magenta text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 font-mono">
            Strategic Solutions
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4.5xl lg:text-5xl text-white tracking-tight leading-snug mb-6">
            A Full Suite of Enterprise Services.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ids-magenta via-ids-purple to-ids-violet font-black">
              Five Strategic Pillars. One Partner.
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            We eliminate disconnected vendor silos. Our unified experts
            synchronize your Security, Codebase, organic Search dominance,
            creator monetization, and GCC Market entry.
          </p>
        </div>

        {/* Vertical timeline/staggered grid of all 5 Pillars */}
        <div className="space-y-24">
          {PILLARS.map((pillar, pIdx) => {
            const colors = pillarColors[pillar.id] || pillarColors["pillar-1"];
            const PillarIcon = colors.icon;

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.015] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 scroll-mt-24"
              >
                {/* Micro glow matching the pillar theme */}
                <div
                  className={`absolute top-0 inset-x-0 h-48 bg-gradient-to-b ${colors.bgGlow} opacity-30 pointer-events-none`}
                />

                {/* Pillar Header Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 pb-8 border-b border-white/5 relative z-10">
                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-[11px] font-mono font-bold text-ids-magenta uppercase tracking-widest flex items-center gap-2">
                      <PillarIcon className="w-3.5 h-3.5" />
                      {colors.label}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
                      {pillar.shortName}
                    </h3>
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-end">
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Grid of services in this specific Pillar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 font-sans">
                  {pillar.services.map((srv) => {
                    const ServiceIcon = serviceIconMap[srv.id] || ShieldCheck;

                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleOpenDetail(srv)}
                        className="p-6 bg-gradient-to-b from-ids-violet/20 border border-white/5 hover:border-ids-purple/40 rounded-2xl flex flex-col justify-between hover:bg-[#12121A]/90 transition-all duration-300 min-h-[200px] group relative cursor-pointer"
                      >
                        {/* Hover color accent strip */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-ids-purple to-ids-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                              SERVICE ID {srv.id < 10 ? `0${srv.id}` : srv.id}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-ids-magenta transition-colors duration-300">
                              <ServiceIcon className="w-4 h-4" />
                            </div>
                          </div>

                          <h4 className="font-display font-bold text-[15px] sm:text-[16px] text-white leading-snug mb-3 pr-2">
                            {srv.name}
                          </h4>

                          <p className="font-sans text-[12px] text-slate-300 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
                          <span className="uppercase tracking-wider text-[9px]">
                            EXPLORE SPECS
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-ids-magenta transition-colors">
                            SPECS <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Interactive Slide-Over Drawer / Modal for the Service Appendix (Change 2) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop Blur Overlay key */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
              className="absolute inset-0 bg-gradient-to-b from-ids-magenta/20 backdrop-blur-md cursor-pointer"
            />

            {/* Main Information Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e0e16] to-[#08080c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 relative z-10"
            >
              {/* Close Button UI */}
              <button
                onClick={handleCloseDetail}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 cursor-pointer transition-colors"
                aria-label="Close detail panel"
              >
                <X className="w-4 h-4" />
              </button>

              <div id="service-appendix-detail" className="font-sans space-y-6">
                {/* Identifier Label */}
                <span className="text-[10px] font-mono font-bold text-ids-magenta uppercase tracking-widest bg-ids-magenta/15 px-3 py-1 rounded-full inline-flex">
                  Service Specifications: ID {selectedService.id}
                </span>

                {/* Primary Category Heading */}
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight pt-1">
                  {selectedService.name}
                </h3>

                {/* WHAT IT IS Section */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ids-magenta" />
                    WHAT IT IS:
                  </span>
                  <p className="text-sm sm:text-[14px] text-slate-200 leading-relaxed pl-3 font-normal">
                    {selectedService.whatItIs || selectedService.description}
                  </p>
                </div>

                {/* WHAT'S INCLUDED Block */}
                {selectedService.included &&
                  selectedService.included.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-ids-purple" />
                        WHAT'S INCLUDED:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3 font-sans">
                        {selectedService.included.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-300"
                          >
                            <CheckCircle className="w-4 h-4 text-ids-magenta shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* WHY IT MATTERS Block */}
                {selectedService.whyItMatters && (
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-ids-magenta to-ids-purple" />
                    <span className="text-xs uppercase font-mono font-bold text-slate-400 tracking-widest block mb-1.5">
                      WHY IT MATTERS:
                    </span>
                    <p className="text-xs sm:text-xs text-slate-300 leading-relaxed">
                      {selectedService.whyItMatters}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

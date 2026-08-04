import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Shield,
  Globe,
  Landmark,
  Scale,
  Briefcase,
  MapPin,
} from "lucide-react";
import { images } from "../assets";

export default function AboutSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setCardsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const usaPoints = [
    {
      label: "California Headquartered",
      desc: "Strategy led from Silicon Valley edge hub",
      icon: Shield,
    },
    {
      label: "US Market Entry",
      desc: "Turnkey scaling system for international brands",
      icon: Globe,
    },
    {
      label: "USD Billing",
      desc: "Secure local financial routing structures",
      icon: Landmark,
    },
    {
      label: "California Law Compliant",
      desc: "Ensured digital governance and compliance",
      icon: Scale,
    },
  ];

  const uaePoints = [
    {
      label: "Dubai Based",
      desc: "Sister firm IGS operation based in Dubai Downtown",
      icon: Shield,
    },
    {
      label: "MENA Market Entry",
      desc: "Access the young GCC premium consumer population",
      icon: Globe,
    },
    {
      label: "AED Billing",
      desc: "Local corporate account convenience and logistics",
      icon: Landmark,
    },
    {
      label: "UAE Law Compliant",
      desc: "Complete 100% foreign ownership registry handling",
      icon: Scale,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-slate-150"
    >
      {/* Soft elegant lights for light mode background depth */}
      <div className="absolute top-1/2 left-[5%] w-96 h-96 bg-ids-purple/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[35rem] h-[35rem] bg-ids-violet/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Info */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="inline-flex self-start px-4 py-1.5 bg-ids-purple/10 border border-ids-purple/30 text-ids-purple text-[10px] font-bold uppercase tracking-wider rounded-full font-mono">
              The IDS Difference
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              We Don't Just Build. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ids-purple via-ids-magenta to-ids-violet font-black">
                We Grow. We Secure.
              </span>{" "}
              <br />
              We Deliver.
            </h2>

            {/* Human Team/Office Photo (Change 5) */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[16/9] w-full">
              <img
                src={images.corporateTeam}
                alt="IDS Corporate Specialists and Digital Security Group"
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] font-mono text-white tracking-widest font-semibold uppercase">
                ★ 30+ Coordinated Specialists Hub
              </div>
            </div>

            <p className="font-sans text-sm text-slate-700 leading-relaxed font-normal">
              IDS: Impulse Digital Solutions is a California based digital
              powerhouse that integrates world class web and app development, AI
              driven SEO, cutting edge AEO, full service branding, digital
              marketing, lead generation systems, comprehensive media monitoring
              intelligence, Creators & Influencers growth and enterprise grade
              cybersecurity into one seamless, unified growth solution.
            </p>
            <p className="font-sans text-sm text-slate-600 leading-relaxed font-normal">
              We are backed by a global team with active operations in both the
              United States and the UAE, giving our clients a rare competitive
              advantage: Silicon Valley innovation combined with deep
              international market expertise through our sister company, Impulse
              Growth Solutions, operating from the heart of Dubai. When you
              partner with IDS, you don't just get a vendor. You get an
              aggressive marketing and corporate expansion partner who secures
              your operations and safeguards your reputation as vigilantly as it
              matches your vision for global digital growth across two of the
              world's most dynamic business markets.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Book a free call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Interactive Dual Continent Cards layout: matching premium dark slate cards */}
          <div
            ref={cardsRef}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* USA Card */}
            <div
              className={`bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-ids-purple/40 transition-colors duration-300 ${
                cardsVisible ? "card-rise" : "opacity-0"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-ids-purple/20 rounded-full blur-2xl group-hover:bg-ids-purple/30 transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-ids-purple animate-pulse" />
                  <h3 className="font-display font-extrabold text-ids-purple uppercase text-xs tracking-wider">
                    USA Operation
                  </h3>
                </div>

                {/* Regional HQ Map Node */}
                <a
                  href="https://maps.apple/p/Uk-osCQuN9rZqx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 h-36 w-full rounded-xl overflow-hidden border border-white/10 relative z-10 block bg-[#0b0f1d] group/map hover:border-ids-purple/50 transition-colors duration-300"
                >
                  {/* map grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:22px_22px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.25),transparent_65%)]" />
                  {/* pulsing pin */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-10 h-10 rounded-full bg-ids-purple/30 animate-ping" />
                      <span className="absolute w-16 h-16 rounded-full border border-ids-purple/20" />
                      <div className="relative w-9 h-9 rounded-full bg-ids-purple text-white flex items-center justify-center shadow-lg shadow-ids-purple/40 group-hover/map:scale-110 transition-transform duration-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="font-mono text-[8px] text-slate-400 tracking-widest mt-2 uppercase">
                      Huntington Beach · California
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[8px] font-mono text-[#22c55e] pointer-events-none">
                    US HEADQUARTERS
                  </div>
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-950/85 group-hover/map:bg-ids-purple px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-white tracking-wider transition-colors duration-300">
                    OPEN MAP ↗
                  </span>
                </a>
                <div className="mb-5 flex items-start gap-2 text-[10px] text-slate-400 font-sans leading-snug relative z-10">
                  <MapPin className="w-3.5 h-3.5 text-ids-purple shrink-0 mt-px" />
                  <span>2007 Delaware ST, Huntington Beach, CA 92648, United States</span>
                </div>

                <div className="space-y-4">
                  {usaPoints.map((pt, i) => {
                    const PtIcon = pt.icon;
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 group/pt rounded-lg -mx-2 px-2 py-1 cursor-default hover:bg-white/[0.04] hover:translate-x-1 transition-all duration-300 ${
                          cardsVisible ? "point-slide-in" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${350 + i * 100}ms` }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover/pt:bg-ids-purple group-hover/pt:scale-110 group-hover/pt:shadow-lg group-hover/pt:shadow-ids-purple/40">
                          <PtIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-semibold text-xs text-white transition-colors duration-300 group-hover/pt:text-ids-purple">
                            {pt.label}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-sans block mt-0.5 leading-snug transition-colors duration-300 group-hover/pt:text-slate-300">
                            {pt.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 text-[9px] font-mono text-ids-purple/80 relative z-10">
                HO: HUNTINGTON BEACH, CALIFORNIA
              </div>
            </div>

            {/* UAE Card */}
            <div
              className={`bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-ids-violet/40 transition-colors duration-300 ${
                cardsVisible ? "card-rise" : "opacity-0"
              }`}
              style={{ animationDelay: "150ms" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-ids-violet/20 rounded-full blur-2xl group-hover:bg-ids-violet/30 transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-ids-magenta animate-pulse" />
                  <h3 className="font-display font-extrabold text-ids-magenta uppercase text-xs tracking-wider">
                    UAE Operation
                  </h3>
                </div>

                {/* Regional Dubai Map Node */}
                <a
                  href="https://maps.app.goo.gl/ixy9THq4YAGagtdS9?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 h-36 w-full rounded-xl overflow-hidden border border-white/10 relative z-10 block bg-[#0b0f1d] group/map hover:border-ids-magenta/50 transition-colors duration-300"
                >
                  {/* map grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:22px_22px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.22),transparent_65%)]" />
                  {/* pulsing pin */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-10 h-10 rounded-full bg-ids-magenta/30 animate-ping" />
                      <span className="absolute w-16 h-16 rounded-full border border-ids-magenta/20" />
                      <div className="relative w-9 h-9 rounded-full bg-ids-magenta text-white flex items-center justify-center shadow-lg shadow-ids-magenta/40 group-hover/map:scale-110 transition-transform duration-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="font-mono text-[8px] text-slate-400 tracking-widest mt-2 uppercase">
                      Dubai Production City · Dubai
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[8px] font-mono text-ids-magenta pointer-events-none">
                    MENA REGIONAL OFFICE
                  </div>
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-950/85 group-hover/map:bg-ids-magenta px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-white tracking-wider transition-colors duration-300">
                    OPEN MAP ↗
                  </span>
                </a>
                <div className="mb-5 flex items-start gap-2 text-[10px] text-slate-400 font-sans leading-snug relative z-10">
                  <MapPin className="w-3.5 h-3.5 text-ids-magenta shrink-0 mt-px" />
                  <span>
                    B, Publishing Pavilion - Office 126 - Me'aisem First -
                    Dubai Production City - Dubai
                  </span>
                </div>

                <div className="space-y-4">
                  {uaePoints.map((pt, i) => {
                    const PtIcon = pt.icon;
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 group/pt rounded-lg -mx-2 px-2 py-1 cursor-default hover:bg-white/[0.04] hover:translate-x-1 transition-all duration-300 ${
                          cardsVisible ? "point-slide-in" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${500 + i * 100}ms` }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover/pt:bg-ids-magenta group-hover/pt:scale-110 group-hover/pt:shadow-lg group-hover/pt:shadow-ids-magenta/40">
                          <PtIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-semibold text-xs text-white transition-colors duration-300 group-hover/pt:text-ids-magenta">
                            {pt.label}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-sans block mt-0.5 leading-snug transition-colors duration-300 group-hover/pt:text-slate-300">
                            {pt.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 text-[9px] font-mono text-ids-magenta/80 relative z-10">
                MIDDLE EAST OFFICE: IN PRODUCTION CITY, DUBAI
              </div>
            </div>
          </div>
        </div>

        {/* Brand Foundation Inset from Slide 4 of Guidelines */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-[10px] font-bold text-ids-purple uppercase tracking-widest bg-ids-purple/10 px-3 py-1 rounded-full border border-ids-purple/20">
              Brand Foundation
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-3">
              Who We Are. What We Stand For.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-505 mt-2">
              Our core beliefs and corporate alignment built for premium
              international execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* MISSION */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7B2FBE] font-bold tracking-wider block mb-2 uppercase">
                MISSION
              </span>
              <p className="font-sans text-xs text-slate-700 leading-relaxed font-normal">
                To empower businesses with integrated digital solutions that
                build strength, ensure security, drive growth, and unlock global
                opportunities.
              </p>
            </div>

            {/* VISION */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7B2FBE] font-bold tracking-wider block mb-2 uppercase">
                VISION
              </span>
              <p className="font-sans text-xs text-slate-700 leading-relaxed font-normal">
                To be the most trusted digital partner for businesses in the
                U.S., UAE, and across the GCC.
              </p>
            </div>

            {/* VALUES */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7B2FBE] font-bold tracking-wider block mb-2 uppercase">
                VALUES
              </span>
              <p className="font-sans text-xs text-slate-700 leading-relaxed font-normal">
                Excellence · Integrity · Innovation · Security · Accountability
                · Growth Mindset · Client Success
              </p>
            </div>

            {/* AUDIENCE */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7B2FBE] font-bold tracking-wider block mb-2 uppercase">
                AUDIENCE
              </span>
              <p className="font-sans text-xs text-slate-700 leading-relaxed font-normal">
                Forward-thinking businesses, entrepreneurs, and enterprises
                seeking a reliable digital partner.
              </p>
            </div>

            {/* PRESENCE */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7B2FBE] font-bold tracking-wider block mb-2 uppercase">
                PRESENCE
              </span>
              <p className="font-sans text-xs text-slate-700 leading-relaxed font-normal">
                U.S. based. Regional presence in the UAE and across the GCC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

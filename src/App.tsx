/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemSection from "./components/ProblemSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TechLabShowcase from "./components/TechLabShowcase";
import HowItWorks from "./components/HowItWorks";
import WhyIds from "./components/WhyIds";
import UaeSpotlight from "./components/UaeSpotlight";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";
import LetsTalkWidget from "./components/LetsTalkWidget";
import CreatorsPage from "./components/CreatorsPage";

type PageType =
  | "home"
  | "about"
  | "challenge"
  | "services"
  | "creators"
  | "uae-spotlight"
  | "contact";

function PageHeader({
  title,
  subtitle,
  category,
}: {
  title: string;
  subtitle: string;
  category: string;
}) {
  const colonIndex = title.indexOf(":");
  const hasColon = colonIndex !== -1;
  const titleLead = hasColon ? title.slice(0, colonIndex + 1) : title;
  const titleAccent = hasColon ? title.slice(colonIndex + 1).trim() : null;

  return (
    <div className="relative pt-36 pb-14 overflow-hidden bg-ids-black border-b border-white/5">
      {/* Dynamic Animated Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-[40rem] h-[20rem] bg-gradient-to-r from-ids-purple/20 via-indigo-600/20 to-ids-magenta/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-ids-magenta/20 via-indigo-500/20 to-purple-500/20 border border-ids-magenta/40 text-ids-magenta text-[11px] font-bold uppercase tracking-widest rounded-full font-mono mb-5 shadow-[0_0_20px_rgba(192,38,211,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-ids-magenta animate-ping" />
          <span>{category}</span>
        </motion.div>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="inline-block bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
          >
            {titleLead}
          </motion.span>
          {titleAccent && (
            <>
              {" "}
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                className="inline-block bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(129,140,248,0.25)]"
              >
                {titleAccent}
              </motion.span>
            </>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-slate-300 text-sm sm:text-lg max-w-3xl mt-4 leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageType>("home");

  // Multi-route simulation via true page redirection on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#pillar-")) {
        setActivePage("services");
        // Wait a tiny bit for the services component to render, then scroll to the pillar
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return;
      }

      if (hash === "#creators" || hash === "#creators-page") {
        setActivePage("creators");
      } else if (hash === "#about") {
        setActivePage("about");
      } else if (hash === "#challenge") {
        setActivePage("challenge");
      } else if (hash === "#services") {
        setActivePage("services");
      } else if (hash === "#uae-spotlight") {
        setActivePage("uae-spotlight");
      } else if (hash === "#contact") {
        setActivePage("contact");
      } else if (hash === "#lets-talk") {
        setActivePage("home");
        setTimeout(() => {
          const element = document.getElementById("contact");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return;
      } else if (hash === "#process") {
        setActivePage("home");
        setTimeout(() => {
          const element = document.getElementById("process");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return;
      } else {
        setActivePage("home");
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check on load

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = "";
    setActivePage("home");
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-ids-black overflow-x-hidden antialiased">
      {/* Absolute Ambient elements on overall body layer aligned with standard brand palette */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-ids-purple/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Fixed Layout Modules */}
      <Navbar activePage={activePage} />

      <main className="relative z-10 w-full flex flex-col">
        {activePage === "home" && (
          <>
            <Hero />
            <TrustBar />

            {/* The Five Strategic Pillars on Home Page */}
            <section className="py-24 bg-ids-black relative border-t border-b border-white/5">
              <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-ids-purple/5 to-transparent pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="font-mono text-[10px] font-bold text-ids-magenta uppercase tracking-widest bg-ids-magenta/15 px-3 py-1 rounded-full border border-ids-magenta/30">
                    Five-Pillar Strategy
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
                    Five Strategic Pillars. One Partner.
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                    A comprehensive suite of elite services integrated into one
                    seamless, unified growth solution. Click below to explore
                    the detailed specifications of each pillar.
                  </p>
                </div>

                {/* 5 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {/* Pillar 1 */}
                  <div className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-ids-magenta/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(192,38,211,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <span className="font-mono text-[9px] text-ids-magenta font-semibold tracking-wider block mb-2 uppercase">
                        PILLAR I
                      </span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-ids-magenta transition-colors">
                        Digital Growth & Marketing
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        "Brand, marketing, and lead generation that drives real
                        revenue."
                      </p>
                    </div>
                    <a
                      href="#pillar-1"
                      className="inline-flex items-center gap-1.5 text-xs text-ids-magenta hover:text-white font-mono font-bold mt-6 group/btn transition-colors"
                    >
                      <span>Explore Digital Growth</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Pillar 2 */}
                  <div className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-ids-purple/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(123,47,190,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <span className="font-mono text-[9px] text-ids-purple font-semibold tracking-wider block mb-2 uppercase">
                        PILLAR II
                      </span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-ids-purple transition-colors">
                        Web & App Development
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        "Platforms that perform, convert, and scale."
                      </p>
                    </div>
                    <a
                      href="#pillar-2"
                      className="inline-flex items-center gap-1.5 text-xs text-ids-purple hover:text-white font-mono font-bold mt-6 group/btn transition-colors"
                    >
                      <span>Explore Web & App</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Pillar 3 */}
                  <div className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-400/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <span className="font-mono text-[9px] text-indigo-400 font-semibold tracking-wider block mb-2 uppercase">
                        PILLAR III
                      </span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                        Cybersecurity & IT
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        "Growth without security is exposure."
                      </p>
                    </div>
                    <a
                      href="#pillar-3"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-white font-mono font-bold mt-6 group/btn transition-colors"
                    >
                      <span>Explore Cybersecurity</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Pillar 4 */}
                  <div className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-pink-400/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(244,114,182,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <span className="font-mono text-[9px] text-pink-400 font-semibold tracking-wider block mb-2 uppercase">
                        PILLAR IV
                      </span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-pink-400 transition-colors">
                        Creators & Influencers
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        "Turn an audience into a business, then take it global."
                      </p>
                    </div>
                    <a
                      href="#pillar-4"
                      className="inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-white font-mono font-bold mt-6 group/btn transition-colors"
                    >
                      <span>Explore Creator Services</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Pillar 5 */}
                  <div className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-emerald-400/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(52,211,153,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <span className="font-mono text-[9px] text-emerald-400 font-semibold tracking-wider block mb-2 uppercase">
                        PILLAR V
                      </span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                        UAE & GCC Market Services
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        "The only California partner with a team on the ground
                        in Dubai."
                      </p>
                    </div>
                    <a
                      href="#pillar-5"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white font-mono font-bold mt-6 group/btn transition-colors"
                    >
                      <span>Explore Gulf Market Entry</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Immersive Home Exploration Hub */}
            <section className="py-20 bg-ids-black relative border-t border-white/5 overflow-hidden">
              {/* Dual-Market Skyline Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none mix-blend-screen"
                style={{
                  backgroundImage: `url('/assets/images/ca_dxb_skyline_1780950361788.png')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ids-black via-ids-black/80 to-ids-black pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="font-mono text-[10px] font-bold text-ids-magenta uppercase tracking-widest bg-ids-magenta/15 px-3 py-1 rounded-full border border-ids-magenta/30">
                    Explore Our Ecosystem
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
                    Your Complete Growth Ecosystem
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    IDS bridges secure, high-tech infrastructure with elite
                    brand monetization and dual-market expansion. Select a
                    pillar to explore its capabilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: About Us */}
                  <a
                    href="#about"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-purple/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(123,47,190,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-purple font-bold block mb-2">
                        01 / BRAND
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-purple transition-colors">
                        Dual-Market Identity
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        Understand our dual Operations center spanning
                        Huntington Beach, California & Dubai Production City.
                        One cohesive brand intelligence.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-purple transition-all font-semibold">
                      <span>Meet the Partner</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Card 2: The Challenge */}
                  <a
                    href="#challenge"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-magenta/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(192,38,211,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-magenta font-bold block mb-2">
                        02 / PROBLEM
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-magenta transition-colors">
                        The Multi-Vendor Threat
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        Managing 5-6 fragmented agencies creates alignment gaps
                        and security vulnerabilities. Explore our unified
                        response.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-magenta transition-all font-semibold">
                      <span>Review the Threat</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Card 3: Strategic Services */}
                  <a
                    href="#services"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-purple/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(123,47,190,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-purple font-bold block mb-2">
                        03 / SOLUTIONS
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-purple transition-colors">
                        The Five Strategic Pillars
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        Browse our comprehensive elite services, including
                        custom software delivery, SEO + AEO dominance, and
                        cybersecurity-first setups.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-purple transition-all font-semibold">
                      <span>Browse Services</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Card 4: Creators & Influencers */}
                  <a
                    href="#creators"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-magenta/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(192,38,211,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-magenta font-bold block mb-2">
                        04 / AGENCY
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-magenta transition-colors">
                        Global Creator Growth
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        Professionalize your influence. Secure lightning-fast
                        portfolios, automate rate cards, and unlock GCC brand
                        partnerships.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-magenta transition-all font-semibold">
                      <span>Explore Representation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Card 5: Our Process */}
                  <a
                    href="#process"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-purple/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(123,47,190,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-purple font-bold block mb-2">
                        05 / TIMELINE
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-purple transition-colors">
                        90-Day Execution Roadmap
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        How the dual USA-UAE setup goes from diagnostic audit
                        map to active security monitoring and scaled brand
                        revenue.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-purple transition-all font-semibold">
                      <span>See Our Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Card 6: Gulf Spotlight */}
                  <a
                    href="#uae-spotlight"
                    className="group p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 hover:border-ids-magenta/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(192,38,211,0.15)] hover:bg-slate-950/70 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-ids-magenta font-bold block mb-2">
                        06 / REGION
                      </span>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-ids-magenta transition-colors">
                        Gulf Expansion Opportunity
                      </h3>
                      <p className="font-sans text-xs text-slate-300 mt-2 leading-relaxed">
                        Enter the world's fastest growing consumer market with
                        turnkey research, local brand access, and cross-border
                        agility.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-slate-300 group-hover:text-ids-magenta transition-all font-semibold">
                      <span>Seize Regional Growth</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </section>

            <HowItWorks />

            <ContactSection />
          </>
        )}

        {activePage === "about" && (
          <div className="pb-16">
            <PageHeader
              title="Dual-Market Operational Headquarters"
              subtitle="The Silicon Valley of digital marketing combined with physical elite brand deployment in the Gulf. Meet the masterminds of IDS."
              category="Aesthetic Identity"
            />
            <div className="mt-0">
              <AboutSection />
            </div>
          </div>
        )}

        {activePage === "challenge" && (
          <div className="pb-16">
            <PageHeader
              title="The Multi-Vendor Fragmentation Threat"
              subtitle="Why managing multiple single-service agencies leads to configuration drift, massive security risks, and communication roadblocks."
              category="The Diagnostic"
            />
            <div className="space-y-12">
              <ProblemSection />
              <WhyIds />
            </div>
          </div>
        )}

        {activePage === "services" && (
          <div className="pt-20 pb-16">
            <div className="space-y-16">
              <ServicesSection />
              <TechLabShowcase />
            </div>
          </div>
        )}

        {activePage === "creators" && (
          <CreatorsPage onBackToHome={handleBackToHome} />
        )}

        {activePage === "uae-spotlight" && (
          <div className="pb-16">
            <PageHeader
              title="Gulf Market Expansion: From California to Dubai"
              subtitle="Turnkey entity establishment, on-ground Gulf market intelligence, and high-ROI brand launch execution across the UAE & GCC."
              category="Gulf Operations Hub"
            />
            <div className="mt-0">
              <UaeSpotlight />
            </div>
          </div>
        )}

        {activePage === "contact" && (
          <div className="pb-16">
            <PageHeader
              title="Schedule a Priority Strategy Call"
              subtitle="Audit your security posture, evaluate search parameters, and build a custom 90-day trajectory roadmap. Let's make you dominant."
              category="Direct Access"
            />
            <div className="mt-0">
              <ContactSection />
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating Utilities */}
      <LetsTalkWidget />
      <ChatbotWidget />
      <ScrollToTop />
    </div>
  );
}

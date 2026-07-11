import { UAE_FACTS } from "../data";
import { Pin, ArrowRight, Landmark, Milestone, Coins } from "lucide-react";

export default function UaeSpotlight() {
  return (
    <section
      id="uae-spotlight"
      className="py-24 bg-gradient-to-b from-ids-purple/20 relative overflow-hidden"
    >
      {/* Immersive background spotlights */}
      <div className="absolute top-1/4 right-[10%] w-[35rem] h-[35rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[30rem] h-[30rem] bg-cyan-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Info Box */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="inline-flex self-start px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full font-mono">
              Gulf Spotlight
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              The World's Most Exciting <br />
              Gulf Markets Are Waiting For Your Brand.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-305 leading-relaxed">
              The UAE and GCC represent some of the most compelling business
              expansion opportunities available to US companies today. With
              favorable regional tax policies, low tax rates across special
              zones, strong foreign ownership access, and a young, digitally
              savvy consumer base with one of the world's highest GDP per
              capita, the Gulf is a powerful launchpad for global growth.
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              IDS, through its sister company Impulse Growth Solutions in Dubai,
              offers US businesses a complete turnkey Gulf market entry
              solution, from initial market research and competitive
              intelligence to full digital marketing execution, branding, and
              ongoing performance management.
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our regional market monitoring capability (delivered through IGS
              in Dubai) gives brands entering the Gulf a unique intelligence
              advantage. We track consumer sentiment across all major platforms
              in the GCC market, providing insights that are completely
              invisible to US-only agencies and absolutely critical for any
              brand serious about the Gulf.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-xs font-mono font-bold text-white transition-all duration-300 shadow-md hover:shadow-indigo-500/20 hover:-translate-y-0.5"
              >
                <span>Let's take your brand global to the Gulf</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: UAE facts dashboard board with gold-frosting layers */}
          <div className="lg:col-span-6">
            <div className="p-8 bg-indigo-950/20 border border-indigo-500/20 backdrop-blur-xl rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl" />

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-indigo-500/10">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <span className="font-display font-semibold text-sm text-white uppercase tracking-wider">
                    Arabian Gulf Market Facts
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold tracking-widest bg-indigo-500/15 py-1 px-2.5 rounded-md text-indigo-300 uppercase">
                  Dubai (DXB) Hub
                </span>
              </div>

              {/* Dynamic Dubai Skyline/DIFC Sunset Hero Media Container (Change 5) */}
              <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-2xl mb-6 aspect-video">
                <img
                  src="/assets/images/dubai_marina_sunset_1780689994078.png"
                  alt="Dubai DIFC Sunset and Skyline Operations"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[8px] font-mono tracking-widest text-[#a855f7] uppercase font-bold">
                  IGS OFFICE HUB: MARINA DISTRICT
                </div>
              </div>

              {/* Facts Grid layout */}
              <div className="grid grid-cols-2 gap-4">
                {UAE_FACTS.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-indigo-500/20 hover:bg-slate-900/30 transition-all duration-300"
                  >
                    <span className="text-xl sm:text-2xl font-display font-extrabold text-[#8b5cf6] block leading-tight">
                      {fact.value}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans block mt-1 uppercase font-medium tracking-wide leading-snug">
                      {fact.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start gap-3">
                <Coins className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="font-sans text-[11px] text-indigo-200/90 leading-relaxed">
                  <strong>International Expansion Advantage:</strong> Combine
                  Silicon Valley agility with favorable regional tax policies,
                  strong foreign ownership access, and high consumer margins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

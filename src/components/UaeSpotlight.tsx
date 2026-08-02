import { UAE_ESTABLISHMENT_SERVICES, UAE_FACTS } from "../data";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  Landmark,
  Coins,
} from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info Box */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="inline-flex self-start px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full font-mono">
              UAE & GCC Market Entry
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              From California to a live UAE company — <br />
              and a Gulf market that's ready for you.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              The UAE is the most accessible entry point into one of the
              world&apos;s strongest consumer regions. Zero personal income tax,
              100% foreign company ownership, 99% internet penetration, and
              one of the highest GDP-per-capita rates in the world sit inside a
              market that actively seeks global brands and pays premium prices
              for them. From a UAE base, the wider GCC opens up: Saudi Arabia,
              Qatar, Kuwait, Bahrain, and Oman together represent over 57
              million consumers with some of the highest digital engagement
              rates on the planet.
            </p>

            <div className="relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-indigo-950/35 p-5 sm:p-6 shadow-[0_18px_45px_rgba(49,46,129,0.18)]">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-2.5">
                    <Building2 className="h-5 w-5 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Before the marketing begins, we get you legally established.
                    </h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-slate-300">
                      Company formation in the right UAE jurisdiction — mainland
                      or free zone, chosen around how you intend to trade. We
                      coordinate trade licensing, activity classification,
                      Federal Tax Authority registration, visas, Emirates ID,
                      PRO services, and corporate bank account setup.
                    </p>
                  </div>
                </div>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2" aria-label="UAE establishment services">
                  {UAE_ESTABLISHMENT_SERVICES.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-xs text-indigo-100">
                      <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-indigo-400/15 pt-4 text-[10px] leading-relaxed text-indigo-200/80">
                  <p>Delivered through our licensed Dubai establishment partners.</p>
                  <p className="mt-1 font-medium text-indigo-100">Coordinated by your IDS team — one point of contact, not five.</p>
                </div>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              IDS, through its sister company Impulse Growth Solutions in Dubai,
              then takes you from established entity to active brand: market
              research and competitive intelligence, brand adaptation for the
              Gulf consumer, full digital marketing execution across the UAE
              and GCC, and ongoing performance management.
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our regional market monitoring capability (delivered through IGS
              in Dubai) gives brands entering the Gulf a unique intelligence
              advantage. We track consumer sentiment across all major platforms
              in the UAE and wider GCC — insights US-only agencies simply
              don&apos;t have.
            </p>

            <div className="pt-4">
              <a
                href="https://calendly.com/impulsedigitalsolutions"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-xs font-mono font-bold text-white transition-all duration-300 shadow-md hover:shadow-indigo-500/20 hover:-translate-y-0.5"
              >
                <span>Find out which structure fits your business</span>
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
                    UAE & Gulf Market Facts
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold tracking-widest bg-indigo-500/15 py-1 px-2.5 rounded-md text-indigo-300 uppercase">
                  Dubai (DXB) Hub
                </span>
              </div>

              {/* Dubai market-entry team image */}
              <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-2xl mb-6 aspect-video">
                <img
                  src="/assets/images/dubai_team_office.png"
                  alt="Dubai market-entry team planning a client launch"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
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
                    <span className="text-[8px] text-slate-500 font-mono block mt-2 leading-tight">
                      {fact.source}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start gap-3">
                <Coins className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="font-sans text-[11px] text-indigo-200/90 leading-relaxed">
                  <strong>International Expansion Advantage:</strong> Combine
                  A UAE entity gives you a licensed base, a corporate bank
                  account, and residence — plus a launchpad into the wider GCC.
                  We handle the entity and the launch. You keep the focus on
                  the business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

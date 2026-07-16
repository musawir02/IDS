import { WHY_IDS } from "../data";
import { Check, ShieldAlert, Award, ArrowUpRight } from "lucide-react";

export default function WhyIds() {
  return (
    <section className="py-24 bg-gradient-to-b from-ids-magenta/20 relative overflow-hidden">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/2 left-[5%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[32rem] h-[32rem] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="inline-flex px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 font-mono">
            Why Choose IDS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none">
            Not Just Another Agency. <br className="hidden sm:inline" />
            Your Complete Digital Partner Across Two Continents.
          </h2>
        </div>

        {/* 9 Points grid of why choose IDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_IDS.map((point) => (
            <div
              key={point.id}
              className="p-6 bg-gradient-to-b from-ids-violet/20 border border-white/10 backdrop-blur-xl rounded-2xl hover:border-cyan-500/35 hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Glowing Numeric label */}
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all font-bold">
                    ADVANTAGE {point.id < 10 ? `0${point.id}.` : `${point.id}.`}
                  </span>
                  <Check className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display font-bold text-base text-white mb-2.5">
                  {point.title}
                </h3>

                <p className="font-sans text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>VERIFIED</span>
                <span className="flex items-center gap-0.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Active <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

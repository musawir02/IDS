import { HOW_IT_WORKS } from "../data";
import { ArrowRight, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="py-24 bg-gradient-to-b from-ids-violet/20 relative overflow-hidden"
    >
      {/* Decorative gradient shadows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 font-mono">
            Our Process
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-4">
            Simple Steps. Powerful Results.
          </h2>
          <p className="font-sans text-slate-300 text-sm">
            A clear, proven path from first conversation to compounding growth,
            whether you’re a business, a brand expanding into new markets, or a
            creator going global.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16 relative">
          {HOW_IT_WORKS.map((step, idx) => (
            <div
              key={idx}
              className="relative group flex flex-col justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/25 transition-all duration-300"
            >
              {/* Connector line for large screens */}
              {idx < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-[15%] left-[90%] right-[-20%] h-[1px] bg-gradient-to-r from-cyan-500/35 to-transparent z-0 pointer-events-none" />
              )}

              <div className="relative z-10 space-y-4">
                {/* Numeric index card */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4]/10 to-[#8b5cf6]/10 border border-white/10 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:from-cyan-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-md">
                  {step.number}
                </div>

                <h4 className="font-display font-bold text-base text-white">
                  {step.title}
                </h4>

                <p className="font-sans text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 text-[10px] font-mono text-slate-500">
                PHASE 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white shadow-lg hover:shadow-[0_4px_25px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <span>Start With a Free Call</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

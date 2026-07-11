import { PROBLEMS } from "../data";
import {
  ShieldAlert,
  Layers,
  Bot,
  Globe,
  TrendingDown,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

const itemIcons: Record<string, any> = {
  ShieldAlert: ShieldAlert,
  Layers: Layers,
  Bot: Bot,
  Globe: Globe,
  TrendingDown: TrendingDown,
  EyeOff: EyeOff,
};

const cardColors: Record<
  number,
  { border: string; glow: string; text: string; iconBg: string }
> = {
  1: {
    border: "hover:border-rose-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    text: "text-rose-400",
    iconBg: "bg-rose-500/10 text-rose-400",
  },
  2: {
    border: "hover:border-violet-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
    text: "text-violet-400",
    iconBg: "bg-violet-500/10 text-violet-400",
  },
  3: {
    border: "hover:border-amber-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    text: "text-amber-400",
    iconBg: "bg-amber-500/10 text-amber-400",
  },
  4: {
    border: "hover:border-indigo-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]",
    text: "text-indigo-400",
    iconBg: "bg-indigo-500/10 text-indigo-400",
  },
  5: {
    border: "hover:border-cyan-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
    text: "text-cyan-400",
    iconBg: "bg-cyan-500/10 text-cyan-400",
  },
  6: {
    border: "hover:border-pink-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]",
    text: "text-pink-400",
    iconBg: "bg-pink-500/10 text-pink-400",
  },
};

export default function ProblemSection() {
  return (
    <section
      id="challenge"
      className="py-24 bg-gradient-to-b from-ids-magenta/20 relative overflow-hidden"
    >
      {/* Dynamic light triggers */}
      <div className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-rose-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider mb-4">
            <AlertTriangle className="w-3 h-3" />
            <span>Why Most Businesses Fail Digitally</span>
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            You Are Growing Online. <br />
            But Are You Growing Safely, And Are You Even Being Found?
          </h2>
          <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
            Most businesses today face multiple silent crises happening
            simultaneously. They invest heavily in websites, SEO, and digital
            marketing, but leave the back door wide open to cyber threats and
            data breaches. Their IT, security, and marketing teams work in
            silos, creating expensive gaps and missed opportunities.
          </p>
          <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed mt-3">
            In 2026, even businesses that rank well on Google are completely
            invisible on AI platforms like ChatGPT, Perplexity, and Microsoft
            Copilot, where millions of buying decisions are now made every
            single day. And while all of this is happening, their brand is being
            discussed across social media, news sites, and review platforms,
            with zero awareness of what is being said. The result? Growth that
            is fragile, exposed, invisible, and unprotected where it matters
            most.
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((prob) => {
            const IconComponent = itemIcons[prob.icon] || ShieldAlert;
            const styleProps = cardColors[prob.id] || cardColors[1];

            return (
              <div
                key={prob.id}
                className={`group p-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05] flex flex-col justify-between ${styleProps.border} ${styleProps.glow}`}
              >
                <div>
                  {/* Icon Frame */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 duration-300 ${styleProps.iconBg}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    {prob.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>RISK FACTOR 0{prob.id}</span>
                  <span
                    className={`${styleProps.text} font-bold opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    CRITICAL
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

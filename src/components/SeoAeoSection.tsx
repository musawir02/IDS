import {
  ArrowRight,
  Tv,
  CheckCircle,
  Flame,
  DollarSign,
  Globe,
  Sparkles,
} from "lucide-react";
import { images } from "../assets";

export default function SeoAeoSection() {
  const rows = [
    {
      id: 1,
      eyebrow: "FOUNDATION & DOMINANCE",
      title: "Infrastructure & Growth Engine",
      text: "Infrastructure & Growth: Personal Brand Audit, Visual Identity, Content Strategy, and Built-for-Speed Web platforms, secured and hardened by design.",
      detail:
        "We align your public footprint with high-intent discovery points. By combining traditional Google search optimization (SEO) with cutting-edge Answer Engine Optimization (AEO), we ensure your personal brand is the primary recommended solution when potential clients queries ChatGPT, Perplexity, and Copilot.",
      bulletPoints: [
        "Interactive Brand Audit",
        "Visual design & typography identity assets",
        "Multi-channel Content pillar matrices",
        "SEO / AEO indexing authority integration",
      ],
      image: images.aeoSearch,
      alt: "IDS Dynamic AEO Search Dominance Dashboard on AI Conversational Engines",
      reverse: false,
      accent: "from-fuchsia-600/30 to-purple-600/30",
    },
    {
      id: 2,
      eyebrow: "MONETIZATION SCALING",
      title: "Durable Monetization Web Systems",
      text: "Durable Monetization Web Systems: Automated pipelines, Media Kit & Rate Card automation, outreach systems, CRM lead trackers, and custom e-commerce or community integrations.",
      detail:
        "Move away from relying solely on erratic ad-network rev shares or spotty sponsorships. We deploy dedicated private digital hubs designed to capture incoming brand interest, automate your sales outreach, and stream subscription models or premium products directly to your audience.",
      bulletPoints: [
        "Automated Media Kit & Real-Time Rate Cards",
        "Proprietary Brand Outreach Pipelines",
        "CRM integration for tracking active sponsors",
        "E-Commerce & members-only community portals",
      ],
      image: images.creatorGrowth,
      alt: "Creator growth analytics on a professional dark dual desktop monitor",
      reverse: true,
      accent: "from-violet-600/30 to-ids-purple/20",
    },
    {
      id: 3,
      eyebrow: "INTERNATIONAL ACCESS",
      title: "The Dubai Bridge: Premium Access",
      text: "The Dubai Bridge: Direct introductions to premium Gulf & GCC brand networks, contract and partnership deal facilitation, and local presence via Impulse Growth Solutions in Dubai.",
      detail:
        "The GCC market offers some of the highest brand rates and influencer campaign budgets in the world today, accompanied by a tax-friendly structure. Through our physical operations and core network on the ground in Marina Office District, Dubai, we serve as your direct representative to premium lifestyle, retail, and corporate partners looking for international talent.",
      bulletPoints: [
        "Local agent representation in standard UAE agencies",
        "GCC high-ticket brand deal negotiation",
        "Corporate contract structuring & tax optimization",
        "VIP network entry & physical on-ground agency introductions",
      ],
      image: images.creatorLuxuryPng,
      alt: "Luxury Dubai pool overlooking Dubai skyline with active brand campaign mockup",
      reverse: false,
      accent: "from-pink-600/35 to-rose-600/25",
    },
  ];

  return (
    <section
      id="creators-influencers"
      className="py-24 bg-gradient-to-b from-[#06060A] via-[#090514] to-[#06060A] relative overflow-hidden"
    >
      {/* Decorative ambient lights that make the section feel alive and energetic */}
      <div className="absolute top-1/4 right-[5%] w-[45rem] h-[45rem] bg-pink-500/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[40rem] h-[40rem] bg-fuchsia-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block Section */}
        <div id="creators-header" className="max-w-3xl mb-24 text-left">
          <span className="inline-flex px-4 py-1.5 bg-gradient-to-r from-ids-magenta/20 to-ids-purple/20 border border-ids-magenta/30 text-ids-magenta text-[10px] font-mono font-bold uppercase tracking-widest rounded-full mb-4 animate-pulse">
            PERSONAL BRANDS. GLOBAL REACH. GLOBAL REVENUE.
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Pillar IV. Turn an audience into a business. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ids-magenta via-purple-500 to-pink-500">
              Then take it global.
            </span>
          </h2>
          <p className="font-sans text-slate-300 text-[15px] sm:text-[16px] leading-relaxed mt-6 max-w-2xl">
            Social algorithms are unpredictable, and USA brand budgets are
            highly competitive. We build independent digital infrastructure for
            top creators and influencers, establish durable monetization
            pathways, and provide direct, VIP bridge access to the premium,
            high-paying Gulf (GCC) market from our Dubai hub.
          </p>
        </div>

        {/* Alternating Layered Rows Section */}
        <div className="space-y-32">
          {rows.map((row) => (
            <div
              key={row.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                row.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column Block with modern offset overlapping cards look */}
              <div className="w-full lg:w-1/2 relative flex items-center justify-center">
                {/* Accent Background Glow card */}
                <div
                  className={`absolute -inset-2 bg-gradient-to-r ${row.accent} rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000`}
                />

                <div className="relative w-full max-w-[500px] lg:max-w-none group cursor-pointer">
                  {/* Decorative Frame */}
                  <div className="absolute top-4 left-4 -right-4 -bottom-4 border border-white/5 rounded-2xl bg-white/[0.01] pointer-events-none transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

                  {/* Primary Image Container with elegant drop shadow */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-video">
                    <img
                      src={row.image}
                      alt={row.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Text Information Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ids-magenta select-none" />
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {row.eyebrow}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {row.title}
                </h3>

                <p className="font-sans text-[14px] sm:text-[15px] font-semibold text-ids-magenta/90 leading-relaxed">
                  {row.text}
                </p>

                <p className="font-sans text-slate-300 text-sm sm:text-[14px] leading-relaxed">
                  {row.detail}
                </p>

                {/* Sublist check points */}
                <ul className="space-y-3 pt-4 border-t border-white/5 font-sans">
                  {row.bulletPoints.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-ids-magenta shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Ribbon Grid Call to Action */}
        <div className="mt-32 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ids-purple/20 via-ids-violet/10 to-indigo-950/20 border border-white/10 relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Ambient Glow inner light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-xl text-left relative z-10 space-y-3">
            <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Stop leaving your livelihood to algorithm updates.
            </h4>
            <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed">
              Take complete control of your digital ownership, secure your
              reach, and unlock access to the word's highest-paying consumer
              markets. Let us build your secure global brand engine today.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple font-bold text-white shadow-[0_5px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_5px_30px_rgba(192,38,211,0.5)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Connect Your Brand Today</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

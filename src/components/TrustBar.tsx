import { useState, useEffect, useRef } from "react";
import { STATS, BRAND_DELIVERABLES } from "../data";
import {
  CheckCircle2,
  TrendingUp,
  Award,
  Building,
  Landmark,
  ShoppingBag,
  Utensils,
  Film,
  Sparkles,
  Anchor,
} from "lucide-react";
import { images } from "../assets";

// Robust dynamic scroll-to-view count-up component
function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extract trailing non-digits and leading numbers
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? numericMatch[2] : value;

  useEffect(() => {
    if (targetNumber === null) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let animationFrameId: number;

    const startCountup = () => {
      const duration = 1200; // fast & smooth animation
      const startTime = performance.now();

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: easeOutQuad for a smooth deceleration look
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * targetNumber);

        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(targetNumber);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
    };

    if (elementRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCountup();
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(elementRef.current);
    } else {
      setCount(targetNumber);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, targetNumber]);

  if (targetNumber === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const clientGroups = [
    {
      category: "Global Enterprise & Logistics",
      icon: Building,
      clients: [
        {
          name: "Dubai International Airports",
          logo: images.logo1,
        },
        {
          name: "DHL Express UAE",
          logo: images.logo2,
        },
        {
          name: "SMSA Express",
          logo: images.logo3,
        },
      ],
    },
    {
      category: "Global FMCG & Consumer",
      icon: Anchor,
      clients: [
        { name: "Red Bull", logo: images.fmcg1 },
        { name: "Awal Dairy", logo: images.fmcg2 },
        { name: "Kellogg's", logo: images.fmcg3 },
      ],
    },
    {
      category: "Luxury & Premium Retail",
      icon: ShoppingBag,
      clients: [
        { name: "Van Cleef & Arpels", logo: images.luxuryRetail },
      ],
    },
    {
      category: "Hospitality & F&B",
      icon: Utensils,
      clients: [
        { name: "Hello Park", logo: images.hospitality1 },
        { name: "Hooters", logo: images.hospitality2 },
      ],
    },
    {
      category: "Entertainment, Media & Sports",
      icon: Film,
      clients: [
        { name: "Al Riyadi Basketball Academy Dubai", logo: images.entertainment1 },
        { name: "Champs Sports", logo: images.entertainment2 },
        { name: "MTV Lebanon", logo: images.entertainment3 },
      ],
    },
    {
      category: "Real Estate & Interiors",
      icon: Landmark,
      clients: [
        { name: "Regal Real Estate", logo: images.realEstate1 },
        { name: "Fidelity Industries", logo: images.realEstate2 },
      ],
    },
    {
      category: "Beauty",
      icon: Sparkles,
      clients: [
        { name: "The Beauty Secrets", logo: images.beauty },
      ],
    },
  ];

  return (
    <section
      id="trust"
      className="relative py-24 bg-slate-50 border-y border-slate-200/80 overflow-hidden"
    >
      {/* Background ambient lighting configured for premium light contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-ids-purple/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trusted By logo board */}
        <div
          id="reputation"
          className="flex flex-col space-y-6 text-center md:text-left mb-16 font-sans"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-ids-purple font-bold">
                REPUTATION & INTEGRATION
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1 tracking-tight">
                Track Record & Client Portfolios
              </h3>
            </div>
            <div className="flex items-center gap-2 justify-center px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <Award className="w-4 h-4 text-ids-purple animate-pulse" />
              <span className="text-xs font-mono text-slate-700">
                USA & UAE Verified Operations
              </span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            IDS and our sister agency in Dubai serve some of the most dynamic
            companies in logistics, consumer products, luxury retail, and public
            institutions globally.
          </p>

          {/* Luxury Tab Switcher for Categories */}
          <div className="flex flex-wrap gap-2 pt-4 select-none">
            {clientGroups.map((group, gIdx) => {
              const GroupIcon = group.icon;
              return (
                <button
                  key={gIdx}
                  onClick={() => setActiveCategory(gIdx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                    activeCategory === gIdx
                      ? "bg-[#06060A] text-white border-transparent shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-150-hover"
                  }`}
                >
                  <GroupIcon className="w-3.5 h-3.5 mt-0.5" />
                  <span>{group.category}</span>
                </button>
              );
            })}
          </div>

          {/* Monochrome client display wall block */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm min-h-[140px] flex flex-col justify-between relative overflow-hidden">
            <div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center"
            >
              {clientGroups[activeCategory].clients.map((client, cIdx) => (
                <div
                  key={cIdx}
                  className="portfolio-logo-enter flex items-center justify-center p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white transition-all duration-300 group min-h-[64px] overflow-hidden"
                  style={{ animationDelay: `${cIdx * 80}ms` }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`h-10 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${
                      client.name === "Regal Real Estate"
                        ? "scale-[5]"
                        : client.name === "Fidelity Industries"
                          ? "scale-[7]"
                        : client.name === "Al Riyadi Basketball Academy Dubai"
                            ? "scale-[2]"
                            : client.name === "Champs Sports"
                              ? "scale-[3]"
                          : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Crucial Specific Qualifier Line (Change 4) */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
              <span>* Excluded representation list: Confidential entities</span>
              <span className="text-ids-magenta font-semibold tracking-wide uppercase">
                Excluding NDA / VIP client classifications.
              </span>
            </div>
          </div>
        </div>

        {/* Deliverables Board */}
        <div
          id="discoveries"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 font-sans"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ids-purple" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold font-bold">
                Our Track Record
              </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
              What We Have Delivered <br />
              For These Brands
            </h4>
            <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
              Impulse Digital Solutions delivers comprehensive brand dominance.
              From securing core remote network lines to crafting search engine
              blueprints and local Middle Eastern campaigns, our systems ensure
              error-free performance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md">
            <h5 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-bold">
              Integrated Client Gains
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BRAND_DELIVERABLES.map((del, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ids-purple mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-sans leading-tight">
                    {del}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid - populated with real figures from src/data STATS */}
        <div
          id="real-stats-counters"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-ids-purple/40 hover:-translate-y-1 hover:shadow-lg text-center flex flex-col justify-center min-h-[110px]"
            >
              <div className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ids-purple via-ids-magenta to-ids-violet">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider mt-2 leading-snug font-medium font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

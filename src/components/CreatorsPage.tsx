import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Tv,
  MessageSquare,
  Shield,
  Zap,
  Flame,
} from "lucide-react";
import { images } from "../assets";

interface CreatorsPageProps {
  onBackToHome: () => void;
}

export default function CreatorsPage({ onBackToHome }: CreatorsPageProps) {
  const serviceTiers = [
    {
      name: "Creator Starter",
      price: "Starting at $1,500",
      period: "One time engagement",
      desc: "For growing creators ready to formalize their digital presence and look like a premium business to brands.",
      features: [
        "Brand audit & positioning framework",
        "Personal brand kit (colors, typography, style guidelines)",
        "Premium, hyper fast single page bio & portfolio website",
        "Polished media kit & interactive rate card system",
        "SEO / AEO baseline authority submission",
      ],
      popular: false,
      accent: "border-white/10 text-ids-purple bg-[#0f0f15]/80",
    },
    {
      name: "Creator Growth",
      price: "Starting at $2,500",
      period: "Monthly retainer",
      desc: "Our most popular tier. Complete hand-off Content direction, growth engine optimization, and brand partnership representation.",
      features: [
        "Everything in Starter setup included",
        "Continuous content strategy & weekly creative direction",
        "Fully managed brand outreach & pitch development",
        "Inbound brand sponsorship negotiations (US + international)",
        "Monthly SEO / AEO position reporting & citation tracking",
        "Access to basic Dubai & Gulf brand directory introductions",
      ],
      popular: true,
      accent:
        "border-ids-magenta/40 text-ids-magenta bg-[#150f1f]/95 shadow-[0_10px_35px_rgba(192,38,211,0.15)]",
    },
    {
      name: "Global Enterprise",
      price: "Starting at $5,000",
      period: "Monthly retainer",
      desc: "For elite creators with 1M+ total audience looking to expand into the GCC, configure private labels, and optimize their business operations.",
      features: [
        "In depth international corporate & company setup mapping",
        "VIP physical introductions to luxury Gulf brand networks",
        "Multi lingual (Arabic/English) localized growth strategy",
        "Private product label / merchandising supply chain guidance",
        "Dedicated day to day manager & custom legal contract protection",
      ],
      popular: false,
      accent: "border-white/10 text-indigo-400 bg-[#0f0f15]/80",
    },
  ];

  const testimonials = [
    {
      quote:
        "IDS literally rebuilt my brand from the ground up. Before working with them, I was getting brand deals but had zero structure. They set up my media kit, automated my rate card, and negotiated three GCC campaigns that paid triple what I was used to in the USA.",
      author: "Elena Vasquez",
      metric: "+240% brand deal value",
      niche: "Luxury Lifestyle Creator (1.2M following)",
    },
    {
      quote:
        "Algorithm updates used to terrify me because my entire business depended on one platform. IDS built me a private members only community system and optimized my brand on Perplexity and ChatGPT. Now, search is a predictable lead engine.",
      author: "Marcus Chen",
      metric: "12,000+ paid subscribers base",
      niche: "Tech & Finance Influencer (850K following)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-ids-black text-slate-100 min-h-screen pt-28 pb-16 relative z-10"
    >
      {/* Background ambient light assets matching the creators vibe */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-ids-purple/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[40rem] h-[50rem] bg-pink-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link Row */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white mb-10 group cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" />
          <span>BACK TO HOMEPAGE</span>
        </button>

        {/* Hero Section Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex px-4 py-1.5 bg-gradient-to-r from-ids-purple/20 to-pink-500/10 border border-ids-purple/30 text-ids-magenta text-[10px] font-mono font-bold uppercase tracking-widest rounded-full">
              Standalone Focus · Creator Operations
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Scale Your Direct Influence. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ids-magenta via-purple-500 to-pink-500">
                Unlock International Brand Budgets.
              </span>
            </h1>
            <p className="font-sans text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-2xl">
              We turn content feeds into enterprise businesses. By engineering
              lightning fast personal portfolios, automating rate cards, and
              brokering VIP introductions to premium lifestyle brands in Dubai
              and across the GCC, we help you secure your own digital capital
              and scale direct income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 text-center"
              >
                <span>Secure Your Brand Growth & Income</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onBackToHome}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white transition duration-300 cursor-pointer text-center"
              >
                <span>Back to All Solutions</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-ids-magenta/30 to-ids-purple/30 rounded-3xl blur-xl opacity-60" />
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={images.creatorMoodPng}
                alt="Modern studio camera and creator space mockup"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ids-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/5">
                <span className="font-mono text-[9px] font-bold text-ids-magenta block tracking-widest uppercase">
                  Creator Blueprint
                </span>
                <p className="font-sans text-xs text-slate-300 italic">
                  "The tools needed to turn content views into measurable
                  corporate equity."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: "What We Build": Zig Zag Visual Section */}
        <div className="py-16 border-t border-white/5 mb-24">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-mono font-bold text-ids-magenta uppercase tracking-widest block mb-2">
              BUILD SPECS OVERVIEW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              What We Build: Architecture for Influence
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2">
              Every system we deploy is secure, fast, and engineered with
              responsive custom cards.
            </p>
          </div>

          <div className="space-y-24">
            {/* Rows Zig Zag */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 space-y-4">
                <span className="font-mono text-xs text-ids-magenta font-bold">
                  SYSTEM 01
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Continuous Personal Web Portfolios
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We design custom digital platforms, single portfolio pages,
                  and bio directories that load at blazing fast speeds. Every
                  setup is optimized for premium brands, ensuring maximum speed,
                  search indexing, and flawless performance.
                </p>
                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
                  <CheckCircle className="w-4 h-4 text-ids-magenta" />
                  <span>
                    High security, custom discovery & uptime compliance
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-2xl border border-white/10 aspect-video bg-neutral-900 shadow-md">
                  <img
                    src={images.creatorGrowth}
                    alt="Growth analytics board showing numbers climbing"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-1/2 space-y-4">
                <span className="font-mono text-xs text-ids-magenta font-bold">
                  SYSTEM 02
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Durable Sponsorship Platforms
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  An automated media kit that updates viewer stats in real-time,
                  coupled with standard rate cards and built-in lead-capture
                  forms, lets brand representatives buy placements with
                  transparent confidence.
                </p>
                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
                  <CheckCircle className="w-4 h-4 text-ids-magenta" />
                  <span>Interactive visitor statistics & rate listings</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-2xl border border-white/10 aspect-video bg-neutral-900 shadow-md">
                  <img
                    src={images.creatorMoodJpeg}
                    alt="Creative workspace highlighting physical camera setup"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: "The Dubai Advantage" Block */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ids-black via-[#110c1f] to-ids-black border border-white/10 relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ids-purple/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex gap-2 px-3 py-1 items-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full">
                <Flame className="w-3.5 h-3.5" /> High Budget Region Growth
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                The Dubai Advantage: Brand Monetization & Audience
                Capitalization
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dubai is the premier global hub for creators, offering
                unprecedented access to high-budget brand partnerships and
                campaign revenue. Through our physical, on the ground
                representatives at the Dubai Production City Node, we position
                your personal brand directly to premium regional giants,
                securing lucrative five figure partnerships.
              </p>
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xl sm:text-2xl font-black text-ids-magenta">
                    3.5x
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Average Campaign Deal Value Increase
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xl sm:text-2xl font-black text-ids-purple">
                    Top Node
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Production City On Ground Connections
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src={images.creatorLuxuryJpeg}
                  alt="Dubai luxury sunset backdrop with pools and skyline"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Service Tiers Matrix */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold text-ids-magenta uppercase tracking-widest block">
              TRANSPARENT PACKAGING
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Representation & Setup Tiers
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400">
              Pick the right tier built to scale your footprint cleanly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-8 border rounded-3xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${tier.accent} relative`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ids-magenta text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                    Most Popular Growth Plan
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-white mb-2 uppercase">
                      {tier.name}
                    </h3>
                    <p className="font-sans text-xs text-slate-300 min-h-[50px]">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="py-4 border-y border-white/5 flex items-baseline gap-2 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 font-sans">
                    {tier.features.map((feat, fidx) => (
                      <li
                        key={fidx}
                        className="flex items-start gap-2 text-[11px] text-slate-300"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-ids-magenta shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#contact"
                    className={`block w-full text-center py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      tier.popular
                        ? "bg-white text-ids-black hover:bg-slate-200"
                        : "bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                    }`}
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Creator Testimonials */}
        <div className="mb-24 py-16 border-t border-b border-white/5">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono font-bold text-ids-magenta uppercase tracking-widest block mb-2">
              PROVEN RESULTS
            </span>
            <h2 className="font-display font-black text-3xl text-white tracking-tight">
              Word from Elite Creators we represent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {testimonials.map((test, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300 italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="font-bold text-sm text-white">
                      {test.author}
                    </p>
                    <p className="text-[10px] text-slate-500">{test.niche}</p>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-ids-magenta/10 border border-ids-magenta/20 text-ids-magenta font-mono font-bold text-[10px]">
                    {test.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ids-purple/20 via-ids-violet/10 to-pink-950/20 border border-white/10 text-center relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ids-purple/20 border border-ids-purple/40 text-[10px] font-bold text-ids-magenta uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Direct REPRESENTATION ACTIVE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Take Control of Your Audience Enterprise
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              We review and reply to qualified submissions within 48 business
              hours. Let us help you protect and scale your personal brand
              revenue.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple font-bold text-[#fafafa] shadow-lg hover:-translate-y-0.5 transition duration-300"
              >
                <span>Scale Your Influence & Brand Revenue Today</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

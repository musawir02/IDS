import { motion } from "motion/react";
import { UAE_ESTABLISHMENT_SERVICES, UAE_FACTS } from "../data";
import {
  ArrowRight,
  Building2,
  Landmark,
  Coins,
  Globe2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function UaeSpotlight() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const factGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  };

  const factCardVariants = {
    hidden: { opacity: 0, scale: 0.82, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 22,
        mass: 0.6,
      },
    },
  };

  return (
    <section
      id="uae-spotlight"
      className="py-16 sm:py-24 bg-gradient-to-b from-ids-purple/20 via-ids-black to-ids-black relative overflow-hidden"
    >
      {/* Dynamic Animated Background Spotlights */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-[10%] w-[25rem] sm:w-[35rem] h-[25rem] sm:h-[35rem] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 left-[5%] w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative & Establishment Scope */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8"
          >
            {/* Category Tag with Animated Live Indicator & Sparkle */}
            <motion.div variants={itemVariants} className="inline-flex self-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-indigo-400/40 text-indigo-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full font-mono shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <Globe2 className="w-3.5 h-3.5 text-indigo-300" />
                <span>UAE & GCC Market Entry</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
              </span>
            </motion.div>

            {/* Main Headline - Sleek, Cohesive & Elegant */}
            <motion.div variants={itemVariants} className="relative">
              {/* Dynamic Title Glow Aura */}
              <div className="absolute -left-6 -top-6 w-80 h-40 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              <h2 className="relative font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                From California to a live UAE company —{" "}
                <br className="hidden sm:inline" />
                <span className="inline-block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-300 drop-shadow-[0_4px_25px_rgba(129,140,248,0.3)]">
                  and a Gulf market ready for you.
                </span>
              </h2>
            </motion.div>

            {/* Introductory Context Paragraph with Interactive Hover Highlight Animation */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.01] hover:bg-indigo-950/35 border border-white/5 hover:border-indigo-400/30 backdrop-blur-md shadow-sm hover:shadow-[0_15px_40px_rgba(99,102,241,0.18)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Left Accent Glow Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
              
              {/* Ambient Hover Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              <p className="relative z-10 font-sans text-xs sm:text-sm text-slate-300 group-hover:text-slate-100 leading-relaxed sm:leading-loose transition-colors duration-300">
                The UAE is the most accessible entry point into one of the
                world&apos;s strongest consumer regions.{" "}
                <span className="font-semibold text-indigo-300 group-hover:text-indigo-200 group-hover:bg-indigo-500/25 group-hover:px-1.5 group-hover:py-0.5 rounded transition-all duration-300 inline-block">
                  Zero personal income tax
                </span>
                ,{" "}
                <span className="font-semibold text-indigo-300 group-hover:text-indigo-200 group-hover:bg-indigo-500/25 group-hover:px-1.5 group-hover:py-0.5 rounded transition-all duration-300 inline-block">
                  100% foreign company ownership
                </span>
                ,{" "}
                <span className="font-semibold text-cyan-300 group-hover:text-cyan-200 group-hover:bg-cyan-500/25 group-hover:px-1.5 group-hover:py-0.5 rounded transition-all duration-300 inline-block">
                  99% internet penetration
                </span>
                , and one of the highest GDP-per-capita rates in the world sit inside a
                market that actively seeks global brands and pays premium prices
                for them. From a UAE base, the wider GCC opens up: Saudi Arabia,
                Qatar, Kuwait, Bahrain, and Oman together represent over{" "}
                <span className="font-semibold text-purple-300 group-hover:text-purple-200 group-hover:bg-purple-500/25 group-hover:px-1.5 group-hover:py-0.5 rounded transition-all duration-300 inline-block">
                  57 million consumers
                </span>{" "}
                with some of the highest digital engagement rates on the planet.
              </p>
            </motion.div>

            {/* Glassmorphic Turnkey Establishment Card - Ultra Responsive */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-slate-950/70 backdrop-blur-xl p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(49,46,129,0.25)] hover:border-indigo-400/40 transition-all duration-300"
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/15 p-2.5 sm:p-3 text-indigo-300 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
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

                {/* Establishment Deliverables Checklist Grid - Highly Responsive */}
                <motion.ul
                  variants={factGridVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5"
                  aria-label="UAE establishment services"
                >
                  {UAE_ESTABLISHMENT_SERVICES.map((service) => (
                    <motion.li
                      key={service}
                      variants={itemVariants}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-400/15 text-xs text-indigo-100 transition-colors hover:bg-indigo-900/40 hover:border-indigo-400/30 min-w-0"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-400" />
                      <span className="font-medium text-[11px] sm:text-xs truncate sm:whitespace-normal">{service}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Partner Guarantee Footer - Responsive Stack */}
                <div className="mt-5 sm:mt-6 border-t border-indigo-400/15 pt-3.5 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs leading-relaxed text-indigo-200/80 gap-1.5">
                  <p>Delivered through our licensed Dubai establishment partners.</p>
                  <p className="font-semibold text-indigo-300 flex items-center gap-1.5 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    One point of contact, not five.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Regional Insights */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
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
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-2 sm:pt-4">
              <motion.a
                href="https://calendly.com/impulsedigitalsolutions"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-xs sm:text-sm font-mono font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.45)] border border-indigo-400/30 overflow-hidden"
              >
                {/* Shiny Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">Find out which structure fits your business</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1.5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: UAE facts dashboard with animated cards & live imagery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-6 w-full mt-4 lg:mt-0"
          >
            <div className="p-5 sm:p-8 bg-slate-950/70 border border-indigo-500/25 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-indigo-500/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30">
                    <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 animate-pulse" />
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                    UAE & Gulf Market Facts
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-indigo-300 font-mono font-bold tracking-widest bg-indigo-500/15 py-1 px-3 rounded-full border border-indigo-500/30 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Dubai Hub
                </span>
              </div>

              {/* Dubai Team Showcase Image with Hover Depth & Badge */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 aspect-[16/10] sm:aspect-video"
              >
                <img
                  src="/assets/images/dubai_team_office.png"
                  alt="Dubai market-entry team planning a client launch"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                  <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] sm:text-xs font-mono font-medium text-slate-200">
                    📍 Dubai Production City Operations Center
                  </div>
                </div>
              </motion.div>

              {/* Facts Grid Layout with Staggered Motion */}
              <motion.div
                variants={factGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {UAE_FACTS.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    variants={factCardVariants}
                    whileHover={{ y: -5, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 450, damping: 18 }}
                    className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-950/40 transition-colors shadow-md hover:shadow-[0_10px_25px_rgba(99,102,241,0.2)] flex flex-col justify-between cursor-pointer"
                  >
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div>
                      <span className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white block leading-tight">
                        {fact.value}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-300 font-sans block mt-1 uppercase font-medium tracking-wide leading-snug">
                        {fact.label}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono block mt-2.5 leading-tight opacity-80 group-hover:opacity-100">
                      Source: {fact.source}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* International Expansion Advantage Callout - Animated & Interactive */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-slate-950/80 border border-indigo-400/30 hover:border-indigo-400/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(79,70,229,0.18)] hover:shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top Border Glow Shimmer Line */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Ambient Shimmer Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
                  {/* Animated Icon Box */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 450 }}
                    className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-400/30 text-indigo-300 shrink-0 mt-0.5 shadow-[0_0_15px_rgba(99,102,241,0.25)] group-hover:border-cyan-400/50 transition-colors"
                  >
                    <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 animate-pulse" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <strong className="font-display text-xs sm:text-sm text-white font-bold block mb-1 flex items-center gap-1.5">
                      <span>International Expansion Advantage</span>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 opacity-80 group-hover:opacity-100 transition-opacity" />
                    </strong>
                    <p className="font-sans text-[11px] sm:text-xs text-indigo-200/90 leading-relaxed group-hover:text-indigo-100 transition-colors">
                      A UAE entity gives you a{" "}
                      <span className="font-semibold text-indigo-200 group-hover:text-cyan-200 group-hover:bg-indigo-500/20 group-hover:px-1 rounded transition-all">
                        licensed base
                      </span>
                      , a{" "}
                      <span className="font-semibold text-indigo-200 group-hover:text-cyan-200 group-hover:bg-indigo-500/20 group-hover:px-1 rounded transition-all">
                        corporate bank account
                      </span>
                      , and{" "}
                      <span className="font-semibold text-indigo-200 group-hover:text-cyan-200 group-hover:bg-indigo-500/20 group-hover:px-1 rounded transition-all">
                        residence
                      </span>{" "}
                      — plus a{" "}
                      <span className="font-semibold text-cyan-300 group-hover:text-white group-hover:bg-cyan-500/20 group-hover:px-1 rounded transition-all">
                        launchpad into the wider GCC
                      </span>
                      . We handle the entity and the launch. You keep the focus on
                      the business.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

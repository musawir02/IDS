import { Pillar, StatItem, ProblemCard, HowItWorksStep, WhyIDSPoint } from "./types";

export const BRAND_DELIVERABLES = [
  "Branding that defines market leaders",
  "Digital Marketing that drives real revenue",
  "Lead Generation that fills pipelines",
  "Media Monitoring that protects reputations",
  "Cybersecurity that protects at every layer",
  "Web Development that converts visitors",
  "AI SEO & AEO that dominates search"
];

export const BRANDS = [
  "DHL",
  "Starbucks",
  "Nasty Vape",
  "Bloomingdale's",
  "Van Cleef & Arpels",
  "Kellogg's",
  "Red Bull",
  "Hello Parks"
];

export const STATS: StatItem[] = [
  { id: "stat-1", value: "30+", label: "Specialists" },
  { id: "stat-2", value: "10+", label: "Years in Market" },
  { id: "stat-3", value: "USA + UAE", label: "2 Continents Operations" },
  { id: "stat-4", value: "Security First", label: "Delivery Guarantee" }
];

export const PROBLEMS: ProblemCard[] = [
  {
    id: 1,
    title: "Your Pipeline is Empty",
    description: "Most businesses rely on referrals and hope. Without a structured brand identity, active digital marketing, and a systematic lead generation engine, your growth is unpredictable, inconsistent, and dangerously dependent on luck.",
    icon: "TrendingDown"
  },
  {
    id: 2,
    title: "Your Vendors Don’t Talk to Each Other",
    description: "When your IT team, security firm, web developer, and marketing agency work in silos, your business pays the price in gaps, inefficiency, and wasted budget. Disconnected vendors create dangerous blind spots that cost you money and expose you to risk.",
    icon: "Layers"
  },
  {
    id: 3,
    title: "You’re Invisible Where It Counts",
    description: "Your customers are searching on Google and asking ChatGPT, Perplexity, and Copilot, while your brand is being discussed across social, news, and review sites. If you’re invisible in search and unaware of what’s being said, competitors win the clients you never even knew you lost.",
    icon: "EyeOff"
  },
  {
    id: 4,
    title: "Your Audience Isn’t Paying You What It Should",
    description: "You’ve built a following, but content alone has stopped working. Brand deals plateau, the algorithm keeps shifting, and there’s no system turning your audience into predictable income, or opening doors to premium global markets like the Gulf.",
    icon: "Bot"
  },
  {
    id: 5,
    title: "No UAE & GCC Market Strategy",
    description: "The UAE and GCC represent one of the world’s fastest-growing digital markets, featuring a highly tax-efficient environment, 100% foreign ownership, and a premium consumer base actively seeking global brands. Most US businesses have no strategy to capture this extraordinary opportunity.",
    icon: "Globe"
  },
  {
    id: 6,
    title: "Cyber Threats Are Escalating",
    description: "With threats escalating daily, without active monitoring and security protection, you are already a target. The question is not whether you will be attacked, it is whether you will be ready when it happens.",
    icon: "ShieldAlert"
  }
];

export const PILLARS: Pillar[] = [
  {
    id: "pillar-1",
    name: "PILLAR I: DIGITAL GROWTH & MARKETING",
    shortName: "Digital Growth",
    icon: "Sparkles",
    description: "Brand. Marketing. Lead generation. Growth.",
    services: [
      {
        id: 1,
        name: "Brand Strategy & Development",
        description: "We build complete brand systems (not just logos), including the strategy, identity, and voice that make your business instantly recognizable and impossible to ignore.",
        whatItIs: "We build complete brand systems (not just logos), including the strategy, identity, and voice that make your business instantly recognizable and impossible to ignore.",
        included: [
          "Brand strategy & positioning",
          "Logo & full visual identity system",
          "Color, typography & design language",
          "Brand voice & messaging framework",
          "Brand guidelines",
          "Collateral & templates",
          "Rebrand & brand refresh"
        ],
        whyItMatters: "A strong brand lets you command premium pricing, build instant trust, and stay memorable: it's the foundation everything else is built on."
      },
      {
        id: 2,
        name: "Full Funnel Digital Marketing",
        description: "End to end marketing that moves people from first impression to paying customer across every channel, managed as one coordinated system.",
        whatItIs: "End to end marketing that moves people from first impression to paying customer across every channel, managed as one coordinated system.",
        included: [
          "Marketing strategy & channel planning",
          "Social media management",
          "Content & creative production",
          "Email & nurture campaigns",
          "Paid social & display",
          "Analytics & reporting"
        ],
        whyItMatters: "Disconnected one off campaigns leak money; a full funnel turns attention into revenue and makes every dollar of USD spend work harder."
      },
      {
        id: 3,
        name: "Lead Generation & Paid Advertising",
        description: "Systematic, always-on lead engines that fill your pipeline with qualified buyers instead of leaving growth to referrals and luck.",
        whatItIs: "Systematic, always-on lead engines that fill your pipeline with qualified buyers instead of leaving growth to referrals and luck.",
        included: [
          "Paid search & social campaigns (Meta, Google, TikTok, LinkedIn)",
          "Landing pages & conversion optimization",
          "Lead capture & qualification",
          "Retargeting",
          "Campaign management & A/B testing"
        ],
        whyItMatters: "Predictable, measurable lead flow replaces guesswork: you know what each customer costs and can scale on demand."
      },
      {
        id: 4,
        name: "AI Powered SEO",
        description: "Search engine optimization that gets you found and ranked on Google through technical, content, and authority work, sharpened with AI driven research and optimization.",
        whatItIs: "Search engine optimization that gets you found and ranked on Google through technical, content, and authority work, sharpened with AI driven research and optimization.",
        included: [
          "Technical SEO audit & fixes",
          "Keyword & competitor research",
          "On-page optimization",
          "Content strategy",
          "Link building & authority",
          "Local SEO",
          "Ongoing ranking reporting"
        ],
        whyItMatters: "Organic search is compounding, high-intent traffic you don't pay per click for: durable visibility that builds over time."
      },
      {
        id: 5,
        name: "AEO: Answer Engine Optimization",
        description: "Optimization for AI answer engines: ChatGPT, Perplexity, Microsoft Copilot, so your business is the brand they recommend, not just a blue link on Google.",
        whatItIs: "Optimization for AI answer engines: ChatGPT, Perplexity, Microsoft Copilot, so your business is the brand they recommend, not just a blue link on Google.",
        included: [
          "AI visibility audit",
          "Structured data & entity optimization",
          "Authoritative content built for AI citation",
          "Answer engine monitoring",
          "Reputation signals across the sources AI reads"
        ],
        whyItMatters: "Millions of buying decisions now start with an AI prompt that returns one answer. If that answer isn't you, your competitor is winning clients you never see."
      },
      {
        id: 6,
        name: "Media Monitoring & Brand Intelligence",
        description: "Always on tracking of what's being said about your brand, competitors, and industry across social, news, review sites, and AI engines.",
        whatItIs: "Always on tracking of what's being said about your brand, competitors, and industry across social, news, review sites, and AI engines.",
        included: [
          "Real time brand & keyword monitoring",
          "Sentiment analysis",
          "Competitor tracking",
          "Reputation alerts",
          "Crisis early warning",
          "Regular intelligence reports"
        ],
        whyItMatters: "You can't manage what you can't see. One unaddressed story can do damage before you know it exists: monitoring lets you act before it spreads."
      }
    ]
  },
  {
    id: "pillar-2",
    name: "PILLAR II: WEB & APP DEVELOPMENT",
    shortName: "Web & App Dev",
    icon: "Code",
    description: "Platforms that perform, convert, and scale.",
    services: [
      {
        id: 7,
        name: "Website Design & Development",
        description: "High performance websites engineered to convert visitors into customers, fast, secure, and built to scale, not just to look good.",
        whatItIs: "High performance websites engineered to convert visitors into customers, fast, secure, and built to scale, not just to look good.",
        included: [
          "UX/UI design",
          "Responsive development",
          "CMS & e-commerce builds",
          "Speed & performance optimization",
          "SEO ready architecture",
          "Security by design",
          "Maintenance & support"
        ],
        whyItMatters: "Your website is your hardest-working salesperson; a slow or unconvincing one quietly costs you customers every day."
      },
      {
        id: 8,
        name: "Mobile App Development",
        description: "Native and cross platform mobile apps designed for performance, usability, and global scale.",
        whatItIs: "Native and cross platform mobile apps designed for performance, usability, and global scale.",
        included: [
          "App strategy & UX design",
          "iOS & Android development",
          "API & backend integration",
          "QA & testing",
          "App store launch",
          "Ongoing updates & support"
        ],
        whyItMatters: "A well built app deepens customer loyalty and opens a direct, high engagement channel to your audience."
      }
    ]
  },
  {
    id: "pillar-3",
    name: "PILLAR III: CYBERSECURITY & IT",
    shortName: "Cybersecurity & IT",
    icon: "Lock",
    description: "Growth without security is exposure.",
    services: [
      {
        id: 9,
        name: "Managed Security Services",
        description: "Continuous, enterprise grade protection and monitoring of your systems, networks, and data, security as an always on service, not a one time setup.",
        whatItIs: "Continuous, enterprise grade protection and monitoring of your systems, networks, and data, security as an always on service, not a one time setup.",
        included: [
          "24/7 threat monitoring",
          "Endpoint & network protection",
          "Threat detection & response",
          "Security patching",
          "Compliance support",
          "Regular security reporting"
        ],
        whyItMatters: "Cyber threats are constant and automated; ongoing protection is the difference between catching an attack early and discovering a breach too late."
      },
      {
        id: 10,
        name: "Cloud & Microsoft Solutions",
        description: "Setup, migration, and management of your cloud and Microsoft environment for secure, reliable, productive operations.",
        whatItIs: "Setup, migration, and management of your cloud and Microsoft environment for secure, reliable, productive operations.",
        included: [
          "Microsoft 365 & Azure setup",
          "Cloud migration",
          "Identity & access management",
          "Secure configuration",
          "Backup & recovery",
          "Ongoing administration"
        ],
        whyItMatters: "A properly configured cloud environment is faster, safer, and cheaper to run, while a misconfigured one is one of the most common ways businesses get breached."
      },
      {
        id: 11,
        name: "Core IT Infrastructure Management",
        description: "Day to day management of the IT backbone your business runs on, networks, servers, devices, and support.",
        whatItIs: "Day to day management of the IT backbone your business runs on, networks, servers, devices, and support.",
        included: [
          "Network & server management",
          "Device & endpoint management",
          "IT helpdesk & support",
          "System monitoring",
          "Patch & update management",
          "Vendor coordination"
        ],
        whyItMatters: "Reliable infrastructure keeps your team productive and your operations running; downtime and IT chaos cost real money and momentum."
      },
      {
        id: 12,
        name: "Penetration Testing & Vulnerability Assessment",
        description: "Controlled, authorized testing that finds the weaknesses in your systems before real attackers do.",
        whatItIs: "Controlled, authorized testing that finds the weaknesses in your systems before real attackers do.",
        included: [
          "Vulnerability scanning",
          "Authorized penetration testing",
          "Risk assessment & prioritization",
          "Remediation guidance",
          "Re-testing",
          "Compliance-ready reporting"
        ],
        whyItMatters: "You can't fix what you don't know is broken; proactive testing closes the gaps that lead to breaches and meets the security standards clients and regulators expect."
      },
      {
        id: 13,
        name: "Digital Forensics & Incident Response",
        description: "Rapid response when something goes wrong (containing incidents, investigating what happened, and getting you back to safe operations).",
        whatItIs: "Rapid response when something goes wrong (containing incidents, investigating what happened, and getting you back to safe operations).",
        included: [
          "Incident containment",
          "Forensic investigation",
          "Root-cause analysis",
          "Recovery & restoration",
          "Post-incident reporting",
          "Prevention recommendations"
        ],
        whyItMatters: "When an incident hits, speed and expertise limit the damage, protect your reputation, and help you recover and prove what happened."
      },
      {
        id: 14,
        name: "Application Security & Protection",
        description: "Security built into and around your applications so the software your business and customers rely on can't be turned against you.",
        whatItIs: "Security built into and around your applications so the software your business and customers rely on can't be turned against you.",
        included: [
          "Secure code & app review",
          "Application firewall (WAF)",
          "API security",
          "Vulnerability remediation",
          "Ongoing app monitoring"
        ],
        whyItMatters: "Applications are a top attack target; securing them protects your data, your customers, and the trust your business depends on."
      }
    ]
  },
  {
    id: "pillar-4",
    name: "PILLAR IV: CREATORS & INFLUENCERS",
    shortName: "Creators & Influencers",
    icon: "Tv",
    description: "Turn an audience into a business, then take it global.",
    services: [
      {
        id: 15,
        name: "Personal Brand Identity & Positioning",
        description: "A complete personal brand system that turns a profile into a recognizable, authoritative name.",
        whatItIs: "A complete personal brand system that turns a profile into a recognizable, authoritative name.",
        included: [
          "Brand audit & positioning",
          "Visual identity system",
          "Tone of voice & messaging",
          "Content pillar strategy",
          "Positioning statement"
        ],
        whyItMatters: "A defined brand makes every post compound your authority instead of just filling a feed, and it's what attracts serious brand partners."
      },
      {
        id: 16,
        name: "Content & Growth Strategy (SEO + AEO)",
        description: "A full growth engine that turns content into reach, audience, and discoverability across platforms and AI search.",
        whatItIs: "A full growth engine that turns content into reach, audience, and discoverability across platforms and AI search.",
        included: [
          "Content strategy & creative direction",
          "SEO + AEO visibility",
          "Paid growth campaigns",
          "Platform specific optimization (Instagram, TikTok, YouTube, LinkedIn)"
        ],
        whyItMatters: "It replaces guesswork and algorithm dependence with a repeatable system for growing the right audience, and being found on Google and AI engines alike."
      },
      {
        id: 17,
        name: "Monetization Systems: Media Kit, Rate Card & Outreach",
        description: "The business infrastructure that turns an audience into income.",
        whatItIs: "The business infrastructure that turns an audience into income.",
        included: [
          "Professional media kit",
          "Rate card",
          "Brand partnership deck",
          "Outreach infrastructure",
          "Pricing & packaging guidance"
        ],
        whyItMatters: "Most creators leave money on the table because they're not packaged to be bought; this makes you easy to hire and confident to charge what you're worth."
      },
      {
        id: 18,
        name: "Brand Partnership & Deal Negotiation",
        description: "Hands-on support securing and negotiating brand deals on your behalf.",
        whatItIs: "Hands-on support securing and negotiating brand deals on your behalf.",
        included: [
          "Partner outreach",
          "Deal sourcing",
          "Negotiation support",
          "Contract guidance",
          "Campaign coordination"
        ],
        whyItMatters: "Better deals, better terms, and partners you might never have reached alone, handled by people who do this for a living."
      },
      {
        id: 19,
        name: "Dubai & Gulf Brand Network Access",
        description: "Direct access to one of the world's most premium creator markets through our on-ground Dubai team and brand network.",
        whatItIs: "Direct access to one of the world's most premium creator markets through our on-ground Dubai team and brand network.",
        included: [
          "Gulf brand connections & introductions",
          "UAE campaign pitching & negotiation",
          "Brand trip & activation coordination",
          "VIP network access via Impulse Growth Solutions"
        ],
        whyItMatters: "The Gulf pays the most and competes the least for international creators, and almost no US creator is positioned to access it. We are."
      }
    ]
  },
  {
    id: "pillar-5",
    name: "PILLAR V: UAE & GCC MARKET SERVICES",
    shortName: "UAE & GCC Expansion",
    icon: "Award",
    description: "The only California partner with a team on the ground in Dubai.",
    services: [
      {
        id: 20,
        name: "UAE Market Entry Strategy",
        description: "A complete, turnkey roadmap for US businesses entering the UAE and Gulf markets.",
        whatItIs: "A complete, turnkey roadmap for US businesses entering the UAE and Gulf markets.",
        included: [
          "Market opportunity assessment",
          "Entry strategy & positioning",
          "Regulatory & setup guidance",
          "Localization strategy",
          "Go-to-market plan"
        ],
        whyItMatters: "The UAE offers extraordinary opportunity but punishes guesswork; a real strategy built by a team on the ground is the difference between expansion and an expensive misstep."
      },
      {
        id: 21,
        name: "MENA Market Research & Intelligence",
        description: "On the ground research and consumer intelligence across the MENA region that US only agencies simply can't access.",
        whatItIs: "On the ground research and consumer intelligence across the MENA region that US only agencies simply can't access.",
        included: [
          "Market & competitor research",
          "Consumer insight",
          "Sector analysis",
          "Demand & opportunity sizing",
          "Cultural & localization intelligence"
        ],
        whyItMatters: "Decisions made on real regional data, not assumptions, dramatically raise your odds of success in an unfamiliar market."
      },
      {
        id: 22,
        name: "GCC Marketing Execution",
        description: "Full marketing delivery across the Gulf, executed locally by our Dubai team.",
        whatItIs: "Full marketing delivery across the Gulf, executed locally by our Dubai team.",
        included: [
          "Regional campaign management",
          "Localized content & creative",
          "Social & paid media",
          "Influencer & partnership activation",
          "Performance reporting"
        ],
        whyItMatters: "Marketing that's culturally fluent and locally executed performs far better than campaigns simply translated and exported from the US."
      },
      {
        id: 23,
        name: "UAE Branding & Creative Production",
        description: "Region specific branding and creative built to resonate with Gulf audiences.",
        whatItIs: "Region specific branding and creative built to resonate with Gulf audiences.",
        included: [
          "Localized brand & creative strategy",
          "Arabic & bilingual creative",
          "Campaign & content production",
          "Event & activation creative"
        ],
        whyItMatters: "Premium Gulf audiences expect a premium, culturally attuned brand experience; generic creative signals you don't understand the market."
      }
    ]
  }
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Free Discovery Call",
    description: "We start with a free 30 minute strategy session to understand your business, your goals, and your growth opportunities across the US and UAE markets."
  },
  {
    id: "step-2",
    number: "02",
    title: "Full Digital Audit",
    description: "Complete audit of your IT infrastructure, security posture, website performance, SEO and AEO standing, current media presence and brand sentiment, and market positioning in both US and UAE markets."
  },
  {
    id: "step-3",
    number: "03",
    title: "Custom Roadmap",
    description: "A tailored action plan covering all pillars simultaneously (cybersecurity, development, SEO, AEO, branding, digital marketing, lead generation, media monitoring, and UAE market strategy) with clear timelines."
  },
  {
    id: "step-4",
    number: "04",
    title: "Integrated Execution",
    description: "Our unified US and UAE teams execute across all pillars in a coordinated, timeline driven delivery. No silos. No gaps. No excuses. Total integration from day one."
  },
  {
    id: "step-5",
    number: "05",
    title: "Monitor, Optimize & Scale",
    description: "Continuous IT monitoring, media intelligence, monthly performance reporting, and proactive optimization ensure your business keeps growing, stays fully protected, and remains the answer AI recommends."
  }
];

export const WHY_IDS: WhyIDSPoint[] = [
  {
    id: 1,
    title: "USA + UAE Dual Operations",
    description: "The only digital partner operating simultaneously in California and Dubai, giving you unmatched reach and operational capability across two of the world's most powerful and fastest growing business markets."
  },
  {
    id: 2,
    title: "Security First Foundation",
    description: "Cybersecurity is not an add-on at IDS. It is backed by enterprise-grade safety, baked into every website, campaign, configuration, and structural pipeline we build. Safe expansion is sustainable growth."
  },
  {
    id: 3,
    title: "Full Funnel Growth",
    description: "From brand identity to lead generation to conversion, IDS manages your complete digital growth funnel. We don't just build presence, we actively fill your pipeline with qualified, hot buyer leads."
  },
  {
    id: 4,
    title: "One Vendor, Total Savings",
    description: "Replace 5 to 6 separate vendors with one unified partner. Consolidate your vendor stack and cut overlapping costs significantly while increasing efficiency, eliminating gaps, and giving your team back hours."
  },
  {
    id: 5,
    title: "Total Brand Intelligence",
    description: "Through our media monitoring service, you always know exactly what is being said about your brand, your competitors, and your industry across every platform and in every market you operate in."
  },
  {
    id: 6,
    title: "International Market Intelligence",
    description: "Through IGS in Dubai, we bring real operational international market expertise, not theory. We have the team, the network, and the on the ground intelligence that makes UAE GCC entry highly successful."
  },
  {
    id: 7,
    title: "SEO + AEO Combined",
    description: "We don't just rank you on Google. We make you the answer that AI recommends. SEO and AEO delivered together by one integrated team for maximum digital visibility across every platform in 2026."
  },
  {
    id: 8,
    title: "Transparent Reporting",
    description: "Real time dashboards, monthly performance reports, and open door communication at all times. You always know exactly what is happening across every service, campaign, and market with complete clarity."
  },
  {
    id: 9,
    title: "Long Term Partnership",
    description: "We measure our success by your growth. Our entire business model is built on long term retainers, not one off projects. When you grow, we grow. That alignment of incentives changes everything."
  },
  {
    id: 10,
    title: "Creator Growth, Globally",
    description: "We turn audiences into secure, monetizable operations, giving you direct access to premium Gulf brand partnerships through our on-ground Dubai team. Your influence, professionalized."
  }
];

export const UAE_FACTS = [
  { value: "$500B+", label: "UAE GDP 2026" },
  { value: "9.9M", label: "Population (89% Urban)" },
  { value: "99%", label: "Internet Penetration" },
  { value: "$27B+", label: "Ecommerce Market Size" },
  { value: "Strong Access", label: "Foreign ownership access" },
  { value: "Favorable", label: "Regional tax policies" },
  { value: "Gateway", label: "To 2.5B MENA Consumers" },
  { value: "No. 1", label: "Dubai World Business Hub" }
];

export const CALL_EXPECTATIONS = [
  "Full audit of your current digital footprint (USA + UAE).",
  "Top 3 security & design vulnerabilities identified.",
  "Brand sentiment & reputation assessment.",
  "Favorable tax & market entry analysis.",
  "Custom 90 day growth roadmap."
];

export const SERVICE_OPTIONS = [
  "Managed Security Services",
  "Penetration Testing",
  "Cloud & Microsoft Services",
  "Core IT Services",
  "Digital Forensics",
  "Advanced App Protection",
  "Website Development",
  "Mobile App Development",
  "AI-Powered SEO",
  "AEO Answer Engine Optimization",
  "Branding & Creative Services",
  "Digital Marketing",
  "Lead Generation",
  "Media Monitoring & Intelligence",
  "Brand Reputation Management",
  "Competitive Intelligence",
  "UAE Market Entry Strategy",
  "MENA Market Research",
  "GCC Marketing Strategy",
  "Full Package All Services",
  "Not Sure Need Advice"
];

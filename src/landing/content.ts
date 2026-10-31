import {
  AddOn,
  CompareGroup,
  FaqItem,
  MarketingPackage,
  PackageId,
} from "../types";

// Content for the Digital Marketing Packages landing page. The offer below is copied word
// for word from the "Digital Marketing Packages" poster: do not reword or recalculate it.
// This file is also imported by the server (enquiry emails), so it must stay plain data.

// Business details that are not confirmed yet are written as "[TO CONFIRM: …]" literals, so
// `npm run check:launch` can find every one in the built page and fail until they are replaced.

export const BRAND_NAME = "IDS – Impulse Digital Solutions";

export const HERO = {
  title: "Digital Marketing Packages",
  tagline: "Strategy. Content. Ads. Real Growth.",
  // Copy from the approved proposal (Part B6), confirmed 2026-10-31
  subhead:
    "Social media management, content creation, Meta & Google Ads, SEO, AEO and GEO in four monthly packages.",
};

export const CTA_LABEL = "Let's grow your business";

export const FOOTNOTE = "* VAT applies to all rates. Advertising budgets are not included.";

export const PACKAGES: MarketingPackage[] = [
  {
    id: "starter",
    number: "01",
    name: "Starter",
    tagline: "Build your online presence",
    priceAed: 1799,
    recommended: false,
    inclusions: [
      { label: "Meta Ads Management" },
      { label: "6 Graphic Posts / Month", volume: true },
      { label: "Content Creation & Captions" },
      { label: "Marketing Strategy Development" },
      { label: "Instagram Profile Optimization" },
      { label: "Google Business Profile Optimization" },
      { label: "Facebook & Instagram Page Management" },
      { label: "Monthly Performance Report" },
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth",
    tagline: "Take your business further",
    priceAed: 2399,
    recommended: true,
    inheritsFrom: "starter",
    inclusions: [
      { label: "Google Ads Management" },
      { label: "Local SEO" },
      { label: "9 Posts / Month", volume: true },
      { label: "7 Graphic Posts + 2 Reels", volume: true },
    ],
  },
  {
    id: "professional",
    number: "03",
    name: "Professional",
    tagline: "Expand your digital impact",
    priceAed: 2999,
    recommended: false,
    inheritsFrom: "growth",
    inclusions: [
      { label: "Website SEO" },
      { label: "12 Posts / Month", volume: true },
      { label: "9 Graphic Posts + 3 Reels", volume: true },
    ],
  },
  {
    id: "premium",
    number: "04",
    name: "Premium",
    tagline: "Maximize your digital presence",
    priceAed: 3999,
    recommended: false,
    note: "More content. Stronger AI visibility. Greater reach and growth.",
    inheritsFrom: "professional",
    inclusions: [
      { label: "AEO + GEO" },
      { label: "18 Content Pieces", volume: true },
      { label: "11 Graphic Posts + 4 Reels + 3 Edited Reels", volume: true },
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "photoshoot",
    name: "Professional Photoshoot",
    detail: "Up to 3 hours",
    priceAed: 999,
  },
  {
    id: "website",
    name: "Website Development",
    detail: "Starting from",
    pricePrefix: "from",
    priceAed: 999,
  },
];

export const DEFAULT_PACKAGE: PackageId = "growth";

/**
 * Part B1 (confirmed 2026-10-31): a higher package's post counts replace the counts it
 * inherits, so Growth is 9 posts in total, not 6 + 9. Set to false if the counts add up.
 */
export const POST_COUNTS_REPLACE = true;

export const formatAed = (amount: number) => new Intl.NumberFormat("en-US").format(amount);

export const priceLabel = (pkg: MarketingPackage) => `AED ${formatAed(pkg.priceAed)} / month`;

export const addOnPriceLabel = (addOn: AddOn) =>
  `${addOn.pricePrefix ? `${addOn.pricePrefix} ` : ""}AED ${formatAed(addOn.priceAed)}`;

export const getPackage = (id: PackageId) => PACKAGES.find((pkg) => pkg.id === id)!;

export const getAddOn = (id: string) => ADD_ONS.find((addOn) => addOn.id === id);

/** Features a package inherits through "Everything in …, plus", grouped by the package they come from */
export function inheritedFeatures(id: PackageId) {
  const groups: { from: MarketingPackage; items: string[] }[] = [];
  let parentId = getPackage(id).inheritsFrom;
  while (parentId) {
    const parent = getPackage(parentId);
    const items = parent.inclusions
      .filter((inclusion) => !(POST_COUNTS_REPLACE && inclusion.volume))
      .map((inclusion) => inclusion.label);
    groups.unshift({ from: parent, items });
    parentId = parent.inheritsFrom;
  }
  return groups;
}

// Row labels confirmed 2026-10-31 (Part B4); every value comes from the poster.
const all = { starter: true, growth: true, professional: true, premium: true };

export const COMPARE_PRICE_ROW_LABEL = "Price";

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    title: "Content",
    rows: [
      {
        label: "Total posts / content pieces per month",
        values: { starter: "6", growth: "9", professional: "12", premium: "18" },
      },
      {
        label: "Graphic posts",
        values: { starter: "6", growth: "7", professional: "9", premium: "11" },
      },
      {
        label: "Reels",
        values: { starter: false, growth: "2", professional: "3", premium: "4" },
      },
      {
        label: "Edited reels",
        values: { starter: false, growth: false, professional: false, premium: "3" },
      },
      { label: "Content Creation & Captions", values: all },
    ],
  },
  {
    title: "Social media",
    rows: [
      { label: "Facebook & Instagram Page Management", values: all },
      { label: "Instagram Profile Optimization", values: all },
    ],
  },
  {
    title: "Advertising (budgets not included)",
    rows: [
      { label: "Meta Ads Management", values: all },
      {
        label: "Google Ads Management",
        values: { starter: false, growth: true, professional: true, premium: true },
      },
    ],
  },
  {
    title: "Search & AI visibility",
    rows: [
      { label: "Google Business Profile Optimization", values: all },
      {
        label: "Local SEO",
        values: { starter: false, growth: true, professional: true, premium: true },
      },
      {
        label: "Website SEO",
        values: { starter: false, growth: false, professional: true, premium: true },
      },
      {
        label: "AEO + GEO",
        values: { starter: false, growth: false, professional: false, premium: true },
      },
    ],
  },
  {
    title: "Strategy & reporting",
    rows: [
      { label: "Marketing Strategy Development", values: all },
      { label: "Monthly Performance Report", values: all },
    ],
  },
];

// Approved AEO/GEO wording rules (proposal 5.4): describe effort, never promise placement.
export const AEO_DEFINITION =
  "AEO (Answer Engine Optimization) means structuring your website content, FAQs and business information so search features and AI answer tools can more easily find and understand it.";
export const GEO_DEFINITION =
  "GEO (Generative Engine Optimization) is work to improve how your business is represented across AI-powered search and answer experiences, such as AI overviews and AI assistants.";
export const AI_QUALIFIER =
  "AI-generated results are controlled by each platform and change often. These services aim to improve your visibility; they can't guarantee that your business will appear in, or be cited by, any AI-generated answer.";

// Only questions with confirmed answers are shown. Add these once the business answers them:
// how much to spend on ads; minimum contract and cancellation; upgrading or downgrading;
// Reels vs Edited Reels; add-on billing and which packages they suit; Arabic content;
// when results can be expected.
export const FAQ: FaqItem[] = [
  {
    question: "Is the advertising budget included?",
    answer: ["No. Advertising budgets are not included in the package prices."],
  },
  {
    question: "Does VAT apply?",
    answer: ["Yes. VAT applies to all rates."],
  },
  {
    question: "What are AEO and GEO, and can you guarantee AI visibility?",
    answer: [AEO_DEFINITION, GEO_DEFINITION, `AEO + GEO are included in Premium. ${AI_QUALIFIER}`],
  },
];

// Wording from the approved proposal (Part B10), confirmed 2026-10-31
export const NEXT_STEPS = [
  "We receive your enquiry.",
  "We contact you using your preferred method.",
  "An onboarding call about your brand, goals and audience.",
  "Strategy and a content calendar, then launch and monthly reports.",
];

export const CONTACT = {
  whatsappDisplay: "+971 55 990 4045",
  whatsappDigits: "971559904045",
  publicEmail: "rajinazihah@gmail.com",
};

export const BUSINESS = {
  legalEntity: "Impulse Digital Solutions",
};

export const PHONE_COUNTRIES = [
  { code: "971", label: "UAE +971" },
  { code: "966", label: "Saudi Arabia +966" },
  { code: "974", label: "Qatar +974" },
  { code: "965", label: "Kuwait +965" },
  { code: "973", label: "Bahrain +973" },
  { code: "968", label: "Oman +968" },
  { code: "91", label: "India +91" },
  { code: "92", label: "Pakistan +92" },
  { code: "44", label: "UK +44" },
  { code: "1", label: "USA / Canada +1" },
  { code: "other", label: "Other (type +code)" },
];

// Consent wording approved 2026-10-31 (Part C14). Bump the version when it changes.
export const CONSENT = {
  version: "2026-10-31",
  contactNote: "We'll use this only to respond to your enquiry.",
  marketingOptIn: "Send me occasional offers and updates from IDS. You can opt out anytime.",
  /** Tracking consent banner text. Empty until approved: the banner, and so tracking, can't appear before then. */
  trackingBanner: "",
};

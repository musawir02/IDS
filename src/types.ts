export interface Service {
  id: number;
  name: string;
  description: string;
  keyPoints?: string[];
  bulletTitle?: string;
  bullets?: string[];
  whatItIs?: string;
  included?: string[];
  whyItMatters?: string;
}

export interface Pillar {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  services: Service[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ProblemCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface WhyIDSPoint {
  id: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  location: string;
  service: string;
  notes: string;
}

// Digital Marketing Packages landing page (/digital-marketing/)

export type PackageId = "starter" | "growth" | "professional" | "premium";
export type AddOnId = "photoshoot" | "website";
export type ContactMethod = "whatsapp" | "call" | "email";

export interface PackageInclusion {
  label: string;
  /** Post and content counts, which a higher package replaces with its own */
  volume?: boolean;
}

export interface MarketingPackage {
  id: PackageId;
  number: string;
  name: string;
  tagline: string;
  priceAed: number;
  recommended: boolean;
  note?: string;
  inheritsFrom?: PackageId;
  inclusions: PackageInclusion[];
}

export interface AddOn {
  id: AddOnId;
  name: string;
  detail: string;
  pricePrefix?: string;
  priceAed: number;
}

export type CompareValue = boolean | string;

export interface CompareRow {
  label: string;
  values: Record<PackageId, CompareValue>;
}

export interface CompareGroup {
  title: string;
  rows: CompareRow[];
}

export interface FaqItem {
  question: string;
  answer: string[];
}

export type CampaignKey =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content"
  | "gclid"
  | "fbclid";

export interface LeadPayload {
  submission_id: string;
  resend_after_uncertain?: boolean;
  package_id: string;
  addon_ids: string[];
  business_type: string;
  ad_budget: string;
  name: string;
  business_name: string;
  contact_method: string;
  phone_country: string;
  phone_number: string;
  email: string;
  message: string;
  marketing_opt_in: boolean;
  consent_version: string;
  /** Spam trap, always empty for people */
  website: string;
  elapsed_ms: number;
  page_url: string;
  campaign: Partial<Record<CampaignKey, string>>;
}

export type LeadField =
  | "package_id"
  | "addon_ids"
  | "business_type"
  | "ad_budget"
  | "name"
  | "business_name"
  | "contact_method"
  | "phone_number"
  | "email"
  | "message";

export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadStatus =
  | "accepted"
  | "invalid"
  | "rate_limited"
  | "not_sent"
  | "uncertain"
  | "in_progress";

export interface LeadResponse {
  status: LeadStatus;
  ref?: string;
  remaining_ms?: number;
  duplicate?: boolean;
  errors?: LeadErrors;
}

export type LeadCheckStatus = "in_progress" | "accepted" | "not_sent" | "uncertain" | "unknown";

export interface LeadCheckResponse {
  status: LeadCheckStatus;
  ref?: string;
  remaining_ms?: number;
}

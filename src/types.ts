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

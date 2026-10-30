import { CampaignKey } from "../types";

// Analytics for the landing page. Tracking stays OFF until all three are in place:
//   1. tracking IDs are supplied,
//   2. the privacy policy update is approved and published,
//   3. the consent wording and mechanism are approved.
// Only then set `enabled` and the Tag Manager ID. While off, track() does nothing, no script
// is loaded, no cookie is set and the consent banner isn't shown.
export const ANALYTICS_CONFIG: { enabled: boolean; gtmContainerId: string } = {
  enabled: false,
  gtmContainerId: "",
};

type Consent = "unknown" | "granted" | "denied";
type Params = Record<string, string | number | boolean | string[] | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Consent is held in memory only until the consent mechanism is approved
let consent: Consent = "unknown";
let tagManagerLoaded = false;

export const isAnalyticsEnabled = () =>
  ANALYTICS_CONFIG.enabled && /^GTM-[A-Z0-9]+$/.test(ANALYTICS_CONFIG.gtmContainerId);

export const getConsent = () => consent;

function loadTagManager() {
  if (tagManagerLoaded || !isAnalyticsEnabled()) return;
  tagManagerLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ANALYTICS_CONFIG.gtmContainerId)}`;
  document.head.appendChild(script);
}

export function setConsent(choice: "granted" | "denied") {
  consent = choice;
  if (choice === "granted") loadTagManager();
}

export function track(event: string, params: Params = {}) {
  if (!isAnalyticsEnabled() || consent !== "granted") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const CAMPAIGN_KEYS: CampaignKey[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

/** Campaign details from the page URL, sent with the enquiry email (independent of tracking) */
export function readCampaign(search: string): Partial<Record<CampaignKey, string>> {
  const params = new URLSearchParams(search);
  const campaign: Partial<Record<CampaignKey, string>> = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim();
    if (value) campaign[key] = value.slice(0, 200);
  }
  return campaign;
}

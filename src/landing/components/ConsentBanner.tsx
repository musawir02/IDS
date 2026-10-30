import { useState } from "react";
import { getConsent, isAnalyticsEnabled, setConsent } from "../../lib/analytics";
import { CONSENT } from "../content";
import Button from "./ui/Button";

/**
 * Shown only once tracking is switched on and approved wording exists. Without either,
 * nothing renders, so consent can't be given and no tag ever loads.
 */
export default function ConsentBanner() {
  const [answered, setAnswered] = useState(getConsent() !== "unknown");
  if (!isAnalyticsEnabled() || !CONSENT.trackingBanner || answered) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setAnswered(true);
  };

  return (
    <div
      role="region"
      aria-label="Tracking consent"
      className="fixed inset-x-4 bottom-24 z-50 rounded-2xl border border-white/10 bg-card p-5 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-md"
    >
      <p className="text-sm text-ink">{CONSENT.trackingBanner}</p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => choose("granted")}>
          Accept
        </Button>
        <Button size="sm" variant="secondary" onClick={() => choose("denied")}>
          Reject
        </Button>
      </div>
    </div>
  );
}

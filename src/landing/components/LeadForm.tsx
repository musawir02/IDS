import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { AddOnId, LeadErrors, LeadField, LeadPayload, PackageId } from "../../types";
import { ADD_ONS, CONSENT, formatAed, PACKAGES, PHONE_COUNTRIES } from "../content";
import { CONTACT_METHODS, LIMITS, refFromSubmissionId, validateEnquiry } from "../validation";
import { readCampaign, track } from "../../lib/analytics";
import Button from "./ui/Button";
import RecommendedBadge from "./ui/RecommendedBadge";
import LeadResult, { ResultPhase } from "./LeadResult";

// Timings agreed in the proposal (section 8.3). The browser always waits longer than the
// server's 25-second send deadline, so it never decides while the server is still working.
const REQUEST_TIMEOUT_MS = 35_000;
const SLOW_NOTICE_MS = 8_000;
const CHECK_FIRST_DELAY_MS = 2_000;
const CHECK_INTERVAL_MS = 3_000;
const CHECK_TIMEOUT_MS = 5_000;
const CHECK_WINDOW_MAX_MS = 30_000;
const CHECK_WINDOW_MARGIN_MS = 5_000;

type Phase = "editing" | "sending" | "checking" | ResultPhase;

interface Values {
  name: string;
  business_name: string;
  contact_method: string;
  phone_country: string;
  phone_number: string;
  email: string;
  message: string;
  marketing_opt_in: boolean;
  website: string;
}

const EMPTY: Values = {
  name: "",
  business_name: "",
  contact_method: "",
  phone_country: "971",
  phone_number: "",
  email: "",
  message: "",
  marketing_opt_in: false,
  website: "",
};

/** Field order for focusing the first problem or the first empty field */
const FIELD_ORDER: LeadField[] = [
  "package_id",
  "addon_ids",
  "name",
  "business_name",
  "contact_method",
  "phone_number",
  "email",
  "message",
];

/** generate_lead fires once per enquiry reference */
const trackedLeads = new Set<string>();

function newSubmissionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Not available outside secure contexts; fall back below
    }
  }
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

type FetchResult = { httpStatus: number; data: Record<string, unknown> | null } | { failed: "network" | "timeout" | "aborted" };

const inputClass = (invalid: boolean) =>
  `mt-2 block h-12 rounded-lg border bg-night px-4 text-base text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-lilac disabled:opacity-60 ${
    invalid ? "border-error" : "border-white/15"
  }`;

const optionClass =
  "flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-night p-3.5 transition-colors has-[:checked]:border-violet has-[:checked]:bg-violet/10";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex gap-2 text-sm text-error">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function Requirement({ required }: { required: boolean }) {
  return <span className="font-normal text-muted"> ({required ? "required" : "optional"})</span>;
}

interface LeadFormProps {
  packageId: PackageId;
  onPackageChange: (id: PackageId) => void;
  addOns: AddOnId[];
  onAddOnsChange: (ids: AddOnId[]) => void;
  /** Increments when a call to action asks for focus on the form */
  focusRequest: number;
}

export default function LeadForm({ packageId, onPackageChange, addOns, onAddOnsChange, focusRequest }: LeadFormProps) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [summary, setSummary] = useState("");
  const [phase, setPhase] = useState<Phase>("editing");
  const [slow, setSlow] = useState(false);
  const [started, setStarted] = useState(false);

  const session = useRef<{ id: string; ref: string } | null>(null);
  const startedAt = useRef(Date.now());
  const campaign = useRef(readCampaign(typeof window === "undefined" ? "" : window.location.search));
  const runId = useRef(0);
  const alive = useRef(true);
  const controllers = useRef(new Set<AbortController>());
  const timers = useRef(new Set<number>());
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // Stop quietly when the visitor leaves: abort requests and clear timers
  useEffect(() => {
    alive.current = true;
    const stop = () => {
      alive.current = false;
      controllers.current.forEach((controller) => controller.abort());
      controllers.current.clear();
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    };
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      stop();
    };
  }, []);

  const isResult = phase === "sent" || phase === "not_sent" || phase === "uncertain" || phase === "rate_limited";
  const busy = phase === "sending" || phase === "checking";

  useEffect(() => {
    if (isResult) resultRef.current?.focus();
  }, [phase, isResult]);

  const input = (): Record<string, unknown> => ({
    package_id: packageId,
    addon_ids: addOns,
    ...values,
  });

  const validate = (): LeadErrors => {
    const result = validateEnquiry(input());
    return result.ok === false ? result.errors : {};
  };

  const focusField = (field: LeadField) => {
    const element = formRef.current?.querySelector<HTMLElement>(`[data-field="${field}"]`);
    element?.focus({ preventScroll: false });
  };

  const focusFirstEmpty = () => {
    const form: HTMLFormElement | null = formRef.current;
    const fields: HTMLElement[] = form ? Array.from(form.querySelectorAll<HTMLElement>("[data-field]")) : [];
    const empty = fields.find((el) => {
      if (el instanceof HTMLInputElement && el.type === "checkbox") return false; // optional add-ons
      if (el instanceof HTMLInputElement && el.type === "radio") {
        return !form?.querySelector(`[name="${el.name}"]:checked`);
      }
      if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        return !el.value;
      }
      return false;
    });
    (empty ?? form?.querySelector<HTMLElement>('button[type="submit"]'))?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!focusRequest) return;
    const timer = window.setTimeout(() => {
      if (isResult) resultRef.current?.focus({ preventScroll: true });
      else focusFirstEmpty();
    }, 350);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    track("form_start", { package_id: packageId });
  };

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    markStarted();
    setValues((current) => ({ ...current, [key]: value }));
  };

  /** Re-checks one field when the visitor leaves it, if it has a value or an error */
  const checkField = (field: LeadField) => {
    const all = validate();
    setErrors((current) => {
      const next = { ...current };
      if (all[field]) {
        const hasValue = field === "phone_number" ? values.phone_number : (values as Record<string, unknown>)[field];
        if (hasValue || current[field]) next[field] = all[field];
      } else delete next[field];
      return next;
    });
  };

  const chooseMethod = (method: string) => {
    update("contact_method", method);
    // Drop errors for fields that are no longer required; keep the typed values
    setErrors((current) => {
      const next = { ...current };
      delete next.contact_method;
      const nextValues = { ...values, contact_method: method };
      const result = validateEnquiry({ package_id: packageId, addon_ids: addOns, ...nextValues });
      const fresh = result.ok === false ? result.errors : {};
      for (const field of ["phone_number", "email"] as const) {
        if (!fresh[field]) delete next[field];
        else if (next[field]) next[field] = fresh[field];
      }
      return next;
    });
  };

  const showErrors = (all: LeadErrors) => {
    setErrors(all);
    const count = Object.keys(all).length;
    setSummary(count === 1 ? "Please check 1 field." : `Please check ${count} fields.`);
    const first = FIELD_ORDER.find((field) => all[field]);
    if (first) window.setTimeout(() => focusField(first), 0);
  };

  // --- Sending and waiting for a final result -------------------------------------------

  const later = (ms: number) =>
    new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => {
        timers.current.delete(timer);
        resolve();
      }, ms);
      timers.current.add(timer);
    });

  async function fetchJson(url: string, init: RequestInit, timeoutMs: number): Promise<FetchResult> {
    const controller = new AbortController();
    controllers.current.add(controller);
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);
    try {
      const response = await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
      let data: Record<string, unknown> | null = null;
      try {
        const parsed = await response.json();
        data = parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        data = null;
      }
      return { httpStatus: response.status, data };
    } catch {
      return { failed: timedOut ? "timeout" : alive.current ? "network" : "aborted" };
    } finally {
      window.clearTimeout(timer);
      controllers.current.delete(controller);
    }
  }

  const finish = (result: ResultPhase) => {
    setPhase(result);
    const ref = session.current?.ref;
    if (result === "sent" && ref && !trackedLeads.has(ref)) {
      trackedLeads.add(ref);
      track("generate_lead", {
        enquiry_ref: ref,
        package_id: packageId,
        addon_ids: addOns,
        contact_method: values.contact_method,
      });
    }
  };

  /** Read-only status checks until a definite answer, capped at 30 seconds */
  async function waitForResult(run: number, remainingMs?: number) {
    const id = session.current?.id;
    if (!id) return finish("uncertain");
    setPhase("checking");
    const windowMs =
      remainingMs === undefined ? CHECK_WINDOW_MAX_MS : Math.min(remainingMs + CHECK_WINDOW_MARGIN_MS, CHECK_WINDOW_MAX_MS);
    const deadline = Date.now() + windowMs;
    let failures = 0;

    await later(CHECK_FIRST_DELAY_MS);
    while (alive.current && run === runId.current) {
      const result = await fetchJson(`/api/lead/status/${id}`, { method: "GET" }, CHECK_TIMEOUT_MS);
      if (!alive.current || run !== runId.current) return;

      if ("failed" in result) {
        if (result.failed === "aborted") return;
        failures += 1;
      } else if (result.data === null) {
        failures += 1; // Unrecognised reply, such as a proxy error page
      } else if (result.httpStatus >= 400) {
        return finish("uncertain");
      } else {
        const status = result.data.status;
        if (status === "accepted") return finish("sent");
        if (status === "not_sent") return finish("not_sent");
        if (status === "uncertain" || status === "unknown") return finish("uncertain");
        if (status === "in_progress") failures = 0;
        else failures += 1;
      }

      if (failures >= 2) return finish("uncertain");
      if (Date.now() + CHECK_INTERVAL_MS > deadline) return finish("uncertain");
      await later(CHECK_INTERVAL_MS);
    }
  }

  async function send(resendAfterUncertain: boolean) {
    const current = session.current;
    if (!current) return;
    const run = ++runId.current;
    setPhase("sending");
    setSlow(false);
    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_NOTICE_MS);

    const payload: LeadPayload = {
      submission_id: current.id,
      resend_after_uncertain: resendAfterUncertain || undefined,
      package_id: packageId,
      addon_ids: addOns,
      name: values.name,
      business_name: values.business_name,
      contact_method: values.contact_method,
      phone_country: values.phone_country,
      phone_number: values.phone_number,
      email: values.email,
      message: values.message,
      marketing_opt_in: values.marketing_opt_in,
      consent_version: CONSENT.version,
      website: values.website,
      elapsed_ms: Date.now() - startedAt.current,
      page_url: `${window.location.origin}${window.location.pathname}`,
      campaign: campaign.current,
    };

    const result = await fetchJson(
      "/api/lead",
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
      REQUEST_TIMEOUT_MS,
    );
    window.clearTimeout(slowTimer);
    if (!alive.current || run !== runId.current) return;

    if ("failed" in result) {
      if (result.failed === "aborted") return;
      return waitForResult(run);
    }
    const status = result.data?.status;
    if (status === "accepted") return finish("sent");
    if (status === "not_sent") return finish("not_sent");
    if (status === "uncertain") return finish("uncertain");
    if (status === "rate_limited") return finish("rate_limited");
    if (status === "invalid") {
      const fieldErrors = (result.data?.errors ?? {}) as LeadErrors;
      if (!Object.keys(fieldErrors).length) return finish("not_sent");
      setPhase("editing");
      return showErrors(fieldErrors);
    }
    if (status === "in_progress") {
      const remaining = typeof result.data?.remaining_ms === "number" ? result.data.remaining_ms : undefined;
      return waitForResult(run, remaining);
    }
    // No recognised status (for example a proxy error page): check before deciding
    return waitForResult(run);
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    const all = validate();
    if (Object.keys(all).length) return showErrors(all);
    setErrors({});
    setSummary("");
    // One reference per enquiry: a retry after "Not sent" or an edit keeps it
    if (!session.current) {
      const id = newSubmissionId();
      session.current = { id, ref: refFromSubmissionId(id) };
    }
    void send(false);
  };

  const reset = () => {
    runId.current += 1;
    session.current = null;
    startedAt.current = Date.now();
    setValues(EMPTY);
    setErrors({});
    setSummary("");
    setStarted(false);
    setPhase("editing");
  };

  // --- Rendering ----------------------------------------------------------------------------

  if (isResult && session.current) {
    return (
      <LeadResult
        ref={resultRef}
        phase={phase as ResultPhase}
        reference={session.current.ref}
        name={values.name}
        packageId={packageId}
        addOns={addOns}
        contactMethod={values.contact_method}
        message={values.message}
        onTryAgain={() => void send(false)}
        onSendAgain={() => void send(true)}
        onEdit={() => setPhase("editing")}
        onReset={reset}
      />
    );
  }

  const describedBy = (field: LeadField, hint?: string) =>
    [errors[field] ? `lf-${field}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;
  const phoneRequired = values.contact_method === "whatsapp" || values.contact_method === "call";
  const emailRequired = values.contact_method === "email";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      aria-labelledby="lead-form-title"
      className="relative rounded-2xl border border-white/10 bg-card p-6 sm:p-8"
    >
      <h3 id="lead-form-title" className="text-2xl font-bold tracking-tight">
        Your enquiry
      </h3>

      <p role="alert" className="mt-3 text-sm font-semibold text-error empty:hidden">
        {summary}
      </p>

      <fieldset disabled={busy} className="mt-6 min-w-0 space-y-6">
        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold text-ink">
            Package
            <Requirement required />
          </legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {PACKAGES.map((pkg, index) => (
              <label key={pkg.id} className={optionClass}>
                <input
                  type="radio"
                  name="lf-package"
                  value={pkg.id}
                  checked={packageId === pkg.id}
                  onChange={() => {
                    markStarted();
                    onPackageChange(pkg.id);
                  }}
                  data-field={index === 0 ? "package_id" : undefined}
                  className="size-5 shrink-0 accent-violet"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                    {pkg.name}
                    {pkg.recommended && <RecommendedBadge small />}
                  </span>
                  <span className="block text-sm tabular-nums text-muted">AED {formatAed(pkg.priceAed)} / month</span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id="lf-package_id-error" message={errors.package_id} />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold text-ink">
            Add-ons
            <Requirement required={false} />
          </legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {ADD_ONS.map((addOn, index) => (
              <label key={addOn.id} className={optionClass}>
                <input
                  type="checkbox"
                  checked={addOns.includes(addOn.id)}
                  onChange={(event) => {
                    markStarted();
                    onAddOnsChange(event.target.checked ? [...addOns, addOn.id] : addOns.filter((id) => id !== addOn.id));
                  }}
                  data-field={index === 0 ? "addon_ids" : undefined}
                  className="size-5 shrink-0 accent-violet"
                />
                <span>
                  <span className="block font-semibold text-ink">{addOn.name}</span>
                  <span className="block text-sm text-muted">
                    {addOn.detail} · AED {formatAed(addOn.priceAed)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="lf-name"
            field="name"
            label="Name"
            required
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            error={errors.name}
            describedBy={describedBy("name")}
            onChange={(value) => update("name", value)}
            onBlur={() => checkField("name")}
          />
          <TextField
            id="lf-business_name"
            field="business_name"
            label="Business name"
            required
            autoComplete="organization"
            maxLength={LIMITS.businessName}
            value={values.business_name}
            error={errors.business_name}
            describedBy={describedBy("business_name")}
            onChange={(value) => update("business_name", value)}
            onBlur={() => checkField("business_name")}
          />
        </div>

        <fieldset className="min-w-0" aria-describedby={describedBy("contact_method", "lf-contact-note")}>
          <legend className="text-sm font-semibold text-ink">
            How would you like us to reply?
            <Requirement required />
          </legend>
          <p id="lf-contact-note" className="mt-1 text-sm text-muted">
            {CONSENT.contactNote}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
            {CONTACT_METHODS.map((method, index) => (
              <label
                key={method.id}
                className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-night px-2 text-center text-sm font-semibold text-ink transition-colors has-[:checked]:border-violet has-[:checked]:bg-violet/10 sm:text-[15px]"
              >
                <input
                  type="radio"
                  name="lf-contact"
                  value={method.id}
                  checked={values.contact_method === method.id}
                  onChange={() => chooseMethod(method.id)}
                  data-field={index === 0 ? "contact_method" : undefined}
                  aria-invalid={Boolean(errors.contact_method)}
                  className="size-4 shrink-0 accent-violet"
                />
                {method.label}
              </label>
            ))}
          </div>
          <FieldError id="lf-contact_method-error" message={errors.contact_method} />
        </fieldset>

        <div>
          <label htmlFor="lf-phone_number" className="block text-sm font-semibold text-ink">
            Phone / WhatsApp number
            <Requirement required={phoneRequired} />
          </label>
          <div className="flex gap-2">
            <select
              aria-label="Country code"
              autoComplete="tel-country-code"
              value={values.phone_country}
              onChange={(event) => update("phone_country", event.target.value)}
              onBlur={() => values.phone_number && checkField("phone_number")}
              className={`${inputClass(false)} w-36 shrink-0 px-3 sm:w-44`}
            >
              {PHONE_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
            <input
              id="lf-phone_number"
              data-field="phone_number"
              type="tel"
              inputMode="tel"
              autoComplete={values.phone_country === "other" ? "tel" : "tel-national"}
              placeholder={values.phone_country === "971" ? "50 123 4567" : values.phone_country === "other" ? "+code number" : ""}
              maxLength={24}
              value={values.phone_number}
              aria-invalid={Boolean(errors.phone_number)}
              aria-describedby={describedBy("phone_number")}
              onChange={(event) => update("phone_number", event.target.value)}
              onBlur={() => checkField("phone_number")}
              className={`${inputClass(Boolean(errors.phone_number))} min-w-0 flex-1`}
            />
          </div>
          <FieldError id="lf-phone_number-error" message={errors.phone_number} />
        </div>

        <TextField
          id="lf-email"
          field="email"
          label="Email"
          required={emailRequired}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          value={values.email}
          error={errors.email}
          describedBy={describedBy("email")}
          onChange={(value) => update("email", value)}
          onBlur={() => checkField("email")}
        />

        <div>
          <label htmlFor="lf-message" className="block text-sm font-semibold text-ink">
            Message
            <Requirement required={false} />
          </label>
          <textarea
            id="lf-message"
            data-field="message"
            rows={3}
            maxLength={LIMITS.message}
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", "lf-message-count")}
            onChange={(event) => update("message", event.target.value)}
            onBlur={() => checkField("message")}
            className={`${inputClass(Boolean(errors.message))} h-auto w-full py-3`}
          />
          <p id="lf-message-count" className="mt-1 text-right text-xs text-muted">
            {values.message.length.toLocaleString("en-US")} / {LIMITS.message.toLocaleString("en-US")} characters
          </p>
          <FieldError id="lf-message-error" message={errors.message} />
        </div>

        <label className="flex cursor-pointer gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={values.marketing_opt_in}
            onChange={(event) => update("marketing_opt_in", event.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-violet"
          />
          <span>
            {CONSENT.marketingOptIn}
            <Requirement required={false} />
          </span>
        </label>

        {/* Spam trap: hidden from people and assistive technology */}
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
          <label htmlFor="lf-website">Leave this field empty</label>
          <input
            id="lf-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
          />
        </div>

        <Button type="submit" fullWidth disabled={busy} aria-describedby="lf-status">
          {busy ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending your enquiry…
            </span>
          ) : (
            "Send my enquiry"
          )}
        </Button>

        <p className="text-sm text-muted">
          Read our{" "}
          <a href="/privacy-policy.html" target="_blank" rel="noopener" className="font-semibold text-lilac underline underline-offset-4">
            Privacy Policy (opens in a new tab)
          </a>
          .
        </p>
      </fieldset>

      <div id="lf-status" role="status" aria-live="polite" className="mt-4 text-sm text-ink empty:hidden">
        {phase === "checking"
          ? "Checking whether your enquiry was received…"
          : phase === "sending" && slow
            ? "This is taking a little longer than usual. Please keep this page open."
            : ""}
      </div>
    </form>
  );
}

interface TextFieldProps {
  id: string;
  field: LeadField;
  label: string;
  required: boolean;
  value: string;
  error?: string;
  describedBy?: string;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function TextField({
  id,
  field,
  label,
  required,
  value,
  error,
  describedBy,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
  onChange,
  onBlur,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        <Requirement required={required} />
      </label>
      <input
        id={id}
        data-field={field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`${inputClass(Boolean(error))} w-full`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

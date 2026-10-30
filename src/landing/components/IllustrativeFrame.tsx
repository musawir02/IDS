import { ReactNode } from "react";
import { Play } from "lucide-react";

// Labelled mockups for the landing page. Rules (proposal section 4):
// a visible label inside every frame, no numbers, no client-like names ("Your Business" and
// example.com only), no rankings or AI citations, and alt text that repeats the label.

const SAMPLE_LABEL = "SAMPLE VISUAL";
const ILLUSTRATIVE_LABEL = "ILLUSTRATIVE EXAMPLE · NOT CLIENT DATA";

interface FrameProps {
  kind: "sample" | "illustrative";
  /** What the mockup shows, read out instead of its contents */
  description: string;
  format?: string;
  className?: string;
  children: ReactNode;
}

export default function IllustrativeFrame({ kind, description, format, className = "", children }: FrameProps) {
  const label = kind === "sample" ? SAMPLE_LABEL : ILLUSTRATIVE_LABEL;
  const altText =
    kind === "sample"
      ? `Sample visual: ${description}`
      : `Illustrative example of ${description}, not real client data`;
  const labelClasses =
    "z-10 max-w-[calc(100%-1.25rem)] rounded-md bg-night/90 px-2 py-1 font-mono text-[12px] font-semibold leading-snug tracking-wide text-ink ring-1 ring-lilac/30";
  // Sample visuals are abstract, so their label sits on top. Illustrative layouts keep the label
  // in the flow, so when it wraps onto two lines in a narrow frame it pushes the layout down.
  return (
    <figure
      role="img"
      aria-label={altText}
      className={`relative overflow-hidden rounded-2xl border border-lilac/20 bg-card shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      {kind === "illustrative" && (
        <span aria-hidden="true" className={`relative mx-2.5 mt-2.5 block w-fit ${labelClasses}`}>
          {label}
        </span>
      )}
      <div aria-hidden="true" className={kind === "sample" ? "h-full" : undefined}>
        {children}
      </div>
      {kind === "sample" && (
        <span aria-hidden="true" className={`absolute left-2.5 top-2.5 ${labelClasses}`}>
          {label}
        </span>
      )}
      {format && (
        <span
          aria-hidden="true"
          className="absolute bottom-2.5 right-2.5 z-10 rounded-md bg-night/90 px-2 py-1 font-mono text-[12px] font-medium text-lilac ring-1 ring-lilac/20"
        >
          {format}
        </span>
      )}
    </figure>
  );
}

function Bar({ width, tone = "ink" }: { width: string; tone?: "ink" | "lilac" | "dark" }) {
  const colour = tone === "lilac" ? "bg-lilac/35" : tone === "dark" ? "bg-night/25" : "bg-ink/15";
  return <span className={`block h-2 rounded-full ${colour}`} style={{ width }} />;
}

/** 4:5 graphic post: an abstract layout with placeholder text, no real content */
export function PostVisual({ className = "" }: { className?: string }) {
  return (
    <IllustrativeFrame kind="sample" format="GRAPHIC POST · 4:5" description="a graphic post layout" className={className}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(150deg,#2a1a45_0%,#1a1129_55%,#0f0a18_100%)]">
        <div className="absolute -right-10 top-10 size-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,#c4a1ff,#7e22ce_60%,transparent_70%)] opacity-80" />
        <div className="absolute bottom-24 left-6 h-24 w-20 rotate-[-8deg] rounded-2xl bg-[linear-gradient(160deg,#efe3ff,#a855f7)] opacity-90 shadow-2xl" />
        <div className="absolute inset-x-6 bottom-12 space-y-2">
          <Bar width="70%" tone="lilac" />
          <Bar width="45%" />
        </div>
      </div>
    </IllustrativeFrame>
  );
}

/** 9:16 reel: play button, progress bar and placeholder caption */
export function ReelVisual({ className = "", edited = false }: { className?: string; edited?: boolean }) {
  return (
    <IllustrativeFrame
      kind="sample"
      format={edited ? "EDITED REEL · 9:16" : "REEL · 9:16"}
      description={edited ? "an edited reel layout" : "a reel layout"}
      className={className}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-[linear-gradient(180deg,#1d1330_0%,#3b1d66_50%,#120c1d_100%)]">
        <div className="absolute left-1/2 top-1/3 size-44 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#a855f7_0%,transparent_65%)] opacity-60" />
        <div className="absolute left-1/2 top-[42%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
          <Play className="ml-0.5 size-6 fill-white text-white" />
        </div>
        <div className="absolute inset-x-4 bottom-14 space-y-2">
          <Bar width="80%" />
          <Bar width="55%" />
        </div>
        <div className="absolute inset-x-4 bottom-9 h-1 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-2/5 rounded-full bg-lilac/70" />
        </div>
      </div>
    </IllustrativeFrame>
  );
}

/** Unbranded social ad card */
export function AdCardVisual({ className = "" }: { className?: string }) {
  return (
    <IllustrativeFrame kind="illustrative" description="a social media ad layout" className={className}>
      <div className="p-4 pt-3">
        <div className="flex items-center gap-3">
          <span className="size-9 rounded-full bg-[linear-gradient(135deg,#c4a1ff,#7e22ce)]" />
          <div>
            <p className="text-sm font-semibold text-ink">Your Business</p>
            <p className="text-xs text-muted">Sponsored</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <Bar width="90%" />
          <Bar width="65%" />
        </div>
        <div className="mt-4 aspect-[1.91/1] rounded-xl bg-[linear-gradient(135deg,#2a1a45,#4c1d95_60%,#1a1129)]" />
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-night/60 p-3">
          <div className="flex-1 space-y-2">
            <Bar width="70%" />
            <Bar width="40%" />
          </div>
          <span className="rounded-lg bg-ink/10 px-3 py-2 text-xs font-semibold text-ink">Send message</span>
        </div>
      </div>
    </IllustrativeFrame>
  );
}

/** Generic "Sponsored" search ad: the format only, with no position, clicks or costs */
export function SearchAdVisual({ className = "" }: { className?: string }) {
  return (
    <IllustrativeFrame kind="illustrative" description="a search ad layout" className={className}>
      <div className="p-4 pt-3">
        <div className="rounded-xl bg-night/60 p-4">
          <p className="text-xs font-bold text-ink">Sponsored</p>
          <p className="mt-1 text-xs text-muted">example.com</p>
          <p className="mt-2 text-base font-semibold text-lilac">Your Business</p>
          <div className="mt-3 space-y-2">
            <Bar width="95%" />
            <Bar width="75%" />
          </div>
        </div>
      </div>
    </IllustrativeFrame>
  );
}

/** What search and AI visibility work involves: complete, consistent business information */
export function BusinessInfoVisual({ className = "" }: { className?: string }) {
  const rows = ["Category", "Opening hours", "Location", "Phone", "Website"];
  return (
    <IllustrativeFrame kind="illustrative" description="a business information card" className={className}>
      <div className="p-5 pt-3">
        <p className="text-lg font-bold text-ink">Your Business</p>
        <dl className="mt-4 divide-y divide-lilac/10">
          {rows.map((row, index) => (
            <div key={row} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-sm text-muted">{row}</dt>
              <dd className="flex-1">
                <span className="ml-auto block h-2 rounded-full bg-ink/15" style={{ width: `${55 + (index % 3) * 12}%` }} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-lilac">FAQ</p>
        <div className="mt-3 space-y-3">
          {["q1", "q2"].map((key) => (
            <div key={key} className="rounded-lg bg-night/60 p-3">
              <Bar width="60%" tone="lilac" />
              <div className="mt-2">
                <Bar width="85%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </IllustrativeFrame>
  );
}

/** Report layout with blank value boxes and uniform placeholder bars, never figures */
export function ReportVisual({ className = "" }: { className?: string }) {
  const metrics = ["Reach", "Engagement", "Website visits", "Enquiries"];
  return (
    <IllustrativeFrame kind="illustrative" description="a monthly performance report layout" className={className}>
      <div className="p-5 pt-3">
        <p className="text-lg font-bold text-ink">Monthly performance report</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div key={metric} className="rounded-xl bg-night/60 p-3">
              <p className="text-xs text-muted">{metric}</p>
              <p className="mt-2 rounded-md border border-dashed border-lilac/25 py-1.5 text-center text-sm text-muted">—</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-24 items-end gap-2 rounded-xl bg-night/60 p-3">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="h-1/2 flex-1 rounded-t-md bg-lilac/25" />
          ))}
        </div>
      </div>
    </IllustrativeFrame>
  );
}

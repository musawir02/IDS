import { Phone } from "lucide-react";

function scrollToLetsTalk() {
  // If already on home page, scroll directly to contact section
  const contactEl = document.getElementById("contact");
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  // Otherwise navigate home first, then scroll
  window.location.hash = "#lets-talk";
}

export default function LetsTalkWidget() {
  return (
    <div className="fixed bottom-24 right-6 z-50 font-sans flex items-center gap-3 group/wrap">
      {/* Hover label */}
      <span className="opacity-0 group-hover/wrap:opacity-100 transition-all duration-200 translate-x-2 group-hover/wrap:translate-x-0 bg-slate-900/90 border border-white/10 text-white text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-xl whitespace-nowrap shadow-lg pointer-events-none">
        Let's Talk
      </span>

      {/* Circular button — mirrors ChatbotWidget */}
      <button
        id="btn-lets-talk"
        type="button"
        onClick={scrollToLetsTalk}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-ids-magenta to-ids-purple inline-flex items-center justify-center text-white shadow-[0_5px_25px_rgba(192,38,211,0.45)] hover:shadow-[0_5px_30px_rgba(192,38,211,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title="Let's Talk"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover/wrap:opacity-10 transition-opacity" />
        <Phone className="w-6 h-6" />

        {/* Pulsing ring indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ids-magenta opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-ids-magenta" />
        </span>
      </button>
    </div>
  );
}

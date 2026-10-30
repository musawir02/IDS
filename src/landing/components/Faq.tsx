import { ChevronDown } from "lucide-react";
import { FAQ } from "../content";
import { track } from "../../lib/analytics";
import { generalMessage } from "../../lib/whatsapp";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-plum py-16 lg:py-24">
      <div className="container-lp max-w-3xl">
        <h2 id="faq-title" data-reveal className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <div data-reveal className="mt-8 border-t border-lilac/15">
          {FAQ.map((item, index) => (
            <details
              key={item.question}
              className="group border-b border-lilac/15"
              onToggle={(event) => {
                if ((event.currentTarget as HTMLDetailsElement).open) track("faq_open", { question: index + 1 });
              }}
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink sm:text-lg">
                {item.question}
                <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-lilac transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-3 pb-5 text-base leading-relaxed text-muted">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-base text-ink">Still deciding?</p>
          <WhatsAppButton message={generalMessage()} label="WhatsApp us" location="faq" />
        </div>
      </div>
    </section>
  );
}

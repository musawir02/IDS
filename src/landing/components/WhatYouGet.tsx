import { AI_QUALIFIER, SEO_QUALIFIER, WHAT_YOU_GET } from "../content";
import {
  AdCardVisual,
  BusinessInfoVisual,
  PostVisual,
  ReelVisual,
  ReportVisual,
  SearchAdVisual,
} from "./IllustrativeFrame";

function Visual({ id }: { id: (typeof WHAT_YOU_GET)[number]["id"] }) {
  if (id === "content") {
    return (
      <div className="mx-auto grid max-w-md grid-cols-[1fr_0.8fr] items-end gap-4">
        <PostVisual />
        <ReelVisual />
      </div>
    );
  }
  if (id === "ads") {
    return (
      <div className="mx-auto grid max-w-lg gap-4 sm:grid-cols-2 sm:items-end">
        <AdCardVisual />
        <SearchAdVisual />
      </div>
    );
  }
  if (id === "search") return <BusinessInfoVisual className="mx-auto max-w-md" />;
  return <ReportVisual className="mx-auto max-w-md" />;
}

export default function WhatYouGet() {
  return (
    <section id="what-you-get" aria-labelledby="what-you-get-title" className="py-16 lg:py-24">
      <div className="container-lp">
        <h2 id="what-you-get-title" data-reveal className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          What you get each month
        </h2>
        <div className="mt-12 space-y-16 lg:space-y-24">
          {WHAT_YOU_GET.map((row, index) => (
            <div key={row.id} data-reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <h3 className="text-2xl font-extrabold tracking-tight">{row.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{row.body}</p>
                {row.id === "search" && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {AI_QUALIFIER} {SEO_QUALIFIER}
                  </p>
                )}
                <p className="mt-4 text-sm">
                  <span className="font-semibold text-lilac">Included in: </span>
                  <span className="text-ink">{row.includedIn}</span>
                </p>
              </div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <Visual id={row.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

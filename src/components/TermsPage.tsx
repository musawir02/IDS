import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";

const sections = [
  {
    title: "About these terms",
    paragraphs: [
      'These Terms & Conditions govern your use of the Impulse Digital Solutions ("IDS", "we", "us", or "our") website. By using this website, you agree to these terms. If you do not agree, please discontinue use of the website.',
      "This website introduces our digital marketing, web and app development, cybersecurity, AI and search optimization, creator, and international growth services. A website visit, enquiry, or strategy call does not by itself create a client relationship or a commitment to provide services.",
    ],
  },
  {
    title: "Using our website",
    paragraphs: [
      "You may use this website for lawful purposes and to learn about or enquire about our services. You must not misuse contact forms, impersonate another person, submit malicious code, attempt unauthorized access, or interfere with the website or its security.",
      "When contacting us, provide accurate information and only share material you are authorized to disclose. Please do not send passwords, payment card details, or other sensitive credentials through website forms or chat.",
    ],
  },
  {
    title: "Service agreements & project scope",
    paragraphs: [
      "Any paid engagement is subject to a separate written proposal, statement of work, or service agreement identifying the contracting entity, deliverables, responsibilities, schedule, and commercial terms. That agreement controls the services if it conflicts with these website terms.",
      "Changes to scope, additional revisions, ongoing support, and third-party costs must be addressed in the applicable agreement. Delivery schedules may depend on timely client feedback, approvals, access, and materials.",
    ],
  },
  {
    title: "Pricing, payments & cancellations",
    paragraphs: [
      "Website prices and service packages are indicative unless expressly confirmed in a written agreement. Your proposal or service agreement will set out the applicable currency, taxes, payment schedule, expenses, and any recurring charges.",
      "Cancellation, renewal, termination, and refund arrangements are governed by that agreement and any applicable mandatory rights. These website terms do not establish a separate cancellation fee or no-refund policy.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The website's original text, designs, graphics, branding, and other content belong to IDS or its licensors. You may view this content for personal use or internal business evaluation. Copying, distributing, modifying, or commercially exploiting it requires permission unless otherwise permitted by law.",
      "Third-party names, logos, and trademarks remain the property of their respective owners. Ownership and licensing of client materials, project deliverables, source files, and third-party assets are determined by the relevant service agreement.",
    ],
  },
  {
    title: "Results & website information",
    paragraphs: [
      "We aim to keep website information accurate and current, but content may contain errors or become outdated. We may update service descriptions, availability, and pricing as our offerings change.",
      "Case studies, testimonials, forecasts, and marketing statements are illustrative and do not promise a particular outcome. Rankings, revenue, audience growth, platform approvals, and security outcomes depend on factors beyond our control. Any specific performance commitment must be set out in your written service agreement.",
    ],
  },
  {
    title: "Third-party services & links",
    paragraphs: [
      "This website may link to third-party websites or tools, including scheduling and social media platforms. Those providers operate under their own terms and privacy practices. We do not control their content, availability, or services.",
      "Use of third-party software, hosting, advertising platforms, and other tools during a project may require separate licenses or subscriptions, as described in the relevant agreement.",
    ],
  },
  {
    title: "Availability & responsibility",
    paragraphs: [
      "The website is provided on an as-available basis. We do not promise uninterrupted access or that every page will be free of errors. We may maintain, modify, or suspend the website when necessary.",
      "To the extent permitted by applicable law, IDS is not responsible for indirect or consequential losses arising from use of this website or reliance on its general information. Nothing in these terms excludes liability or limits rights that cannot lawfully be excluded or limited. Responsibility for paid services is addressed in the applicable service agreement.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "We may revise these terms as the website or our business changes. The date shown on this page identifies the latest revision. Please review the current terms when using the website. Changes to a signed service agreement follow the process specified in that agreement.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative bg-ids-black py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 text-sm">
          <a href="#" className="inline-flex items-center gap-2 text-slate-300 hover:text-ids-magenta transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ids-magenta">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </a>
          <p className="font-mono text-xs text-slate-400">Last updated: <time dateTime="2026-10-03">October 3, 2026</time></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-16 items-start">
          <aside className="rounded-2xl border border-ids-purple/25 bg-gradient-to-br from-ids-purple/10 to-white/[0.02] p-6 lg:sticky lg:top-28">
            <FileText className="w-6 h-6 text-ids-magenta mb-4" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-white">Clear expectations.</h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">These terms cover our website. Your written service agreement defines the details of your project.</p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-3">Questions about the terms?</p>
              <a href="mailto:grow@impulsedigitalsolutions.us" className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-400 hover:text-white transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ids-magenta">
                Contact IDS <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <article aria-label="Terms and conditions" className="min-w-0 divide-y divide-white/10">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`terms-section-${index + 1}`} className="py-8 first:pt-0">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono text-xs text-fuchsia-400 shrink-0" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h2 id={`terms-section-${index + 1}`} className="font-display text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <div className="space-y-4 sm:pl-8">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="font-sans text-base leading-7 text-slate-300">{paragraph}</p>)}
                </div>
              </section>
            ))}
            <section aria-labelledby="terms-contact" className="py-8">
              <h2 id="terms-contact" className="font-display text-xl sm:text-2xl font-bold text-white mb-4">Contact us</h2>
              <p className="text-base leading-7 text-slate-300">For questions about these terms or an existing agreement, email <a href="mailto:grow@impulsedigitalsolutions.us" className="text-fuchsia-400 underline underline-offset-4 hover:text-white break-words">grow@impulsedigitalsolutions.us</a> or call <a href="tel:+16575409315" className="text-fuchsia-400 underline underline-offset-4 hover:text-white">+1 (657) 540 9315</a>.</p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}

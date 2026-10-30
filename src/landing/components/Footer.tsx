import Logo from "../../components/Logo";
import { BUSINESS, CONTACT } from "../content";

export default function Footer() {
  return (
    <footer className="border-t border-lilac/15 pb-28 pt-12 md:pb-12">
      <div className="container-lp flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2 text-sm text-muted">
          <Logo height={56} />
          <p className="pt-3">{BUSINESS.legalEntity}</p>
          <p>{CONTACT.businessAddress}</p>
          <p>{BUSINESS.vatDetails}</p>
        </div>
        <nav aria-label="Legal and site links">
          <ul className="flex flex-col gap-1 text-sm">
            {[
              { href: "/privacy-policy.html", label: "Privacy Policy" },
              { href: "/#terms-and-conditions", label: "Terms & Conditions" },
              { href: "/", label: "Main website" },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center text-ink underline-offset-4 hover:text-lilac hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container-lp mt-8 text-xs text-muted">
        © {new Date().getFullYear()} {BUSINESS.legalEntity}
      </p>
    </footer>
  );
}

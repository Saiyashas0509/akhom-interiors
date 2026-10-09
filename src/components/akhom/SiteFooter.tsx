import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    h: "Services",
    items: [
      { label: "Residential Interiors", to: "/residential" },
      { label: "Corporate & Commercial", to: "/corporate" },
      { label: "Healthcare & Hospital", to: "/services" },
      { label: "Hospitality Interiors", to: "/services" },
      { label: "Turnkey Execution", to: "/services" },
      { label: "Custom Joinery & Craft", to: "/services" },
      { label: "Renovation & Remodelling", to: "/services" },
      { label: "Add-on Services", to: "/services" },
      { label: "Selected Work", to: "/projects" },
    ],
  },
  {
    h: "Studio",
    items: [
      { label: "Our Approach", to: "/about" },
      { label: "Selected Work", to: "/projects" },
      { label: "Seven Stages Process", to: "/process" },
      { label: "Contact & Consultation", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-dark px-6 pb-12 pt-16 text-ivory md:px-10 md:pt-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" size="md" />
            <p className="mt-6 max-w-[42ch] text-[13px] font-light leading-relaxed text-ivory/70">
              Timeless designs. Thoughtful spaces. Residential, commercial, healthcare and hospitality interiors,
              designed and built with in-house craft in Hyderabad.
            </p>
            <div className="mt-8 flex items-center gap-5 text-[12px] uppercase tracking-[0.2em] text-ivory/50">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-burgundy-light"
              >
                Instagram
              </a>
              <span className="text-ivory/20">•</span>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-burgundy-light"
              >
                LinkedIn
              </a>
              <span className="text-ivory/20">•</span>
              <a
                href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-burgundy-light"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy-light">{c.h}</p>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i.label}>
                    <Link to={i.to} className="text-[13px] font-light text-ivory/70 transition-colors hover:text-ivory">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy-light">Contact</p>
            <ul className="mt-5 space-y-3 text-[13px] font-light text-ivory/70">
              <li>Hyderabad, Telangana</li>
              <li>
                <a href="mailto:info@akhominteriors.com" className="transition-colors hover:text-ivory">
                  info@akhominteriors.com
                </a>
              </li>
              <li>
                <a href="tel:+919177361122" className="transition-colors hover:text-ivory">
                  +91 91773 61122
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-burgundy-light transition-colors hover:text-ivory"
                >
                  <span>WhatsApp Enquiries: +91 97043 52346</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-[12px] uppercase tracking-[0.2em] text-ivory/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AKHOM INTERIORS. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ivory transition-colors">Terms of Service</Link>
          </div>
          <p>Design — Detail — Custom Craft — Execution</p>
        </div>
      </div>
    </footer>
  );
}

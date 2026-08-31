import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    h: "Services",
    items: [
      { label: "Residential Interiors", to: "/residential" },
      { label: "Corporate & Commercial", to: "/corporate" },
      { label: "Design Services", to: "/services" },
      { label: "Turnkey Execution", to: "/process" },
      { label: "Custom Furniture", to: "/services" },
      { label: "Selected Work", to: "/projects" },
    ],
  },
  {
    h: "Studio",
    items: [
      { label: "Our Approach", to: "/about" },
      { label: "Selected Work", to: "/projects" },
      { label: "Process", to: "/process" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-ink px-6 pb-10 pt-16 text-ivory md:px-10 md:pt-24 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" size="md" />
            <p className="mt-6 max-w-[40ch] text-sm font-light leading-relaxed text-ivory/55">
              Timeless designs. Thoughtful spaces. Residential and corporate interiors,
              designed and built in Hyderabad.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">{c.h}</p>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i.label}>
                    <Link to={i.to} className="text-sm font-light text-ivory/60 transition-colors hover:text-ivory">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">Contact</p>
            <ul className="mt-5 space-y-3 text-sm font-light text-ivory/60">
              <li>Road No. 12, Banjara Hills</li>
              <li>Hyderabad, Telangana 500034</li>
              <li>
                <a href="mailto:hello@akhom.in" className="transition-colors hover:text-ivory">hello@akhom.in</a>
              </li>
              <li>
                <a href="tel:+919000000000" className="transition-colors hover:text-ivory">+91 90000 00000</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-ivory/35 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Akhom Interiors</p>
          <p>Design — Detail — Custom Craft — Execution</p>
        </div>
      </div>
    </footer>
  );
}

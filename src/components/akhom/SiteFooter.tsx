import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { PHONE_TEL, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";

const COLS = [
  {
    h: "Services",
    items: [
      { label: "Residential Interiors", to: "/services", hash: "residential" },
      { label: "Commercial & Office", to: "/services", hash: "commercial" },
      { label: "Modular Kitchens", to: "/services", hash: "modular-kitchen" },
      { label: "Wardrobes & Storage", to: "/services", hash: "wardrobes" },
      { label: "Painting", to: "/services", hash: "painting" },
      { label: "Civil Work", to: "/services", hash: "civil-work" },
      { label: "Electrical", to: "/services", hash: "electrical" },
      { label: "Bathroom", to: "/services", hash: "bathroom" },
    ],
  },
  {
    h: "Studio",
    items: [
      { label: "About Us", to: "/about" },
      { label: "Projects", to: "/projects" },
      { label: "How We Work", to: "/", hash: "process" },
      { label: "Free Estimate", to: "/price-calculator" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
] as const;

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "WhatsApp", href: whatsappLink() },
] as const;

export function SiteFooter() {
  return (
    <footer className="glass-stage px-3 pb-6 pt-10 md:px-6">
      <div className="glass mx-auto max-w-[1600px] rounded-[36px] px-6 pb-8 pt-12 md:px-12 md:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="dark" size="md" />
            <p className="mt-6 max-w-[40ch] text-[14px] font-light leading-relaxed text-ink">
              Timeless designs. Thoughtful spaces. Homes, workplaces and site services — designed and
              built with in-house craft in Hyderabad.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-ink/12 bg-white/60 px-4 py-2 text-[13px] text-ink transition-colors duration-500 hover:bg-white hover:text-ink"
                >
                  {x.label}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <p className="eyebrow text-ink">{c.h}</p>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i.label}>
                    <Link
                      to={i.to}
                      {...("hash" in i ? { hash: i.hash } : {})}
                      className="text-[14px] font-light text-ink transition-colors duration-300 hover:text-ink"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4">
            <p className="eyebrow text-ink">Contact</p>
            <ul className="mt-5 space-y-3 text-[14px] font-light text-ink">
              <li>Hyderabad, Telangana</li>
              <li>
                <a href="mailto:info@akhominteriors.com" className="transition-colors hover:text-ink">
                  info@akhominteriors.com
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-ink">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-ink px-6 py-3 text-[14px] text-ivory transition-colors duration-500 hover:bg-burgundy"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-[13px] text-ink md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AKHOM Interiors. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition-colors hover:text-ink">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-ink">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import {
  IconHome,
  IconBuilding,
  IconHealthcare,
  IconHospitality,
  IconCompass,
  IconClipboard,
  IconSofa,
  IconBrush,
} from "./icons";
import { Reveal, RevealRule } from "./ui";

const SERVICES = [
  {
    n: "01",
    icon: IconHome,
    badge: "[PRIMARY]",
    t: "Residential Interiors",
    d: "Luxury villas, apartments, independent homes and farmhouses — kitchens, wardrobes, living spaces, home offices, and mandir craft.",
    tags: ["Luxury Villas", "Apartments", "Farmhouses", "Kitchens & Wardrobes"],
  },
  {
    n: "02",
    icon: IconBuilding,
    badge: "[COMMERCIAL]",
    t: "Corporate & Commercial",
    d: "Offices and GCC fit-outs, retail flagship showrooms, experience centres and clubhouses — from high-density workstations to executive boardrooms.",
    tags: ["Corporate & GCC", "Retail Stores", "Experience Centres", "Clubhouses"],
  },
  {
    n: "03",
    icon: IconHealthcare,
    badge: "[HEALTHCARE • NEW]",
    t: "Healthcare & Hospital Interiors",
    d: "Clinics, specialty hospitals, diagnostic centres, premium patient rooms, reception lobbies, and hygienic consultation suites built to strict healthcare standards.",
    tags: ["Hospitals & Clinics", "Diagnostic Centres", "Patient Suites", "Clinical Receptions"],
  },
  {
    n: "04",
    icon: IconHospitality,
    badge: "[HOSPITALITY • NEW]",
    t: "Hospitality Interiors",
    d: "Boutique hotels, luxury resorts, fine dining restaurants, cafés, banquet halls, and reception lobbies designed for memorable guest experiences.",
    tags: ["Hotels & Resorts", "Restaurants & Cafés", "Lobbies & Lounges", "Guest Rooms"],
  },
  {
    n: "05",
    icon: IconCompass,
    badge: "[CORE CAPABILITY]",
    t: "Design Services",
    d: "Interior architecture, spatial planning, 3D photorealistic visualisation, bespoke material specifications, and Vastu-aligned layouts.",
    tags: ["Interior Architecture", "3D Visualisation", "Lighting Design", "Vastu-Aligned"],
  },
  {
    n: "06",
    icon: IconClipboard,
    badge: "[DIFFERENTIATOR]",
    t: "Turnkey Execution",
    d: "Complete civil works, MEP engineering, procurement, dedicated site supervision, and milestone-based project management through to keys handover.",
    tags: ["Civil Works", "MEP Engineering", "Site Supervision", "Fixed Timelines"],
  },
  {
    n: "07",
    icon: IconSofa,
    badge: "[DIFFERENTIATOR]",
    t: "Custom Furniture & Joinery",
    d: "Bespoke furniture, architectural joinery, wall panelling, brass inlays, and handcrafted wooden puja mandirs made in our own Hyderabad workshop.",
    tags: ["Bespoke Furniture", "Architectural Joinery", "Puja Mandir Craft", "Wall Panelling"],
  },
  {
    n: "08",
    icon: IconBrush,
    badge: "[GROWTH]",
    t: "Renovation & Remodelling",
    d: "Full-property interior overhauls, structural layout reconfiguration, luxury kitchen and bath remodelling, and modern finish upgrades without relocation hassle.",
    tags: ["Full-Home Overhaul", "Kitchen Remodelling", "Bath Upgrades", "Spatial Reconfiguration"],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-ivory px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-ink/12 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-index text-burgundy">SERVICES / 08</span>
              <h2
                className="display mt-5 max-w-[18ch] text-ink"
                style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Everything a finished space needs, in one contract.
              </h2>
            </div>
            <p className="max-w-[36ch] text-[14px] font-light leading-relaxed text-ink/60 md:text-right">
              Eight capabilities, one team and a single contract — drawn, crafted and executed under
              one roof in Hyderabad.
            </p>
          </div>
        </Reveal>

        {/* Hairline matrix: a single ivory surface scored by rules, not a row of boxes. */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-ink/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="group relative flex flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-stone/50 md:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-5xl font-light leading-none text-ink/15 transition-colors duration-500 group-hover:text-burgundy/40">
                  {s.n}
                </span>
                <s.icon
                  className="h-5 w-5 text-burgundy opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  strokeWidth={1.4}
                />
              </div>
              <span className="mt-7 text-[12px] font-medium uppercase tracking-[0.18em] text-burgundy">
                {s.badge}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-light leading-snug text-ink">{s.t}</h3>
              <p className="mt-4 flex-1 text-[13px] font-light leading-relaxed text-ink/70">{s.d}</p>
              <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-ink/10 pt-5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] uppercase tracking-[0.14em] text-ink/55 transition-colors duration-300 group-hover:text-ink/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <RevealRule className="text-ink/15" />
            <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-ink/50">
              Pricing and timelines are agreed per project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

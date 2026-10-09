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
import { Reveal } from "./ui";

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
          <p className="eyebrow text-burgundy">Eight Service Pillars</p>
          <h2
            className="display mt-6 max-w-[18ch] text-ink"
            style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
          >
            Everything a finished space needs, in one contract.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px bg-ink/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(((i % 4) + 1) as 1 | 2 | 3) || 1} className="bg-ivory">
              <div className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-stone/50 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy/10 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-ivory">
                    <s.icon className="h-5 w-5" strokeWidth={1.4} />
                  </div>
                  <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy">{s.n}</span>
                </div>
                <div className="mt-4">
                  <span className="inline-block text-[12px] font-medium uppercase tracking-[0.16em] text-burgundy">
                    {s.badge}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-2xl font-light text-ink md:text-[1.5rem] leading-snug">{s.t}</h3>
                <p className="mt-4 flex-1 text-[13px] font-light leading-relaxed text-ink/75">{s.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/20 px-2.5 py-1 text-[12px] uppercase tracking-[0.14em] text-ink/70 transition-colors group-hover:border-burgundy/50 group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="mt-12 text-center border-t border-ink/10 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              Pricing and timelines are agreed per project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

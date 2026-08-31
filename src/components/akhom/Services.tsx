import { IconHome, IconBuilding, IconCompass, IconClipboard, IconSofa, IconBrush } from "./icons";
import { Reveal } from "./ui";

const SERVICES = [
  {
    n: "01",
    icon: IconHome,
    t: "Residential Interiors",
    d: "Luxury villas, apartments, independent homes and farmhouses — kitchens, wardrobes, living spaces, home offices.",
    tags: ["Villas", "Apartments", "Farmhouses", "Smart homes"],
  },
  {
    n: "02",
    icon: IconBuilding,
    t: "Corporate & Commercial",
    d: "Offices and GCC fit-outs, retail, showrooms, experience centres and clubhouses — from workstations to boardrooms.",
    tags: ["Offices & GCC", "Retail", "Showrooms", "Clubhouses"],
  },
  {
    n: "03",
    icon: IconCompass,
    t: "Design Services",
    d: "Interior architecture, space planning, concept and mood boards, 3D visualisation, material and lighting design.",
    tags: ["Space planning", "3D views", "Lighting", "Vastu-aligned"],
  },
  {
    n: "04",
    icon: IconClipboard,
    t: "Turnkey Execution",
    d: "Project management, civil works, MEP coordination, procurement, site supervision and quality control to handover.",
    tags: ["Civil works", "MEP", "Procurement", "Site QC"],
  },
  {
    n: "05",
    icon: IconSofa,
    t: "Custom Furniture & Joinery",
    d: "Bespoke furniture, cabinetry and storage, architectural joinery, doors, partitions and panelling.",
    tags: ["Bespoke furniture", "Cabinetry", "Panelling", "Doors"],
  },
  {
    n: "06",
    icon: IconBrush,
    t: "Renovation & Remodelling",
    d: "Full-home renovations, kitchen and bath upgrades, reconfiguration and finish or lighting upgrades.",
    tags: ["Full-home", "Kitchen & bath", "Reconfiguration"],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-ivory px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow text-ink/50">Services</p>
          <h2 className="display mt-6 max-w-[16ch] text-ink" style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
            Everything a finished space needs, in one contract.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px bg-ink/10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={((i % 3) + 1) as 1 | 2 | 3} className="bg-ivory">
              <div className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-stone/40 md:p-10">
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-bronze" strokeWidth={1.5} />
                  <span className="text-[10px] tracking-[0.2em] text-bronze">{s.n}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-light text-ink md:text-[1.7rem]">{s.t}</h3>
                <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-ink/75">{s.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/20 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors group-hover:border-bronze/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

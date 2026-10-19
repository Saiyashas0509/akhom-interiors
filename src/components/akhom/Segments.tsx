import { Link } from "@tanstack/react-router";
import { IconArrowUpRight, IconCheck } from "./icons";
import { Parallax, Reveal } from "./ui";

const SEGMENTS = [
  {
    id: "residential",
    title: "Residential Interiors",
    caption: "Apartments, villas & farmhouses",
    body: "From compact apartments to luxury villas — kitchens, wardrobes, living spaces and pooja units built around how your family actually lives.",
    bullets: ["Villas & independent homes", "Premium apartments", "Modular kitchens & wardrobes", "Pooja units & joinery"],
    to: "/residential" as const,
    img: "/images/curated/seg-residential.jpg",
    alt: "Open living space with oak slatted partition shelving and warm ceiling lights",
  },
  {
    id: "corporate",
    title: "Commercial, Healthcare & Hospitality",
    caption: "Offices, clinics & venues",
    body: "Fit-outs for teams that cannot afford downtime — workstations to boardrooms, clinic suites and hospitality lounges, handed over ready to occupy.",
    bullets: ["Offices & GCC fit-outs", "Clinics & healthcare suites", "Restaurants & hotels", "Civil, electrical & acoustics"],
    to: "/corporate" as const,
    img: "/images/curated/seg-commercial.jpg",
    alt: "Workspace with black-framed fluted glass partition and marble floor",
  },
];

export function Segments({
  heading = true,
  only,
}: { heading?: boolean; only?: "residential" | "corporate" } = {}) {
  const items = only ? SEGMENTS.filter((s) => s.id === only) : SEGMENTS;
  return (
    <section className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        {heading ? (
          <Reveal>
            <p className="eyebrow text-ink">What we build</p>
            <h2 className="display mt-4 max-w-[18ch] text-ink" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Two kinds of spaces. One standard of finish.
            </h2>
          </Reveal>
        ) : null}

        <div className={`${heading ? "mt-12" : ""} grid grid-cols-1 gap-6 ${only ? "lg:max-w-4xl" : "lg:grid-cols-2"}`}>
          {items.map((s, i) => (
            <Reveal key={s.id} delay={i}>
              <Link id={s.id} to={s.to} className="group glass block scroll-mt-28 overflow-hidden rounded-[32px] p-3">
                <Parallax className="rounded-[24px]" speed={-30} scale={1.1}>
                  <img
                    src={s.img}
                    alt={s.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </Parallax>
                <div className="p-5 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-ink">{s.caption}</p>
                      <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{s.title}</h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-45">
                      <IconArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-4 max-w-[52ch] text-[15px] font-light leading-relaxed text-ink">{s.body}</p>
                  <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-[14px] text-ink">
                        <IconCheck className="h-3.5 w-3.5 shrink-0 text-ink" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

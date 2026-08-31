import { Link } from "@tanstack/react-router";
import { Parallax, Reveal } from "./ui";
import { IconArrowRight } from "./icons";
import residentialImg from "@/assets/residential.jpg";
import corporateImg from "@/assets/corporate.jpg";

const SEGMENTS = [
  {
    id: "residential",
    index: "01",
    title: "Residential",
    caption: "Villas, apartments & farmhouses",
    body: "From 3BHK apartments in Banjara Hills to weekend farmhouses outside the city — kitchens, wardrobes, living spaces and smart-home integration, built around how your family actually lives.",
    bullets: [
      "Luxury villas & independent homes",
      "2 / 3 / 4 BHK apartments",
      "Modular kitchens & wardrobes",
      "Home offices & smart-home add-ons",
    ],
    to: "/residential" as const,
    img: residentialImg,
    alt: "Double-height living room with walnut staircase, stone flooring and warm daylight — an Akhom residential project",
  },
  {
    id: "corporate",
    index: "02",
    title: "Corporate & Commercial",
    caption: "Offices, retail & experience spaces",
    body: "Fit-outs for teams that can't afford downtime. Workstations to boardrooms, MEP and IT coordination included — handed over ready to occupy, on the date we agreed.",
    bullets: [
      "Corporate offices & GCC fit-outs",
      "Retail, showrooms & experience centres",
      "Receptions, cafeterias & breakouts",
      "MEP / IT coordination & handover",
    ],
    to: "/corporate" as const,
    img: corporateImg,
    alt: "Warm corporate reception with walnut slatted wall, stone desk and olive seating — an Akhom commercial project",
  },
];

export function Segments({
  heading = true,
  only,
}: { heading?: boolean; only?: "residential" | "corporate" } = {}) {
  const items = only ? SEGMENTS.filter((s) => s.id === only) : SEGMENTS;
  return (
    <section className="bg-ink px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        {heading ? (
        <Reveal>
          <p className="eyebrow text-ivory/45">What we build</p>
          <h2
            className="display mt-6 max-w-[16ch]"
            style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
          >
            Two kinds of clients.
            <br />
            One standard of finish.
          </h2>
        </Reveal>
        ) : null}

        <div
          className={`${heading ? "mt-12 md:mt-24" : ""} grid grid-cols-1 gap-14 ${
            only ? "md:max-w-3xl" : "md:grid-cols-2 md:gap-x-10 md:gap-y-0"
          }`}
        >
          {items.map((s, i) => (
            <Reveal key={s.id} delay={i + 1} className={i === 1 ? "md:mt-24" : ""}>
              <Link id={s.id} to={s.to} className="group block scroll-mt-28">
                <Parallax className="max-sm:-mx-6" speed={i === 0 ? -38 : -58} scale={1.12}>
                  <img
                    src={s.img}
                    alt={s.alt}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
                    loading="lazy"
                    decoding="async"
                  />
                </Parallax>
                <div className="mt-8 flex items-baseline justify-between border-b border-ivory/15 pb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] tracking-[0.2em] text-bronze">{s.index}</span>
                    <h3 className="font-serif text-3xl font-light md:text-4xl">{s.title}</h3>
                  </div>
                  <IconArrowRight
                    className="h-4 w-4 text-ivory/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bronze"
                  />
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-ivory/45">{s.caption}</p>
                <p className="mt-5 max-w-[52ch] text-sm font-light leading-relaxed text-ivory/65">{s.body}</p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-3 text-xs font-light text-ivory/55">
                      <span className="h-px w-3 shrink-0 -translate-y-[3px] bg-bronze/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

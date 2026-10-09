import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight } from "./icons";
import { Parallax, Reveal } from "./ui";
import residentialImg from "@/assets/residential.jpg";
import corporateImg from "@/assets/corporate.jpg";

const SEGMENTS = [
  {
    id: "residential",
    index: "01",
    title: "Residential Architecture",
    caption: "Villas, Penthouses & Estates",
    body: "From bespoke apartments and penthouses to luxury villas and weekend farmhouses across Hyderabad — kitchens, wardrobes, living spaces, and sacred mandir craft built around how your family actually lives.",
    bullets: [
      "Luxury villas & independent homes",
      "Penthouses & premium apartments",
      "Modular kitchens & custom wardrobes",
      "Bespoke teak mandirs & joinery",
    ],
    to: "/residential" as const,
    img: residentialImg,
    alt: "Double-height living room with walnut staircase, stone flooring and warm daylight — an AKHOM residential project",
  },
  {
    id: "corporate",
    index: "02",
    title: "Corporate, Healthcare & Hospitality",
    caption: "Offices, Clinics & Venues",
    body: "Fit-outs for teams and organizations that cannot afford downtime. Workstations to executive boardrooms, healthcare suites, and hospitality lounges — handed over ready to occupy on committed dates.",
    bullets: [
      "Corporate offices & GCC fit-outs",
      "Specialty clinics & healthcare suites",
      "Hotels, restaurants & clubhouses",
      "Civil, MEP & acoustic coordination",
    ],
    to: "/corporate" as const,
    img: corporateImg,
    alt: "Warm corporate reception with walnut slatted wall, stone desk and olive seating — an AKHOM commercial project",
  },
];

export function Segments({
  heading = true,
  only,
}: { heading?: boolean; only?: "residential" | "corporate" } = {}) {
  const items = only ? SEGMENTS.filter((s) => s.id === only) : SEGMENTS;
  return (
    <section className="bg-dark px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        {heading ? (
          <Reveal>
            <p className="eyebrow text-burgundy-light">What we build</p>
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
                  <motion.img
                    src={s.img}
                    alt={s.alt}
                    className="aspect-[4/5] w-full object-cover rounded-3xl transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                  />
                </Parallax>
                <div className="mt-8 flex items-baseline justify-between border-b border-ivory/15 pb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy-light">{s.index}</span>
                    <h3 className="font-serif text-3xl font-light md:text-4xl text-ivory group-hover:text-burgundy-light transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  <IconArrowRight
                    className="h-4 w-4 text-ivory/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-burgundy-light"
                  />
                </div>
                <p className="mt-3 text-[12px] uppercase tracking-[0.24em] text-burgundy-light">{s.caption}</p>
                <p className="mt-4 max-w-[52ch] text-sm font-light leading-relaxed text-ivory/70">{s.body}</p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-3 text-xs font-light text-ivory/65">
                      <span className="h-px w-3 shrink-0 -translate-y-[3px] bg-burgundy-light" />
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

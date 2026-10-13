import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight } from "./icons";
import { Parallax, Reveal, Marquee } from "./ui";
import g1 from "@/assets/glimpse-1.jpg";
import g2 from "@/assets/glimpse-2.jpg";
import g3 from "@/assets/glimpse-3.jpg";
import g4 from "@/assets/glimpse-4.jpg";

type Item = {
  img: string;
  alt: string;
  caption: string;
  span: string;
  ratio: string;
  speed: number;
};

const GLIMPSES: Item[] = [
  {
    img: g1,
    alt: "Curved mineral plaster stair with a slim bronze handrail rising through an ivory hall",
    caption: "Mineral plaster & hand-formed bronze handrail",
    span: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[7/6]",
    speed: -22,
  },
  {
    img: g3,
    alt: "Vanity carved from a single honed travertine block with an aged brass wall spout",
    caption: "Honed ivory travertine monolith vanity",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -34,
  },
  {
    img: g4,
    alt: "Precision acoustic fluted timber panelling with warm architectural lighting",
    caption: "Acoustic fluted timber panelling & brass detail",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -28,
  },
  {
    img: g2,
    alt: "Fluted American walnut wardrobe door with a knurled bronze pull beside a linen curtain",
    caption: "Fluted dark walnut joinery with knurled hardware",
    span: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[7/6]",
    speed: -18,
  },
];

const MATERIALS = [
  "American Walnut",
  "Honed Travertine",
  "Brushed Brass",
  "Mineral Plaster",
  "Fluted Oak",
  "Book-Matched Marble",
];

function Figure({ item, i }: { item: Item; i: number }) {
  return (
    <Reveal delay={Math.min(i, 3)} className={item.span}>
      <figure className="group">
        <Parallax className={`${item.ratio} w-full overflow-hidden rounded-2xl bg-stone/40`} speed={item.speed} scale={1.12}>
          <motion.img
            src={item.img}
            alt={item.alt}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.05 }}
          />
        </Parallax>
        <figcaption className="mt-3 flex items-baseline gap-4 border-t border-ink/12 pt-3">
          <span className="section-index text-burgundy">{String(i + 1).padStart(2, "0")}</span>
          <span className="truncate text-[12px] uppercase tracking-[0.16em] text-ink/70">
            {item.caption}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Glimpses() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      {/* Material register, drifting slowly. */}
      <Marquee className="border-y border-ink/12 py-5" duration={48}>
        {MATERIALS.map((m) => (
          <span
            key={m}
            className="mx-7 inline-flex items-center gap-7 text-[12px] uppercase tracking-[0.18em] text-ink/55"
          >
            {m}
            <span className="h-1 w-1 rounded-full bg-burgundy/50" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto mt-16 max-w-[1500px] px-6 md:mt-20 md:px-10 lg:px-14">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 border-b border-ink/12 pb-6 md:flex md:justify-between">
            <div className="min-w-0">
              <span className="section-index text-burgundy">MATERIAL / DETAIL</span>
              <h2
                className="display mt-4 text-ink"
                style={{ fontSize: "clamp(30px, 4.2vw, 62px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                Fragments of <em className="font-normal not-italic text-burgundy">crafted spaces.</em>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group hidden shrink-0 items-center gap-3 border-b border-burgundy/40 pb-1 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-burgundy hover:text-burgundy md:inline-flex"
            >
              See Selected Work
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
          {GLIMPSES.map((g, i) => (
            <Figure key={g.caption} item={g} i={i} />
          ))}
        </div>

        <Reveal>
          <Link
            to="/projects"
            className="group mt-10 inline-flex items-center gap-3 border-b border-burgundy/40 pb-1 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-burgundy hover:text-burgundy md:hidden"
          >
            See Selected Work
            <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

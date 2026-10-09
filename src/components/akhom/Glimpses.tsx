import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight } from "./icons";
import { Parallax, Reveal } from "./ui";
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
    caption: "Mineral Plaster & Hand-Formed Bronze Handrail",
    span: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[7/6]",
    speed: -22,
  },
  {
    img: g3,
    alt: "Vanity carved from a single honed travertine block with an aged brass wall spout",
    caption: "Honed Ivory Travertine Monolith Vanity",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -34,
  },
  {
    img: g4,
    alt: "Precision acoustic fluted timber panelling with warm architectural lighting",
    caption: "Acoustic Fluted Timber Panelling & Brass Detail",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -28,
  },
  {
    img: g2,
    alt: "Fluted American walnut wardrobe door with a knurled bronze pull beside a linen curtain",
    caption: "Fluted Dark Walnut Joinery with Knurled Hardware",
    span: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[7/6]",
    speed: -18,
  },
];

export function Glimpses() {
  return (
    <section className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 border-b border-ink/12 pb-6 md:flex md:justify-between">
            <div className="min-w-0">
              <p className="eyebrow text-burgundy">Tactile Details</p>
              <h2
                className="display mt-4 text-ink"
                style={{ fontSize: "clamp(30px, 4.2vw, 62px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                Fragments of <em className="font-light italic text-burgundy">crafted spaces.</em>
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

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:grid-cols-12 md:gap-x-8 md:gap-y-12">
          {GLIMPSES.map((g, i) => (
            <Reveal key={g.caption} delay={Math.min(i, 3)} className={g.span}>
              <figure className="group">
                <Parallax className={`${g.ratio} w-full overflow-hidden bg-stone/40`} speed={g.speed} scale={1.12}>
                  <motion.img
                    src={g.img}
                    alt={g.alt}
                    className="h-full w-full object-cover rounded-3xl transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                  />
                </Parallax>
                <figcaption className="mt-3 flex items-baseline gap-4 border-t border-ink/12 pt-3">
                  <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[12px] uppercase tracking-[0.16em] text-ink/75">
                    {g.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Wide closing frame */}
        <Reveal>
          <figure className="mt-10 md:mt-14">
            <Parallax className="aspect-[4/5] w-full overflow-hidden bg-stone/40 sm:aspect-[16/7]" speed={-16} scale={1.12}>
              <motion.img
                src={g4}
                alt="Architectural kitchen island in honed dark stone with fluted oak cabinetry"
                className="h-full w-full object-cover rounded-3xl transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
              />
            </Parallax>
            <figcaption className="mt-3 flex items-baseline gap-4 border-t border-ink/12 pt-3">
              <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy">05</span>
              <span className="truncate text-[12px] uppercase tracking-[0.16em] text-ink/75">
                Honed Granite Island & Precision Fluted Oak Cabinetry
              </span>
            </figcaption>
          </figure>
        </Reveal>

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

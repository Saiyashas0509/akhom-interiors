import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "./icons";
import { Parallax, Reveal } from "./ui";
import g1 from "@/assets/glimpse-1.jpg";
import g2 from "@/assets/glimpse-2.jpg";
import g3 from "@/assets/glimpse-3.jpg";
import g4 from "@/assets/glimpse-4.jpg";
import g5 from "@/assets/glimpse-5.jpg";

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
    alt: "Curved plaster stair with a slim bronze handrail rising through an ivory hall",
    caption: "Stair hall — Kokapet villa",
    span: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[7/6]",
    speed: -22,
  },
  {
    img: g3,
    alt: "Vanity carved from a single travertine block with an aged bronze wall tap",
    caption: "Travertine vanity — Banjara Hills",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -34,
  },
  {
    img: g4,
    alt: "Kitchen island in dark stone with fluted oak cabinetry and clerestory light",
    caption: "Kitchen — Jubilee Hills residence",
    span: "md:col-span-5",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
    speed: -30,
  },
  {
    img: g2,
    alt: "Fluted walnut wardrobe door with a knurled bronze pull beside a linen curtain",
    caption: "Wardrobe detail — in-house joinery",
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
              <p className="eyebrow text-ink/50">Glimpses</p>
              <h2
                className="display mt-4 text-ink"
                style={{ fontSize: "clamp(30px, 4.2vw, 62px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                Fragments of <em className="font-light italic">finished rooms.</em>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group hidden shrink-0 items-center gap-3 border-b border-ink/30 pb-1 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-ink hover:text-ink md:inline-flex"
            >
              See selected work
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:grid-cols-12 md:gap-x-8 md:gap-y-12">
          {GLIMPSES.map((g, i) => (
            <Reveal key={g.caption} delay={Math.min(i, 3)} className={g.span}>
              <figure className="group">
                <Parallax className={`${g.ratio} w-full overflow-hidden bg-stone/40`} speed={g.speed} scale={1.12}>
                  <img
                    src={g.img}
                    alt={g.alt}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </Parallax>
                <figcaption className="mt-3 flex items-baseline gap-4 border-t border-ink/12 pt-3">
                  <span className="text-[10px] tracking-[0.2em] text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px]">
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
              <img
                src={g5}
                alt="Reading corner with a leather lounge chair against an olive plaster wall"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Parallax>
            <figcaption className="mt-3 flex items-baseline gap-4 border-t border-ink/12 pt-3">
              <span className="text-[10px] tracking-[0.2em] text-bronze">05</span>
              <span className="truncate text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px]">
                Reading corner — Financial District apartment
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <Link
            to="/projects"
            className="group mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-1 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-ink hover:text-ink md:hidden"
          >
            See selected work
            <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Parallax, Reveal, LightboxModal } from "./ui";
import { IconArrowRight, IconMaximize } from "./icons";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const PROJECTS = [
  {
    name: "The Stone Court House",
    category: "residential",
    meta: "Private Villa — Jubilee Hills",
    narrative: "A dining room built around a single walnut table, lit by three bronze rings.",
    img: project1,
    alt: "Dining room with long walnut table, travertine walls and bronze ring pendants under a skylight",
    span: "md:col-span-7",
  },
  {
    name: "Olive Court Apartment",
    category: "residential",
    meta: "4 BHK Residence — Banjara Hills",
    narrative: "A walnut headboard wall that runs the full width of the principal bedroom.",
    img: project2,
    alt: "Bedroom with full-width walnut panelled headboard wall, linen bedding and brass reading lamps",
    span: "md:col-span-4 md:col-start-9 md:mt-40",
  },
  {
    name: "Meridian Boardroom",
    category: "corporate",
    meta: "Corporate Fit-Out — Financial District",
    narrative: "Eleven metres of book-matched walnut, wired for a board that never sits still.",
    img: project3,
    alt: "Boardroom with long walnut table, leather chairs, bronze pendants and slatted timber screens",
    span: "md:col-span-4 md:col-start-2 md:-mt-10",
  },
  {
    name: "Bronze Line Boutique",
    category: "corporate",
    meta: "Retail — Jubilee Hills, Road No. 12",
    narrative: "Stone plinths and walnut shelving for a jeweller who wanted the light to do the selling.",
    img: project4,
    alt: "Boutique retail interior with stone display plinths, walnut joinery and warm directional lighting",
    span: "md:col-span-6 md:col-start-7 md:mt-16",
  },
];

export function SelectedWork() {
  const [filter, setFilter] = useState<"all" | "residential" | "corporate">("all");
  const [activeLightbox, setActiveLightbox] = useState<typeof PROJECTS[0] | null>(null);

  const filteredProjects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="bg-ivory px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ink/50">Selected Work</p>
              <h2
                className="display mt-6 max-w-[14ch] text-ink"
                style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Rooms we've handed over.
              </h2>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border-b border-ink/30 pb-1 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              Request full portfolio
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Filter Bar */}
        <Reveal delay={1}>
          <div className="mt-10 flex gap-3 border-b border-ink/12 pb-4">
            {(["all", "residential", "corporate"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  filter === cat
                    ? "bg-ink text-ivory font-medium"
                    : "text-ink/60 hover:text-ink hover:bg-stone/30"
                }`}
              >
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Broken editorial grid — staggered columns, captions overlapping images */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-24 md:grid-cols-12">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) + 1} className={p.span}>
              <div className="group block cursor-pointer" onClick={() => setActiveLightbox(p)}>
                <div className="relative">
                  <Parallax speed={i % 2 === 0 ? -40 : -64} scale={1.14}>
                    <div className="relative overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.alt}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-[4/4.4]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-ivory/30 bg-ink/75 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                        <IconMaximize className="h-3 w-3" />
                        View Full Screen
                      </div>
                    </div>
                  </Parallax>
                  {/* Caption card overlapping the image corner */}
                  <div className="relative z-10 -mt-14 ml-5 max-w-[85%] bg-ivory p-6 shadow-[0_18px_50px_-24px_rgba(11,11,11,0.35)] md:-mt-20 md:ml-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl font-light text-ink">{p.name}</h3>
                      <span className="text-[10px] tracking-[0.2em] text-bronze">0{i + 1}</span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink/60">{p.meta}</p>
                    <p className="mt-4 text-sm font-light leading-relaxed text-ink/80">{p.narrative}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Preview */}
      {activeLightbox && (
        <LightboxModal
          isOpen={!!activeLightbox}
          onClose={() => setActiveLightbox(null)}
          imageSrc={activeLightbox.img}
          title={activeLightbox.name}
          subtitle={activeLightbox.meta}
          description={activeLightbox.narrative}
        />
      )}
    </section>
  );
}


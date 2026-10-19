import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const SHORT: Record<string, string> = {
  travertine: "Stone",
  walnut: "Walnut",
  "fluted-oak": "Fluted Oak",
  bronze: "Bronze",
  plaster: "Plaster",
};

const MATERIALS = [
  {
    id: "travertine",
    name: "Travertine & Natural Stone",
    category: "Hard Surface",
    image: "/images/curated/slide-foyer-wash.jpg",
    description:
      "Honed Ivory Travertine and Marquina marble — selected block by block at the quarry to ensure veins line up across vanity faces and wall cladding.",
    specs: ["Honed matte finish", "Custom carved basins", "Sealed against patina"],
  },
  {
    id: "walnut",
    name: "Dark American Walnut",
    category: "Joinery & Panelling",
    image: "/images/curated/svc-electrical.jpg",
    description:
      "Richly grained walnut and hand-matched veneers for headboards, slatted screens, display walls and boardroom tables.",
    specs: ["Natural oil finish", "Book-matched grain", "Kiln-dried stability"],
  },
  {
    id: "fluted-oak",
    name: "Fluted White Oak",
    category: "Cabinetry & Kitchens",
    image: "/images/curated/svc-residential.jpg",
    description:
      "Precision-milled fluted oak panelling that catches raking daylight and adds vertical rhythms to kitchen islands and reception desks.",
    specs: ["Custom profile pitch", "Low-VOC matte lacquer", "Integrated shadow gaps"],
  },
  {
    id: "bronze",
    name: "Aged & Patinated Bronze",
    category: "Hardware & Metalwork",
    image: "/images/curated/svc-pooja.jpg",
    description:
      "Knurled bronze handles, slim handrails, and flush inset strips drawn to accent timber junctions and age gracefully with touch.",
    specs: ["Hand-patinated finish", "Bespoke hardware casting", "Zero maintenance required"],
  },
  {
    id: "plaster",
    name: "Textured Mineral Plaster",
    category: "Wall Finishes",
    image: "/images/curated/svc-ceiling.jpg",
    description:
      "Lime-based Venetian plaster in custom stone and olive tones, hand-trowelled to give walls a soft, daylight-reflecting depth.",
    specs: ["Breathable mineral base", "Seamless curve transitions", "Hand-trowelled texture"],
  },
];

export function MaterialExplorer() {
  const defaultMat = MATERIALS[0]!;
  const [activeId, setActiveId] = useState<string>(defaultMat.id);
  const activeMat = MATERIALS.find((m) => m.id === activeId) ?? defaultMat;

  return (
    <section className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-ink">Material palette</p>
              <h2 className="display mt-4 max-w-[16ch] text-ink" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                Materials that age well.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[15px] font-light leading-relaxed text-ink">
              Every finish is specified by name, texture and origin before site work begins.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="glass mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={activeId === m.id}
                onClick={() => setActiveId(m.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] transition-all duration-500 ${
                  activeId === m.id ? "bg-ink text-ivory shadow-soft" : "text-ink hover:bg-white/70 hover:text-ink"
                }`}
              >
                {SHORT[m.id] ?? m.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={2} className="mt-6">
          <div className="glass grid grid-cols-1 gap-3 overflow-hidden rounded-[36px] p-3 md:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-stone md:col-span-7">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activeMat.id}
                  src={activeMat.image}
                  alt={activeMat.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <span className="glass-dark absolute left-4 top-4 rounded-full px-4 py-1.5 text-[13px] text-ivory">
                {activeMat.category}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col justify-center p-5 md:col-span-5 md:p-8"
              >
                <h3 className="font-serif text-3xl text-ink md:text-4xl">{activeMat.name}</h3>
                <p className="mt-4 text-[15px] font-light leading-relaxed text-ink">{activeMat.description}</p>
                <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-6">
                  {activeMat.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-3 text-[14px] text-ink">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-taupe" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

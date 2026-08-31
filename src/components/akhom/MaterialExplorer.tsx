import { useState } from "react";
import { Reveal } from "./ui";
import { IconSparkles, IconLayers } from "./icons";
import materialImg from "@/assets/material.jpg";
import craftImg from "@/assets/craft.jpg";
import glimpse1 from "@/assets/glimpse-1.jpg";
import glimpse3 from "@/assets/glimpse-3.jpg";
import glimpse4 from "@/assets/glimpse-4.jpg";

const MATERIALS = [
  {
    id: "travertine",
    name: "Travertine & Natural Stone",
    category: "Hard Surface",
    image: glimpse3,
    description:
      "Honed Ivory Travertine and Marquina marble — selected block by block at the quarry to ensure veins line up across vanity faces and wall cladding.",
    specs: ["Honed matte finish", "Custom carved basins", "Sealed against patina"],
  },
  {
    id: "walnut",
    name: "Dark American Walnut",
    category: "Joinery & Panelling",
    image: materialImg,
    description:
      "Richly grained solid walnut and hand-matched veneers. Used across principal headboards, wall slatted screens, and eleven-metre boardroom tables.",
    specs: ["Natural oil finish", "Book-matched grain", "Kiln-dried stability"],
  },
  {
    id: "fluted-oak",
    name: "Fluted White Oak",
    category: "Cabinetry & Kitchens",
    image: glimpse4,
    description:
      "Precision-milled fluted oak panelling that catches raking daylight and adds vertical rhythms to kitchen islands and reception desks.",
    specs: ["Custom profile pitch", "Low-VOC matte lacquer", "Integrated shadow gaps"],
  },
  {
    id: "bronze",
    name: "Aged & Patinated Bronze",
    category: "Hardware & Metalwork",
    image: craftImg,
    description:
      "Knurled bronze handles, slim handrails, and flush inset strips drawn to accent timber junctions and age gracefully with touch.",
    specs: ["Hand-patinated finish", "Bespoke hardware casting", "Zero maintenance required"],
  },
  {
    id: "plaster",
    name: "Textured Mineral Plaster",
    category: "Wall Finishes",
    image: glimpse1,
    description:
      "Lime-based Venetian plaster in custom stone and olive tones, hand-trowelled to give walls a soft, daylight-reflecting depth.",
    specs: ["Breathable mineral base", "Seamless curve transitions", "Hand-trowelled texture"],
  },
];

export function MaterialExplorer() {
  const [activeId, setActiveId] = useState(MATERIALS[0].id);
  const activeMat = MATERIALS.find((m) => m.id === activeId) || MATERIALS[0];

  return (
    <section className="bg-ink px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <IconSparkles className="h-3.5 w-3.5 text-bronze" />
                <p className="eyebrow text-ivory/45">Material Palette</p>
              </div>
              <h2
                className="display mt-4 max-w-[16ch] text-ivory"
                style={{ fontSize: "clamp(32px, 4.4vw, 64px)", lineHeight: 0.98 }}
              >
                Materials that age well.
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm font-light leading-relaxed text-ivory/65">
              Explore our core tactile library — every piece specified by name, texture, and origin before site work begins.
            </p>
          </div>
        </Reveal>

        {/* Tab Buttons */}
        <Reveal delay={1}>
          <div className="mt-12 flex flex-wrap gap-2 border-b border-ivory/15 pb-6">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveId(m.id)}
                className={`border px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeId === m.id
                    ? "border-bronze bg-bronze text-ivory shadow-lg"
                    : "border-ivory/20 bg-transparent text-ivory/70 hover:border-ivory/50 hover:text-ivory"
                }`}
              >
                {m.name.split(" ")[0]} {m.name.split(" ")[1] || ""}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active Material Card */}
        <Reveal delay={2} className="mt-10">
          <div className="grid grid-cols-1 gap-10 overflow-hidden border border-ivory/15 bg-ivory/[0.03] p-6 backdrop-blur-md md:grid-cols-12 md:p-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink md:col-span-6 md:aspect-[4/3.2]">
              <img
                key={activeMat.id}
                src={activeMat.image}
                alt={activeMat.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 border border-ivory/20 bg-ink/80 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-bronze">
                {activeMat.category}
              </div>
            </div>

            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.26em] text-bronze">
                  Tactile Specification
                </span>
                <h3 className="mt-3 font-serif text-3xl font-light tracking-tight text-ivory md:text-4xl">
                  {activeMat.name}
                </h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-ivory/75 md:text-base">
                  {activeMat.description}
                </p>
              </div>

              <div className="mt-8 border-t border-ivory/15 pt-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                  Architectural Features
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {activeMat.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs font-light text-ivory/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


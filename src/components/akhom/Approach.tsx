import { Reveal } from "./ui";
import materialImg from "@/assets/material.jpg";
import { MaterialExplorer } from "./MaterialExplorer";

const NOTES = [
  {
    n: "I",
    t: "Material honesty",
    d: "Stone that keeps its veins, walnut that keeps its grain, bronze allowed to patina — materials that age into the space, not out of it.",
  },
  {
    n: "II",
    t: "Detail as discipline",
    d: "Shadow gaps, reveal lines, junctions between materials — the parts of a room nobody names are the parts we spend the most time on.",
  },
  {
    n: "III",
    t: "Built, not just drawn",
    d: "Our drawings go to our own execution team. What you approve in a 3D view is what gets installed — no translation losses between designer and contractor.",
  },
];

export function Approach() {
  return (
    <>
      <section id="approach" className="bg-ivory px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow text-ink/50">Our Approach</p>
          </Reveal>

          <Reveal delay={1}>
            <h2
              className="display mt-8 max-w-[20ch] text-ink md:mt-10"
              style={{ fontSize: "clamp(38px, 5.4vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
            >
              Good rooms are decided
              <em className="text-bronze"> long before </em>
              they're furnished.
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-16 md:mt-24 lg:flex-row lg:items-center lg:gap-24">
            {/* Image block — offset frame + tag */}
            <Reveal className="w-full lg:w-5/12" delay={2}>
              <div className="group relative aspect-[3/4]">
                <div
                  className="absolute -inset-4 translate-x-3 translate-y-3 border border-ink/10 transition-transform duration-700 group-hover:translate-x-0 group-hover:translate-y-0"
                  aria-hidden="true"
                />
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={materialImg}
                    alt="Honed travertine meeting dark walnut joinery — the material palette of an Akhom interior"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={1365}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-ink/5" />
                </div>
                <div className="absolute -bottom-4 -left-4 hidden bg-ink px-6 py-4 lg:block">
                  <p className="text-[10px] font-light uppercase tracking-[0.4em] text-ivory">
                    Texture narrative
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Principles — dark glossy feature panel, the key selling points */}
            <Reveal className="w-full lg:w-7/12" delay={2}>
              <div className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_40px_80px_-30px_rgba(11,11,11,0.55)]">
                {/* gloss + sheen */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ivory/50 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-bronze/20 blur-3xl"
                  aria-hidden="true"
                />
                <div className="divide-y divide-ivory/10">
                  {NOTES.map((n) => (
                    <div
                      key={n.n}
                      className="group relative flex items-start gap-5 px-7 py-8 transition-colors duration-500 hover:bg-ivory/5 md:gap-8 md:px-12 md:py-11"
                    >
                      <span
                        className="pointer-events-none absolute left-0 top-6 bottom-6 w-px bg-bronze opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <span className="font-serif text-4xl font-light italic leading-none text-bronze md:text-6xl">
                        {n.n}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif text-2xl font-medium text-ivory md:text-4xl">
                          {n.t}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-ivory/70 md:text-base">
                          {n.d}
                        </p>
                      </div>
                      <span
                        className="ml-auto hidden shrink-0 self-center font-serif text-xl italic text-bronze/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-bronze md:block"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  ))}
                </div>
                <p className="border-t border-ivory/10 px-7 py-5 text-[10px] font-light uppercase tracking-[0.4em] text-ivory/40 md:px-12">
                  The Akhom standard — non-negotiable on every project
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <MaterialExplorer />
    </>
  );
}


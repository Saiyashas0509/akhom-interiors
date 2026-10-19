import { Parallax, Reveal } from "./ui";

const NOTES = [
  {
    t: "Material honesty",
    d: "Stone that keeps its veins, wood that keeps its grain — materials that age into the space, not out of it.",
  },
  {
    t: "Detail as discipline",
    d: "Shadow gaps, reveal lines, the junction between two finishes — the parts nobody names are the parts we spend the most time on.",
  },
  {
    t: "Built, not just drawn",
    d: "Our drawings go to our own execution team. What you approve in a 3D view is what gets installed — nothing lost between designer and contractor.",
  },
];

export function Approach() {
  return (
    <>
      <section id="approach" className="glass-stage px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow text-ink">Our approach</p>
            <h2 className="display mt-4 max-w-[20ch] text-ink" style={{ fontSize: "clamp(32px, 4.4vw, 62px)" }}>
              Good rooms are decided long before they're furnished.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Parallax className="h-full min-h-[420px] rounded-[32px] shadow-lift" speed={-34} scale={1.12}>
                <img
                  src="/images/curated/approach.jpg"
                  alt="Grey wardrobe wall with sculpted handles and loft storage"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </Parallax>
            </Reveal>

            <div className="space-y-4 lg:col-span-7">
              {NOTES.map((n, i) => (
                <Reveal key={n.t} delay={i}>
                  <div className="glass group rounded-[28px] p-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-9">
                    <span className="block h-px w-10 bg-taupe/60 transition-all duration-700 group-hover:w-16" aria-hidden="true" />
                    <h3 className="mt-5 font-serif text-2xl text-ink md:text-3xl">{n.t}</h3>
                    <p className="mt-3 max-w-[56ch] text-[15px] font-light leading-relaxed text-ink">{n.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

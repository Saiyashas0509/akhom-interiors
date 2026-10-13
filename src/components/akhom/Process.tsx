import {
  IconChat,
  IconBulb,
  IconBoxes,
  IconLayers,
  IconHelmet,
  IconShieldCheck,
  IconKey,
} from "./icons";
import { Reveal } from "./ui";

const STEPS = [
  {
    n: "01",
    icon: IconChat,
    t: "Consultation",
    d: "A structured conversation about your space, functional needs and timeline — at our Hyderabad studio, on site, or over WhatsApp. You leave knowing our approach and project feasibility.",
  },
  {
    n: "02",
    icon: IconBulb,
    t: "Concept",
    d: "Spatial planning, circulation diagrams, mood boards, and aesthetic direction. We iterate until the plan feels intuitive and tailored to your lifestyle.",
  },
  {
    n: "03",
    icon: IconBoxes,
    t: "Design Development",
    d: "Photorealistic 3D visualisations of every room, detailed architectural working drawings, and MEP layouts. You approve the exact room on screen before civil work begins.",
  },
  {
    n: "04",
    icon: IconLayers,
    t: "Materials",
    d: "Natural stone, dark walnut, brushed brass, textured mineral plasters and lighting hardware selected together block by block. Specifications are locked line by line.",
  },
  {
    n: "05",
    icon: IconHelmet,
    t: "Execution",
    d: "Civil works, MEP installations, custom carpentry in our Hyderabad workshop, and on-site fit-out managed by a dedicated site supervisor with structured photo updates.",
  },
  {
    n: "06",
    icon: IconShieldCheck,
    t: "Quality",
    d: "A rigorous multi-point snagging and quality audit: joinery tolerances, paint finishes, plumbing pressure tests, electrical load balancing, and aesthetic sign-off before handover.",
  },
  {
    n: "07",
    icon: IconKey,
    t: "Handover",
    d: "A comprehensive joint walkthrough, documented warranty manuals for all fixtures, and dedicated post-handover support that remains directly reachable.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-dark px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="section-index text-burgundy-light">PROCESS / 07</span>
              <h2
                className="display mt-5 max-w-[14ch] text-ivory"
                style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Seven stages. You always know which one you're in.
              </h2>
              <p className="mt-6 max-w-[40ch] text-[14px] font-light leading-relaxed text-ivory/60">
                Every stage has a dedicated owner, a fixed set of drawings, and a date on the
                calendar — so progress is something you can see, not assume.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t border-ivory/15">
            {STEPS.map((s) => (
              <li key={s.n} className="group">
                <Reveal>
                  <div className="flex gap-6 border-b border-ivory/15 py-8 transition-colors duration-500 md:gap-10 md:py-10">
                    <span className="w-10 shrink-0 font-serif text-3xl font-light leading-none text-burgundy-light/70 transition-colors duration-500 group-hover:text-burgundy-light md:text-4xl">
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <s.icon className="h-5 w-5 text-burgundy-light" strokeWidth={1.4} />
                        <h3 className="font-serif text-2xl font-light text-ivory">{s.t}</h3>
                      </div>
                      <p className="mt-3 max-w-[56ch] text-[13px] font-light leading-relaxed text-ivory/65">
                        {s.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

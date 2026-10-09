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
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow text-burgundy-light">Our Methodology</p>
          <h2
            className="display mt-6 max-w-[18ch] text-ivory"
            style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
          >
            Seven stages. You always know which one you're in.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(((i % 4) + 1) as 1 | 2 | 3) || 1}>
              <div className="border-t border-ivory/15 pt-6 transition-all duration-300 hover:border-burgundy-light">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy-light">{s.n}</span>
                  <span className="h-px flex-1 mx-4 bg-ivory/10" />
                  <s.icon className="h-5 w-5 text-burgundy-light" strokeWidth={1.4} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-light text-ivory">{s.t}</h3>
                <p className="mt-3 max-w-[46ch] text-[13px] font-light leading-relaxed text-ivory/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="mt-12 text-center border-t border-ivory/10 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ivory/60">
              Pricing and timelines are agreed per project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

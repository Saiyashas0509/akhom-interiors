import { IconChat, IconBulb, IconBoxes, IconLayers, IconHelmet, IconKey } from "./icons";
import { Reveal } from "./ui";

const STEPS = [
  {
    n: "01",
    icon: IconChat,
    t: "Consultation",
    d: "A conversation about your space, budget and timeline — at our studio, on site, or over WhatsApp. You leave knowing exactly what we'd do and roughly what it costs.",
  },
  {
    n: "02",
    icon: IconBulb,
    t: "Concept",
    d: "Space planning, mood boards and a design direction you can react to. Two rounds of revisions are built in — this is where the project gets its character.",
  },
  {
    n: "03",
    icon: IconBoxes,
    t: "Design Development",
    d: "3D visualisations of every room, working drawings, and the full material palette. You approve the finished space on screen before we touch the site.",
  },
  {
    n: "04",
    icon: IconLayers,
    t: "Materials",
    d: "Stone, veneer, fabric and hardware selected together and priced line by line. No allowances, no vague placeholders — the quote is the number.",
  },
  {
    n: "05",
    icon: IconHelmet,
    t: "Execution",
    d: "Civil works, MEP coordination, joinery and installation by our own team, with a dedicated site supervisor and weekly photo updates.",
  },
  {
    n: "06",
    icon: IconKey,
    t: "Handover",
    d: "A snagging walkthrough together, documentation for everything installed, and post-handover support that actually answers the phone.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-ivory px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow text-ink/50">Process</p>
          <h2 className="display mt-6 max-w-[18ch] text-ink" style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
            Six steps. You'll always know which one you're in.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="border-t border-ink/20 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-bronze">{s.n}</span>
                  <span className="h-px flex-1 mx-4 bg-ink/10" />
                  <s.icon className="h-4.5 w-4.5 text-bronze/80" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-light text-ink">{s.t}</h3>
                <p className="mt-3 max-w-[46ch] text-sm font-light leading-relaxed text-ink/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { IconTeam, IconSofa, IconReceipt, IconHandshake, IconArrowUpRight } from "./icons";
import { Reveal } from "./ui";

const REASONS = [
  {
    icon: IconTeam,
    t: "One accountable team",
    d: "Design, procurement and site execution sit under the same roof. When something needs an answer on site, it comes from the person who drew it — not a third contractor in the chain.",
  },
  {
    icon: IconSofa,
    t: "Custom furniture, made for the room",
    d: "Bespoke furniture, cabinetry, doors and panelling are built to the millimetre of your plan. Nothing is forced to fit a standard size after the fact.",
  },
  {
    icon: IconReceipt,
    t: "No budget surprises",
    d: "Materials are selected and priced during design development — before execution begins. The quote you sign is the number the project is managed against.",
  },
  {
    icon: IconHandshake,
    t: "We stay after handover",
    d: "Post-handover support is part of the engagement, not a favour. Adjustments, touch-ups and questions get a response, not a new invoice by default.",
  },
];

export function WhyAkhom() {
  const [open, setOpen] = useState(0);

  return (
    <section id="why" className="bg-ink px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow text-ivory/45">Why Akhom</p>
          <h2 className="display mt-6 max-w-[18ch]" style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
            The things clients mention a year later.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-ivory/15 md:mt-20">
          {REASONS.map((r, i) => {
            const active = open === i;
            return (
              <Reveal key={r.t} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <button
                  onClick={() => setOpen(i)}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-ivory/15 py-8 text-left md:gap-x-12 md:py-10"
                >
                  <span className="flex flex-col items-start gap-3">
                    <span className="text-[10px] tracking-[0.2em] text-bronze">0{i + 1}</span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                      active
                        ? "border-bronze bg-bronze/20 text-bronze shadow-[0_0_15px_rgba(154,118,84,0.3)] scale-110"
                        : "border-ivory/20 bg-ivory/[0.04] text-ivory/50 group-hover:border-bronze/50 group-hover:text-bronze"
                    }`}>
                      <r.icon className="h-5 w-5" />
                    </div>
                  </span>
                  <span>
                    <span
                      className={`block font-serif font-light transition-colors duration-300 ${
                        active ? "text-ivory" : "text-ivory/75 group-hover:text-ivory"
                      }`}
                      style={{ fontSize: "clamp(26px, 3.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
                    >
                      {r.t}
                    </span>
                    <span
                      className={`block overflow-hidden transition-all duration-500 ease-out ${
                        active ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <span className="block max-w-[62ch] text-sm font-light leading-relaxed text-ivory/60">
                        {r.d}
                      </span>
                    </span>
                  </span>
                  <IconArrowUpRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      active ? "rotate-90 text-bronze" : "text-ivory/40 group-hover:text-ivory/70"
                    }`}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

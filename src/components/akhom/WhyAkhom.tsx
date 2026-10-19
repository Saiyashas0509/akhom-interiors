import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconTeam, IconSofa, IconReceipt, IconHandshake, IconChevronDown } from "./icons";
import { Reveal } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const REASONS = [
  {
    icon: IconTeam,
    t: "One accountable team",
    d: "Design, procurement and site execution sit under the same roof. When something needs an answer on site, it comes from the person who drew it — not a third contractor in the chain.",
  },
  {
    icon: IconSofa,
    t: "Custom furniture, made for the room",
    d: "Furniture, cabinetry, doors and panelling are built to the millimetre of your plan. Nothing is forced to fit a standard size after the fact.",
  },
  {
    icon: IconReceipt,
    t: "No budget surprises",
    d: "Materials are selected and priced during design development — before execution begins. The quote you sign is the number the project is managed against.",
  },
  {
    icon: IconHandshake,
    t: "We stay after handover",
    d: "Post-handover support is part of the engagement. Adjustments, touch-ups and questions get a response, not a new invoice by default.",
  },
];

export function WhyAkhom() {
  const [open, setOpen] = useState(0);

  return (
    <section id="why" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-ink">Why AKHOM</p>
          <h2 className="display mt-4 max-w-[16ch] text-ink" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            What clients remember a year later.
          </h2>
          <img
            src="/images/curated/why.jpg"
            alt="Fluted laminate wardrobe with brushed metal handles"
            className="mt-10 hidden aspect-[4/5] w-full rounded-[32px] object-cover shadow-lift lg:block"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="space-y-3 lg:col-span-7 lg:pt-4">
          {REASONS.map((r, i) => {
            const active = open === i;
            return (
              <Reveal key={r.t} delay={i}>
                <div className={`rounded-[28px] transition-colors duration-500 ${active ? "glass-strong" : "glass"}`}>
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setOpen(i)}
                    className="flex w-full items-center gap-5 p-6 text-left md:p-7"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                        active ? "bg-ink text-ivory" : "bg-stone text-ink"
                      }`}
                    >
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 font-serif text-xl text-ink md:text-2xl">{r.t}</span>
                    <IconChevronDown
                      className={`h-4 w-4 text-ink transition-transform duration-500 ${active ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] px-6 pb-7 pl-[5.25rem] text-[15px] font-light leading-relaxed text-ink md:px-7 md:pl-[5.75rem]">
                          {r.d}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

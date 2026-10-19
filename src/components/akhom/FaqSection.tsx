import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui";
import { IconChevronDown } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export const FAQS = [
  {
    q: "What does your turnkey interior execution include?",
    a: "Turnkey execution at AKHOM covers the complete project lifecycle: architectural space planning, 3D visualisation, civil demolition/masonry, MEP (mechanical, electrical, plumbing), HVAC coordination, custom joinery manufactured in our Hyderabad workshop, false ceiling, surface finishes, and final handover with quality snag checks.",
  },
  {
    q: "How are custom furniture, wardrobes, and puja mandirs built?",
    a: "Unlike studios that outsource to third-party carpentry contractors, AKHOM operates an in-house joinery facility in Hyderabad. We build wardrobes, architectural panelling, brass-inlaid doors, and custom wooden puja mandirs strictly to the millimetre of your approved working drawings.",
  },
  {
    q: "How does AKHOM prevent budget overruns and scope creep?",
    a: "Before site execution commences, all materials (stone, veneer, sanitaryware, architectural hardware) are selected and costed line-by-line during the Design Development stage. The quote you approve is the fixed project sum we manage against.",
  },
  {
    q: "Do you undertake commercial, healthcare, and hospitality projects?",
    a: "Yes. In addition to luxury villas and apartments, AKHOM executes corporate offices and GCC facilities, outpatient clinics, diagnostic centres, boutique hotels, and restaurants with full MEP and acoustic compliance.",
  },
  {
    q: "What post-handover support do you provide?",
    a: "Every project concludes with a joint quality audit and a documented handover dossier including warranties and care guides. Our studio remains directly reachable for scheduled maintenance checks and any post-handover adjustments.",
  },
];

export function FaqSection({ title = "Frequently Asked Questions" }: { title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="eyebrow text-ink">Questions & answers</p>
          <h2 className="display mt-4 max-w-[20ch] text-ink" style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
            {title}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.q} delay={i}>
                <div className={`rounded-[26px] transition-colors duration-500 ${isOpen ? "glass-strong" : "glass"}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-7"
                  >
                    <span className="font-serif text-lg text-ink md:text-xl">{faq.q}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        isOpen ? "rotate-180 bg-ink text-ivory" : "bg-stone text-ink"
                      }`}
                    >
                      <IconChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[70ch] px-6 pb-7 text-[15px] font-light leading-relaxed text-ink md:px-7">{faq.a}</p>
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

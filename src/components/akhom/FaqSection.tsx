import { useState } from "react";
import { Reveal } from "./ui";
import { IconChevronDown } from "./icons";

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

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-ivory px-6 py-20 text-ink md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="eyebrow text-burgundy">Questions & Answers</p>
          <h2
            className="display mt-4 max-w-[18ch] text-ink"
            style={{ fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1 }}
          >
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-ink/12 border-t border-b border-ink/12">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="py-6">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between text-left group"
                >
                  <span className="font-serif text-xl sm:text-2xl font-light text-ink group-hover:text-burgundy transition-colors pr-6">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-transform duration-300 ${
                      isOpen ? "rotate-180 border-burgundy text-burgundy" : "text-ink/60"
                    }`}
                  >
                    <IconChevronDown className="h-4 w-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 pr-10 text-[14px] font-light leading-relaxed text-ink/75">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

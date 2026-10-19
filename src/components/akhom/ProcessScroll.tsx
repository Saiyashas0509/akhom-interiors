import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "./ui";
import { smoothScrollTo } from "./SmoothScroll";

/*
 * Pinned, scroll-scrubbed process story.
 * Image choreography adapted from the Klyra template's "How it works" timeline:
 * the next image waits at the right edge, glides and scales into centre stage,
 * then arcs away to the lower left and dims as the following step arrives.
 */

const STEPS = [
  {
    title: "Consultation",
    text: "We visit your space, listen to how you live or work, and agree on scope, style and budget together.",
    image: "/images/curated/proc-consult.jpg",
    alt: "Blush wardrobe wall with window seat",
  },
  {
    title: "Design & 3D",
    text: "Space planning, mood boards and realistic 3D views of every room — refined until it feels right.",
    image: "/images/curated/proc-design.jpg",
    alt: "Sage arched wardrobe with built-in window seat",
  },
  {
    title: "Materials",
    text: "Laminates, veneers, stone, hardware and lighting chosen side by side, with transparent, line-by-line pricing.",
    image: "/images/curated/proc-materials.jpg",
    alt: "Marble-look feature wall with oak display shelves and lit niches",
  },
  {
    title: "Execution",
    text: "Civil, electrical, ceilings, painting and in-house joinery — managed by a dedicated site supervisor with regular updates.",
    image: "/images/curated/proc-execution.jpg",
    alt: "Floating TV unit and plaster feature wall with concealed lighting",
  },
  {
    title: "Handover",
    text: "A detailed quality check, a final clean, and the keys to a space that is ready to live in.",
    image: "/images/curated/proc-handover.jpg",
    alt: "Finished bedroom with sage arched wardrobe, ready to move in",
  },
] as const;

const N = STEPS.length;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/** Converts a step offset (…-2, -1, 0, +1, +2…) into progress units for step i. */
const at = (i: number, offset: number) => (i + offset) / (N - 1);

function ProcessImage({
  i,
  progress,
  desktop,
}: {
  i: number;
  progress: MotionValue<number>;
  desktop: boolean;
}) {
  const input = [at(i, -2), at(i, -1), at(i, 0), at(i, 1), at(i, 2)];

  // Upcoming (before centre) waits on the right; passed steps arc away to the lower left.
  // Desktop: Klyra arc. Mobile: a simpler right-to-left slide.
  const x = useTransform(
    progress,
    input,
    desktop ? ["110vw", "40vw", "0vw", "-47vw", "-70vw"] : ["120%", "110%", "0%", "-120%", "-120%"],
  );
  const y = useTransform(progress, input, desktop ? ["-4vh", "-4vh", "0vh", "46vh", "80vh"] : ["0vh", "0vh", "0vh", "0vh", "0vh"]);
  const scale = useTransform(progress, input, desktop ? [0.78, 0.78, 1, 0.62, 0.55] : [0.9, 0.9, 1, 0.9, 0.9]);
  const shade = useTransform(progress, input, [0.3, 0.3, 0, 0.55, 1]);
  const radius = useTransform(progress, input, [40, 36, 28, 36, 40]);
  // The image closest to centre stage always sits on top.
  const zIndex = useTransform(progress, (v) => 10 - Math.round(Math.abs(v * (N - 1) - i) * 2));

  const step = STEPS[i]!;
  return (
    <motion.figure
      style={{ x, y, scale, borderRadius: radius, zIndex }}
      className="absolute left-3 right-3 top-[11vh] h-[38vh] overflow-hidden shadow-lift will-change-transform sm:left-[6%] sm:right-[6%] sm:h-[42vh] lg:left-[42vw] lg:right-auto lg:top-[15vh] lg:h-[64vh] lg:w-[50vw]"
    >
      <img src={step.image} alt={step.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-ink" aria-hidden="true" />
    </motion.figure>
  );
}

function ProcessText({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const c = at(i, 0);
  const half = 0.5 / (N - 1);
  const quarter = 0.22 / (N - 1);
  const first = i === 0;
  const last = i === N - 1;
  const opacity = useTransform(
    progress,
    [c - half, c - quarter, c + quarter, c + half],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(progress, [c - half, c, c + half], [first ? 0 : 22, 0, last ? 0 : -22]);
  const step = STEPS[i]!;
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="text-[13px] tracking-[0.08em] text-ink">Step {i + 1}</p>
      <h3 className="display mt-2 text-ink" style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}>
        {step.title}
      </h3>
      <p className="mt-3 max-w-[38ch] text-[14px] font-light leading-relaxed text-ink md:text-[15px]">{step.text}</p>
    </motion.div>
  );
}

/** Step tabs: light up as the scene scrubs, and glide to a step on click. */
function StepTabs({ progress, onSelect }: { progress: MotionValue<number>; onSelect: (i: number) => void }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))))));
  return (
    <div className="flex gap-1.5 rounded-full bg-stone/70 p-1" role="tablist" aria-label="Process steps">
      {STEPS.map((s, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={on}
            aria-label={`Step ${i + 1}: ${s.title}`}
            onClick={() => onSelect(i)}
            className={`flex h-9 items-center justify-center gap-2 rounded-full text-[13px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              on ? "flex-[2.4] bg-ink px-3 text-ivory shadow-soft" : done ? "flex-1 bg-white/80 text-ink" : "flex-1 text-ink hover:bg-white/60"
            }`}
          >
            <span>{i + 1}</span>
            {on && <span className="hidden truncate sm:inline">{s.title}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function ProcessScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Smooth scrub, similar to a GSAP ScrollTrigger `scrub: 0.8`.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, mass: 0.5 });

  const goToStep = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(top + at(i, 0) * (el.offsetHeight - window.innerHeight));
  };

  if (reduced) {
    return (
      <section id="process" className="glass-stage px-4 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow text-ink">How we work</p>
          <h2 className="display mt-4 text-ink" style={{ fontSize: "clamp(30px, 4vw, 52px)" }}>
            From first conversation to keys in hand.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="glass overflow-hidden rounded-[28px] p-2">
                <img src={s.image} alt={s.alt} className="aspect-[4/3] w-full rounded-[22px] object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="text-[13px] text-ink">Step {i + 1}</p>
                  <h3 className="mt-1 font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14px] font-light leading-relaxed text-ink">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" ref={ref} className="relative" style={{ height: `${N * 90}vh` }}>
      <div className="glass-stage sticky top-0 h-[100svh] overflow-hidden">
        {STEPS.map((_, i) => (
          <ProcessImage key={i} i={i} progress={progress} desktop={desktop} />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-4 md:px-8 md:pb-6 lg:inset-y-0 lg:left-0 lg:right-auto lg:flex lg:w-[40vw] lg:items-center lg:pb-0">
          <div className="glass-strong pointer-events-auto w-full rounded-[28px] p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow text-ink">How we work</p>
            </div>
            <div className="mt-4">
              <StepTabs progress={progress} onSelect={goToStep} />
            </div>
            <div className="relative mt-4 h-[150px] md:h-[180px]">
              {STEPS.map((_, i) => (
                <ProcessText key={i} i={i} progress={progress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

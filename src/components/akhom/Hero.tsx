import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroVideoBg } from "./HeroVideoBg";
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { Magnetic, useReducedMotion } from "./ui";

const DISCIPLINES = [
  { n: "01", t: "DESIGN", to: "/services" },
  { n: "02", t: "DETAIL", to: "/services" },
  { n: "03", t: "CUSTOM CRAFT", to: "/services" },
  { n: "04", t: "EXECUTION", to: "/process" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const stage = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.11, delayChildren: 0.15 } },
  };
  const line = {
    hidden: reduced ? { opacity: 0 } : { y: "112%" },
    show: { y: "0%", opacity: 1, transition: { duration: 1.05, ease: EASE } },
  };
  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-dark text-ivory">
      <HeroVideoBg />

      {/* Layered scrims: readable type over a moving image. */}
      <div className="absolute inset-0 z-[1] bg-ink/60" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 items-center px-6 md:px-10 lg:px-14">
        <motion.div
          variants={stage}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-[1600px] flex-col justify-center pt-28 pb-12 md:pt-32"
        >
        <motion.p
          variants={fade}
          className="text-[12px] font-medium uppercase tracking-[0.28em] text-burgundy-light [text-shadow:0_2px_16px_rgba(11,11,11,0.8)]"
        >
          AKHOM INTERIORS / HYDERABAD
        </motion.p>

        <h1
          className="display mt-6 text-ivory [text-shadow:0_4px_44px_rgba(11,11,11,0.75)]"
          style={{ fontSize: "clamp(46px, 10.5vw, 118px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={line} className="block will-change-transform">
              Timeless designs.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={line} className="block text-ivory/90 will-change-transform">
              Thoughtful spaces.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fade}
          className="mt-7 max-w-[46ch] text-[15px] font-light leading-relaxed text-ivory/80 [text-shadow:0_2px_20px_rgba(11,11,11,0.85)] md:text-base"
        >
          Luxury residences, workplaces, healthcare and hospitality interiors across Hyderabad —
          designed, crafted and executed by one accountable studio.
        </motion.p>

        <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic strength={0.22} radius={90}>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-burgundy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-burgundy-hover"
            >
              <span className="sheen" aria-hidden="true" />
              <span className="relative z-10">Book a Consultation</span>
              <IconArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          <Link
            to="/projects"
            className="link-rule inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-ivory/90"
          >
            View Selected Work
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
        </motion.div>
      </div>

      {/* Frosted base plate: location + the four disciplines, stated once. */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.75, ease: EASE }}
        className="relative z-10 border-t border-ivory/15 bg-dark/40 backdrop-blur-xl"
      >
        <div className="px-6 md:px-10 lg:px-14">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[12px] uppercase tracking-[0.24em] text-ivory/55">
            Hyderabad, Telangana
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {DISCIPLINES.map((d) => (
              <Link
                key={d.n}
                to={d.to}
                className="group inline-flex items-baseline gap-2 text-[12px] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-ivory"
              >
                <span className="font-light tabular-nums text-burgundy-light/70">{d.n}</span>
                <span>{d.t}</span>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui";
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { SERVICES } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;
const WITH_IMAGES = SERVICES.filter((s) => s.image);

/** One image at a time: the list drives a single crossfading frame (Klyra services pattern). */
export function ServiceShowcase() {
  const [active, setActive] = useState(WITH_IMAGES[0]!.slug);
  const current = WITH_IMAGES.find((s) => s.slug === active) ?? WITH_IMAGES[0]!;

  return (
    <section id="services" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-ink">What we do</p>
              <h2 className="display mt-4 max-w-[18ch] text-ink" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                Everything your space needs, under one roof.
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-[14px] text-ivory transition-colors hover:bg-burgundy md:self-auto"
            >
              All services
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ul className="glass flex gap-2 overflow-x-auto rounded-[28px] p-2 lg:flex-col lg:gap-0.5 lg:overflow-visible">
              {WITH_IMAGES.map((s) => {
                const on = s.slug === active;
                return (
                  <li key={s.slug} className="shrink-0">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(s.slug)}
                      onFocus={() => setActive(s.slug)}
                      onClick={() => setActive(s.slug)}
                      aria-pressed={on}
                      className={`flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-[20px] px-5 py-3.5 text-left transition-all duration-300 ${
                        on ? "bg-white text-ink shadow-soft" : "text-ink hover:bg-white/50 hover:text-ink"
                      }`}
                    >
                      <span className="font-serif text-lg lg:text-xl">{s.title}</span>
                      <IconArrowRight
                        className={`hidden h-4 w-4 transition-all duration-300 lg:block ${on ? "opacity-100" : "-translate-x-1 opacity-0"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-stone shadow-lift lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.slug}
                  src={current.image!}
                  alt={current.imageAlt}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
              <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="glass-dark flex items-end justify-between gap-4 rounded-[24px] p-5 text-ivory md:p-6"
                  >
                    <div>
                      <p className="eyebrow text-burgundy-light">{current.group}</p>
                      <h3 className="mt-2 font-serif text-2xl md:text-3xl">{current.title}</h3>
                      <p className="mt-2 max-w-[44ch] text-[14px] font-light leading-relaxed text-ivory/80">
                        {current.short}
                      </p>
                    </div>
                    <Link
                      to="/services"
                      hash={current.slug}
                      aria-label={`Explore ${current.title}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory text-ink transition-transform hover:scale-105"
                    >
                      <IconArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

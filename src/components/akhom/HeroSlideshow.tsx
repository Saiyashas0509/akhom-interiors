import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "./icons";
import { useReducedMotion } from "./ui";

// Curated, clutter-free project photographs only.
const SLIDES = [
  { src: "/images/curated/slide-bedroom.jpg", caption: "Bedrooms", alt: "Calm bedroom with upholstered bed, cove lighting and city view" },
  { src: "/images/curated/slide-tv-wall.jpg", caption: "Living & Joinery", alt: "Walnut shelving with warm LED lighting around a stone feature wall" },
  { src: "/images/curated/slide-foyer-wash.jpg", caption: "Foyers", alt: "Foyer wash area with fluted oak panel, floating vanity and textured walls" },
  { src: "/images/curated/slide-kitchen.jpg", caption: "Kitchens", alt: "Grey modular kitchen with lit glass wall cabinets" },
  { src: "/images/curated/slide-peacock-wardrobe.jpg", caption: "Wardrobes", alt: "Blush wardrobe with hand-painted peacock arch panels" },
  { src: "/images/curated/slide-entrance.jpg", caption: "Entrances", alt: "Warm teak main door framed by wood panelling and festive garland" },
  { src: "/images/curated/slide-office.jpg", caption: "Workplaces", alt: "Office lounge with marble floor and black-framed glass partitions" },
] as const;

const INTERVAL = 6000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduced, go]);

  const slide = SLIDES[index]!;

  return (
    <div className="glass-stage px-3 pt-[88px] md:px-6 md:pt-[100px]">
    <section
      id="top"
      className="relative mx-auto h-[72svh] min-h-[500px] max-h-[760px] max-w-[1600px] overflow-hidden rounded-[32px] bg-stone text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured AKHOM interiors"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`h-full w-full object-cover ${reduced ? "" : "kenburns"}`}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {/* Preload the next slide so crossfades never flash. */}
      <link rel="preload" as="image" href={SLIDES[(index + 1) % SLIDES.length]!.src} />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/35" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-end px-3 pb-5 md:px-8 md:pb-8">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="glass-dark max-w-[620px] rounded-[26px] p-5 md:p-8"
          >
            <p className="eyebrow text-burgundy-light">AKHOM Interiors · Hyderabad</p>
            <h1 className="display mt-4 text-ivory" style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
              Timeless designs.
              <br />
              Thoughtful spaces.
            </h1>
            <p className="mt-4 max-w-[46ch] text-[14px] font-light leading-relaxed text-ivory/80 md:mt-5 md:text-base">
              Homes and workplaces designed, crafted and delivered by one accountable team.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-white md:px-6 md:py-3.5"
              >
                Book a Consultation
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/price-calculator"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-white/10 px-5 py-3 text-[14px] text-ivory backdrop-blur-md transition-colors hover:bg-white/20 md:px-6 md:py-3.5"
              >
                Get a Free Estimate
              </Link>
            </div>
          </motion.div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.caption}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="glass-dark rounded-full px-4 py-2 text-[13px] tracking-[0.06em] text-ivory/90"
              >
                {slide.caption}
              </motion.span>
            </AnimatePresence>

            <div className="glass-dark mr-16 flex items-center gap-1 rounded-full p-1.5 md:mr-20">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => go(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <IconArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5 px-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    aria-label={`Show ${s.caption}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-6 bg-ivory" : "w-1.5 bg-ivory/40 hover:bg-ivory/70"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => go(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

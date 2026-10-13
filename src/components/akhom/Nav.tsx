import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { Magnetic, ScrollProgress } from "./ui";
import { IconMenu, IconX, IconArrowRight, IconMessage } from "./icons";

const LINKS = [
  { label: "Residential", to: "/residential" },
  { label: "Corporate", to: "/corporate" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Our Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Price Calculator", to: "/price-calculator" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav({ solid = false }: { solid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(solid || v > 24));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onDark = !scrolled;

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-ink/10 bg-ivory/85 text-ink backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent text-ivory"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 md:h-[80px] md:px-10 lg:px-14">
          <Logo variant={scrolled ? "dark" : "light"} />

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-burgundy" }}
                className={`link-rule text-[12px] font-light uppercase tracking-[0.16em] transition-colors duration-300 ${
                  onDark ? "text-ivory/75 hover:text-ivory" : "text-ink/70 hover:text-burgundy"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:block" strength={0.2} radius={70}>
              <Link
                to="/contact"
                className={`group relative inline-flex items-center overflow-hidden border px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                  onDark
                    ? "border-ivory/35 text-ivory hover:border-burgundy hover:bg-burgundy"
                    : "border-ink/20 text-ink hover:border-burgundy hover:bg-burgundy hover:text-ivory"
                }`}
              >
                <span className="sheen" aria-hidden="true" />
                Book a Consultation
              </Link>
            </Magnetic>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="akhom-menu"
              onClick={() => setOpen(true)}
              className="p-2 lg:hidden"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="akhom-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink text-ivory"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" aria-hidden="true" />

            <div className="relative flex items-center justify-between border-b border-ivory/10 px-6 py-5 sm:px-10">
              <Logo variant="light" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-burgundy-light hover:text-ivory"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              className="relative my-auto flex-1 overflow-y-auto px-6 py-[clamp(2rem,6vh,5rem)] sm:px-10"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } } }}
              aria-label="Mobile"
            >
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { y: "110%" },
                    show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
                  }}
                  className="overflow-hidden"
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-6 border-b border-ivory/10 py-5"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="w-6 text-[11px] font-light tabular-nums text-burgundy-light/70">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-[clamp(2rem,8vw,3.5rem)] font-light leading-none tracking-tight text-ivory/90 transition-colors duration-300 group-hover:text-burgundy-light">
                        {l.label}
                      </span>
                    </span>
                    <IconArrowRight className="h-5 w-5 shrink-0 translate-x-0 text-ivory/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-burgundy-light" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative border-t border-ivory/10 px-6 py-6 sm:px-10"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-burgundy px-7 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-ivory/55">
                  <span className="text-ivory/45">Hyderabad, Telangana</span>
                  <a
                    href="mailto:info@akhominteriors.com"
                    className="normal-case tracking-[0.06em] transition-colors hover:text-ivory"
                  >
                    info@akhominteriors.com
                  </a>
                  <a href="tel:+919177361122" className="transition-colors hover:text-ivory">
                    +91 91773 61122
                  </a>
                  <a
                    href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ivory"
                  >
                    <IconMessage className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { ScrollProgress } from "./ui";
import { IconMenu, IconX, IconArrowRight, IconMessage, IconChevronDown } from "./icons";
import { SERVICE_GROUPS, servicesByGroup } from "@/data/services";
import { WHATSAPP_URL } from "@/lib/contact";

const LINKS = [
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav({ solid = false }: { solid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(solid || v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
  };

  const onDark = !scrolled;
  const linkTone = onDark ? "text-ivory/85 hover:text-ivory" : "text-ink hover:opacity-70";

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={`relative mx-auto flex h-[62px] max-w-[1400px] items-center justify-between rounded-full px-4 transition-[background-color,border-color,box-shadow] duration-500 md:h-[68px] lg:px-7 ${
            scrolled ? "glass-strong text-ink" : "glass-dark text-ivory"
          }`}
        >
          <Logo variant={scrolled ? "dark" : "light"} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 text-[14px] tracking-[0.04em] transition-colors duration-300 ${linkTone}`}
              >
                Services
                <IconChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="services-menu"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="glass-strong absolute left-1/2 top-[calc(100%+22px)] w-[720px] -translate-x-1/2 rounded-[28px] !bg-white/90 p-6 text-ink"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {SERVICE_GROUPS.map((group) => (
                        <div key={group}>
                          <p className="eyebrow text-ink">{group}</p>
                          <ul className="mt-4 space-y-1">
                            {servicesByGroup(group).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to="/services"
                                  hash={s.slug}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-[14px] text-ink transition-colors hover:bg-white/70 hover:opacity-70"
                                >
                                  {s.title}
                                  <IconArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3">
                      <span className="text-[13px] text-ink">Not sure what you need? We'll guide you.</span>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                      >
                        All services <IconArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "!text-ink" }}
                className={`text-[14px] tracking-[0.04em] transition-colors duration-300 ${linkTone}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 md:inline-flex ${
                onDark ? "bg-ivory text-ink hover:bg-white" : "bg-ink text-ivory hover:bg-burgundy"
              }`}
            >
              Book a Consultation
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="akhom-menu"
              onClick={() => setOpen(true)}
              className="rounded-full p-2.5 lg:hidden"
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
            transition={{ duration: 0.35, ease: EASE }}
            className="glass-stage fixed inset-0 z-[70] flex flex-col text-ink"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <Logo variant="dark" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="glass flex h-11 w-11 items-center justify-center rounded-full"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 pb-8 sm:px-8" aria-label="Mobile">
              <div className="glass rounded-[28px] p-2">
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-4 font-serif text-2xl"
                >
                  Services
                  <IconChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      {SERVICE_GROUPS.map((group) => (
                        <div key={group} className="px-4 pb-4">
                          <p className="eyebrow pt-2 text-ink">{group}</p>
                          <ul className="mt-2">
                            {servicesByGroup(group).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to="/services"
                                  hash={s.slug}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 text-[15px] text-ink"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-serif text-2xl"
                  >
                    {l.label}
                    <IconArrowRight className="h-4 w-4 text-ink" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] font-medium text-ivory"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space.`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[14px]"
                >
                  <IconMessage className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

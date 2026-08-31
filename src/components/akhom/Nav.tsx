import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ScrollProgress } from "./ui";
import { IconMenu, IconX } from "./icons";

const LINKS = [
  { label: "Residential", to: "/residential" },
  { label: "Corporate", to: "/corporate" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Our Process", to: "/process" },
  { label: "About", to: "/about" },
] as const;

export function Nav({ solid = false }: { solid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(solid || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-ink/10 bg-ivory/90 text-ink backdrop-blur-sm"
            : "border-transparent text-ivory"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          <Logo variant={scrolled ? "dark" : "light"} />

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "opacity-100 font-normal border-b border-bronze pb-0.5" }}
                inactiveProps={{ className: "opacity-70 hover:opacity-100" }}
                className="text-[11px] font-light uppercase tracking-[0.18em] transition-all duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={`hidden border px-6 py-3 text-[10px] font-medium uppercase tracking-[0.24em] transition-all duration-300 md:inline-block ${
                scrolled
                  ? "border-ink/25 hover:border-bronze hover:bg-ink hover:text-ivory hover:shadow-[0_0_15px_rgba(154,118,84,0.3)]"
                  : "border-ivory/40 hover:border-bronze hover:bg-ivory hover:text-ink hover:shadow-[0_0_15px_rgba(243,239,232,0.3)]"
              }`}
            >
              Book a Consultation
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink text-ivory">
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <Logo variant="light" />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <IconX className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-6 px-6 md:px-10">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-serif text-4xl font-light tracking-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-12 md:px-10">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-block border border-ivory/40 px-6 py-4 text-[10px] uppercase tracking-[0.2em]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

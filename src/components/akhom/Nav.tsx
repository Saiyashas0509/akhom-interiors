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
  { label: "Price Calculator", to: "/price-calculator" },
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
                activeProps={{ className: "opacity-100 font-normal border-b border-burgundy pb-0.5" }}
                inactiveProps={{ className: "opacity-70 hover:opacity-100" }}
                className="text-[12px] font-light uppercase tracking-[0.18em] transition-all duration-300 hover:text-burgundy"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={`hidden border px-6 py-3 text-[12px] font-medium uppercase tracking-[0.24em] transition-all duration-300 md:inline-block ${
                scrolled
                  ? "border-burgundy/40 text-ink hover:border-burgundy hover:bg-burgundy hover:text-ivory hover:shadow-[0_0_15px_rgba(125,38,82,0.3)]"
                  : "border-ivory/40 text-ivory hover:border-burgundy-light hover:bg-burgundy hover:text-ivory hover:shadow-[0_0_15px_rgba(125,38,82,0.4)]"
              }`}
            >
              Book a Consultation
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-current"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-dark/98 backdrop-blur-2xl text-ivory px-6 py-6 sm:px-10 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ivory/10 pb-5">
            <Logo variant="light" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ivory/[0.05] text-ivory/80 transition-colors hover:border-burgundy-light hover:text-ivory"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto flex flex-col py-8 space-y-1">
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-3.5 border-b border-ivory/8 transition-all duration-300 hover:border-burgundy-light/40 hover:pl-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy-light/80 group-hover:text-burgundy-light">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-light tracking-normal text-ivory/90 group-hover:text-ivory">
                    {l.label}
                  </span>
                </div>
                <span className="text-burgundy-light/60 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Actions & Studio Info */}
          <div className="space-y-4 pt-6 border-t border-ivory/10">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center border border-burgundy bg-burgundy px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_0_20px_rgba(125,38,82,0.3)] transition-all duration-300 hover:bg-burgundy-hover"
            >
              Book a Consultation
            </Link>
            <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-ivory/50 pt-2">
              <span>Hyderabad, Telangana</span>
              <a href="mailto:info@akhominteriors.com" className="hover:text-ivory transition-colors">
                info@akhominteriors.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

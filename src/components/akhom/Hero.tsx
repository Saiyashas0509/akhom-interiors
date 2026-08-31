import { Link } from "@tanstack/react-router";
import { IconPen, IconRuler, IconSofa, IconHelmet, IconArrowRight } from "./icons";
import { HeroVideoBg } from "./HeroVideoBg";

const PILLARS = [
  {
    n: "01",
    t: "Design",
    d: "Interior architecture, space planning and 3D visualisation — before a single wall is touched.",
    to: "/services",
    icon: IconPen,
  },
  {
    n: "02",
    t: "Detail",
    d: "Material and colour selection, lighting design, Vastu-aligned layouts where they matter to you.",
    to: "/about",
    icon: IconRuler,
  },
  {
    n: "03",
    t: "Custom Craft",
    d: "Bespoke furniture, joinery, panelling and wardrobes made for your space, not the catalogue.",
    to: "/services",
    icon: IconSofa,
  },
  {
    n: "04",
    t: "Execution",
    d: "Civil works, MEP coordination and site supervision by one accountable team, through to handover.",
    to: "/process",
    icon: IconHelmet,
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-ivory"
    >
      <HeroVideoBg />
      <div className="absolute inset-0 z-[1] bg-ink/55" />
      <div className="absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-ink/75 to-transparent" />

      {/* Centred hero copy */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-5 pt-24 pb-8 text-center sm:px-6 sm:pt-28 md:pt-32">
        <p className="eyebrow" style={{ textShadow: "0 2px 16px rgba(11,11,11,0.8)" }}>
          Akhom Interiors / Hyderabad
        </p>
        <h1
          className="display mt-5 max-w-[15ch] md:mt-7"
          style={{
            fontSize: "clamp(46px, 12vw, 128px)",
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
            textShadow: "0 4px 40px rgba(11,11,11,0.75), 0 1px 8px rgba(11,11,11,0.6)",
          }}
        >
          Timeless designs.
          <br />
          <em className="font-light italic">Thoughtful spaces.</em>
        </h1>

        <p
          className="mx-auto mt-6 max-w-[34ch] text-[15px] font-normal leading-relaxed sm:max-w-[52ch] md:mt-8 md:text-base"
          style={{ textShadow: "0 2px 20px rgba(11,11,11,0.85)" }}
        >
          Villas and apartments in Banjara Hills and Jubilee Hills. Offices, showrooms and
          experience centres across Hyderabad — one team, from first sketch to final handover.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row sm:gap-8 md:mt-10">
          <Link
            to="/contact"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-ivory/30 bg-ivory/95 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-ink transition-all duration-500 hover:border-bronze hover:bg-ivory hover:shadow-[0_0_25px_rgba(154,118,84,0.35)] sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-3">
              Book a Consultation
              <IconArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-bronze"
              />
            </span>
          </Link>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 border-b border-ivory/40 pb-1 text-[10px] uppercase tracking-[0.24em] transition-all duration-300 hover:border-bronze hover:text-bronze"
          >
            View Selected Projects
            <IconArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Scroll cue — mobile only */}
        <div className="mt-10 flex flex-col items-center gap-2 sm:hidden" aria-hidden="true">
          <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-ivory/60 to-transparent" />
        </div>
      </div>

      {/* Bottom glass panel, flush to the fold */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-0 sm:px-6">
        <div className="relative overflow-hidden rounded-t-[28px] border border-b-0 border-ivory/20 bg-ink/75 px-5 pt-7 text-ivory shadow-[0_-40px_100px_-40px_rgba(11,11,11,0.95),inset_0_1px_0_rgba(243,239,232,0.22),inset_0_-1px_0_rgba(243,239,232,0.06)] backdrop-blur-[28px] backdrop-saturate-[180%] sm:rounded-t-[36px] sm:px-8 sm:pt-10 md:rounded-t-[44px] md:px-12 md:pt-12">
          {/* Apple-style gloss sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ivory/16 to-transparent sm:h-36" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-[100%] bg-ivory/[0.10] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-6 top-2 h-px bg-gradient-to-r from-transparent via-ivory/35 to-transparent sm:inset-x-10" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ivory/50">
                What we do
              </span>
              <h2
                className="display mt-3 text-ivory"
                style={{ fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
              >
                Four disciplines,
                <br className="hidden sm:block" /> one accountable team
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm leading-relaxed text-ivory/65 md:text-[15px]">
                Design, detail, custom craft and execution held under one roof — so drawings,
                materials and site work never drift apart.
              </p>
            </div>
          </div>

          <div className="relative mt-7 h-px w-full bg-ivory/15 md:mt-10" />

          <div className="relative grid grid-cols-1 py-4 sm:grid-cols-2 sm:gap-3 sm:py-6 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <Link
                key={p.n}
                to={p.to}
                className="group flex items-center justify-between gap-3 border-t border-ivory/12 px-1 py-4 transition-colors duration-300 first:border-t-0 hover:bg-ivory/[0.06] sm:flex-col sm:items-start sm:gap-2 sm:border-t-0 sm:bg-ivory/[0.04] sm:px-5 sm:py-5 sm:hover:bg-ivory/[0.09]"
              >
                <span className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3">
                  <span className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-bronze/15 text-bronze shadow-[0_0_12px_rgba(154,118,84,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:bg-bronze/25">
                      <p.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-ivory/40">{p.n}</span>
                  </span>
                  <span className="font-serif text-lg text-ivory sm:text-[11px] sm:font-medium sm:uppercase sm:tracking-[0.18em]">
                    {p.t}
                  </span>
                </span>
                <span className="hidden text-sm font-light leading-relaxed text-ivory/55 sm:block">
                  {p.d}
                </span>
                <IconArrowRight
                  className="h-4 w-4 shrink-0 text-ivory/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ivory sm:mt-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

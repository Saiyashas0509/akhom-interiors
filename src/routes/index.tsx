import { createFileRoute, Link } from "@tanstack/react-router";
import { IconArrowRight, IconArrowUpRight } from "@/components/akhom/icons";

import { Nav } from "@/components/akhom/Nav";
import { Hero } from "@/components/akhom/Hero";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { Glimpses } from "@/components/akhom/Glimpses";
import { Testimonials } from "@/components/akhom/Testimonials";
import { PriceCalculator } from "@/components/akhom/PriceCalculator";
import { ConsultationForm } from "@/components/akhom/ConsultationForm";
import { Parallax, Reveal } from "@/components/akhom/ui";
import craft from "@/assets/craft.jpg";
import residentialImg from "@/assets/residential.jpg";
import corporateImg from "@/assets/corporate.jpg";

const TITLE = "AKHOM INTERIORS — Timeless Designs, Thoughtful Spaces | Hyderabad";
const DESCRIPTION =
  "Premier architectural interior design and turnkey execution in Hyderabad. Luxury residences, commercial offices, healthcare facilities and bespoke joinery.";

// Launch Blocker B5: Unverified stats removed. Only verified pillars retained.
const VERIFIED_PILLARS = [
  { k: "In-House", v: "Workshop joinery & custom craft" },
  { k: "One Team", v: "Concept drawing to turnkey handover" },
  { k: "Turnkey", v: "Civil, MEP and finishes in one contract" },
  { k: "Transparent", v: "Locked line-by-line material pricing" },
] as const;

const SERVICE_PILLARS = [
  "Residential Interiors",
  "Corporate & Commercial",
  "Healthcare & Hospital Interiors",
  "Hospitality Interiors",
  "Design Services",
  "Turnkey Execution",
  "Custom Furniture & Joinery",
  "Renovation & Remodelling",
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory">
      <Nav />
      <main>
        {/* 1 · Hero */}
        <Hero />

        {/* 2 · Studio statement, segments & verified pillars */}
        <section className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-x-10">
            <div className="md:col-span-7">
              <Reveal>
                <p className="eyebrow text-burgundy">THE STUDIO</p>
                <h2
                  className="display mt-5 max-w-[16ch] text-ink"
                  style={{ fontSize: "clamp(32px, 4.6vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
                >
                  Built with intention.
                  <br />
                  <em className="font-normal not-italic text-burgundy">Finished with permanence.</em>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={1}>
                <p className="max-w-[46ch] text-base font-light leading-relaxed text-ink/75">
                  We design and build a focused collection of homes, workplaces, and specialized
                  healthcare spaces each year — natural stone, American walnut, and warm light,
                  executed by the very team that drafted them.
                </p>
                <Link
                  to="/about"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-burgundy/40 pb-1 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-burgundy hover:text-burgundy"
                >
                  About the Studio
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Two architectural segments — the studio's core commissions. */}
          <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-1 gap-8 md:mt-24 md:grid-cols-2 md:gap-6">
            <Reveal>
              <Link to="/residential" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-stone/40">
                  <img
                    src={residentialImg}
                    alt="Sunlit residential living room with walnut joinery, honed stone floor and warm architectural lighting"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05] md:aspect-[5/4]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                    <h3
                      className="display text-ivory [text-shadow:0_2px_20px_rgba(11,11,11,0.6)]"
                      style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                    >
                      Homes that age well
                    </h3>
                    <IconArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-ivory/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <p className="mt-4 max-w-[46ch] text-[14px] font-light leading-relaxed text-ink/75">
                  Villas, apartments and farmhouses built around daylight, natural stone and joinery
                  made to the millimetre.
                </p>
              </Link>
            </Reveal>

            <Reveal delay={1}>
              <Link to="/corporate" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-stone/40">
                  <img
                    src={corporateImg}
                    alt="Contemporary corporate reception with fluted timber, fluted glass partitions and stone console"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05] md:aspect-[5/4]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                    <h3
                      className="display text-ivory [text-shadow:0_2px_20px_rgba(11,11,11,0.6)]"
                      style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                    >
                      Workplaces with presence
                    </h3>
                    <IconArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-ivory/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <p className="mt-4 max-w-[46ch] text-[14px] font-light leading-relaxed text-ink/75">
                  Offices, GCC fit-outs and experience centres — from high-density workstations to
                  executive boardrooms.
                </p>
              </Link>
            </Reveal>
          </div>

          {/* Verified pillars as a quiet ledger, not a row of boxes. */}
          <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
            {VERIFIED_PILLARS.map((f) => (
              <Reveal key={f.k}>
                <div className="border-t border-ink/15 pt-5">
                  <dt className="font-serif text-xl font-light tracking-tight text-ink md:text-2xl">
                    {f.k}
                  </dt>
                  <dd className="mt-2 max-w-[26ch] text-[12px] font-medium uppercase tracking-[0.16em] text-ink/60">
                    {f.v}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* 3 · Services teaser — the full eight pillars live at /services */}
        <section className="border-t border-ink/10 bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <span className="section-index text-burgundy">SERVICES / 08</span>
                  <h2
                    className="display mt-5 max-w-[18ch] text-ink"
                    style={{ fontSize: "clamp(30px, 4.2vw, 60px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
                  >
                    Everything a finished space needs, in one contract.
                  </h2>
                </div>
                <div className="md:col-span-5">
                  <p className="max-w-[44ch] text-[15px] font-light leading-relaxed text-ink/75">
                    Residential, commercial, healthcare and hospitality interiors — drawn, crafted and
                    executed by one accountable team under a single contract.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <ul className="mt-12 border-t border-ink/12">
                {SERVICE_PILLARS.map((p, i) => (
                  <li key={p}>
                    <Link
                      to="/services"
                      className="group flex items-baseline justify-between gap-6 border-b border-ink/12 py-4"
                    >
                      <span className="flex min-w-0 items-baseline gap-5">
                        <span className="section-index w-6 shrink-0 text-burgundy/70">0{i + 1}</span>
                        <span className="truncate font-serif text-xl font-light text-ink transition-colors duration-300 group-hover:text-burgundy md:text-2xl">
                          {p}
                        </span>
                      </span>
                      <IconArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={2}>
              <Link
                to="/services"
                className="group mt-9 inline-flex items-center gap-3 border-b border-burgundy/40 pb-1 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                Explore all eight service pillars
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 4 · Material glimpses */}
        <Glimpses />

        {/* 5 · In-House craft band */}
        <section className="bg-ivory px-4 py-4 md:px-6 md:py-6">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-dark text-ivory md:grid-cols-2">
            <Parallax
              className="aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]"
              speed={-26}
              scale={1.12}
            >
              <img
                src={craft}
                alt="Craftsman finishing a bespoke joinery detail in our Hyderabad workshop"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Parallax>
            <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-16">
              <Reveal>
                <span className="section-index text-burgundy-light">IN-HOUSE WORKSHOP</span>
                <h2
                  className="display mt-5 max-w-[16ch] text-ivory"
                  style={{ fontSize: "clamp(30px, 3.8vw, 56px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  Made for the room,{" "}
                  <em className="font-normal not-italic text-burgundy-light">not the catalogue.</em>
                </h2>
                <p className="mt-6 max-w-[46ch] text-sm font-light leading-relaxed text-ivory/70 md:text-[15px]">
                  Wardrobes, architectural panelling, bespoke tables, and traditional teak mandirs
                  crafted to the exact millimetre in our own Hyderabad facility.
                </p>
                <Link
                  to="/services"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-ivory/35 pb-1 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-burgundy-light hover:text-burgundy-light"
                >
                  Explore Services & Joinery
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 6 · Studio commitment */}
        <Testimonials />

        {/* 7 · Price estimator */}
        <section
          id="calculator"
          className="border-t border-ink/10 bg-stone/20 px-6 py-20 md:px-10 md:py-28 lg:px-14"
        >
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[60ch] text-center">
                <span className="section-index text-burgundy">BUDGET</span>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-ink/70">
                  Get a transparent turnkey investment range in under a minute, based on verified
                  Hyderabad execution rates — then book a consultation to refine the details.
                </p>
              </div>
            </Reveal>
            <PriceCalculator />
          </div>
        </section>

        {/* 8 · Book a consultation */}
        <ConsultationForm />
      </main>
      <SiteFooter />
    </div>
  );
}

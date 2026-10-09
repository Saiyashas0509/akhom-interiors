import { createFileRoute, Link } from "@tanstack/react-router";
import { IconArrowRight, IconMessage } from "@/components/akhom/icons";

import { Nav } from "@/components/akhom/Nav";
import { Hero } from "@/components/akhom/Hero";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { Glimpses } from "@/components/akhom/Glimpses";
import { Services } from "@/components/akhom/Services";
import { Process } from "@/components/akhom/Process";
import { SelectedWork } from "@/components/akhom/SelectedWork";
import { ProjectGallery } from "@/components/akhom/ProjectGallery";
import { Renovation } from "@/components/akhom/Renovation";
import { Testimonials } from "@/components/akhom/Testimonials";
import { Parallax, Reveal } from "@/components/akhom/ui";
import { PriceCalculator } from "@/components/akhom/PriceCalculator";
import { motion } from "framer-motion";
import craft from "@/assets/craft.jpg";
import ctaImg from "@/assets/cta.jpg";

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


const EXPLORE = [
  { n: "01", to: "/projects", t: "Selected Work", d: "Curated residential, commercial & craft folios." },
  { n: "02", to: "/services", t: "Eight Service Pillars", d: "Residential, commercial, healthcare, hospitality & craft." },
  { n: "03", to: "/process", t: "Seven Stages Process", d: "From initial consultation to quality audit & handover." },
  { n: "04", to: "/about", t: "The Studio", d: "Our design philosophy, material honesty & leadership." },
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
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Studio Statement & Trust Pillars (B5 compliance) */}
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
                  <em className="font-light italic text-burgundy">Finished with permanence.</em>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={1}>
                <p className="max-w-[46ch] text-base font-light leading-relaxed text-ink/75">
                  We design and build a focused collection of homes, workplaces, and specialized healthcare spaces each year — natural stone, American walnut, and warm light, executed by the very team that drafted them.
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

          {/* Prominent Dual Trust Pillars */}
          <div className="mx-auto mt-14 max-w-[1500px] border-t border-ink/12 pt-10 md:mt-20">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VERIFIED_PILLARS.map((f, i) => (
                <Reveal
                  key={f.k}
                  delay={Math.min(i, 3)}
                  className={`border p-6 md:p-8 transition-colors ${
                    i < 2
                      ? "border-burgundy/40 bg-burgundy/[0.04] shadow-sm"
                      : "border-ink/10 bg-white/40"
                  }`}
                >
                  <dt className="font-serif text-2xl font-light tracking-tight text-burgundy md:text-3xl">
                    {f.k}
                  </dt>
                  <dd className="mt-2 max-w-[24ch] text-[12px] font-medium uppercase tracking-[0.16em] text-ink/75">
                    {f.v}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>


{/* 3.5 Price Calculator */}
<section className="bg-ivory py-20">
  <PriceCalculator />
</section>

        {/* 4. Eight Service Pillars (PRD Gap G5) */}
        <Services />

        {/* 5. Glimpses / Material Details (B7 compliance) */}
        <Glimpses />

        {/* 6. In-House Craft Band */}
        <section className="relative overflow-hidden bg-dark text-ivory">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Parallax className="aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]" speed={-26} scale={1.12}>
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
                <p className="eyebrow text-burgundy-light">In-House Workshop</p>
                <h2
                  className="display mt-5 max-w-[16ch] text-ivory"
                  style={{ fontSize: "clamp(30px, 3.8vw, 56px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  Made for the room, <em className="font-light italic text-burgundy-light">not the catalogue.</em>
                </h2>
                <p className="mt-6 max-w-[46ch] text-sm font-light leading-relaxed text-ivory/70 md:text-[15px]">
                  Wardrobes, architectural panelling, bespoke tables, and traditional teak mandirs crafted to the exact millimetre in our own Hyderabad facility.
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

        {/* 7. Seven Stages Process (PRD Gap G7) */}
        <Process />

        {/* 8. Renovation & Remodelling Section (PRD Gap G6) */}
        <Renovation />

        {/* 9. Selected Work & Portfolio Request (B6, G1) */}
        <SelectedWork />

        {/* 9.5 Full Project Photo Gallery (All segregated folders) */}
        <ProjectGallery />

        {/* 10. Testimonials / Studio Commitment (PRD Gap G3) */}
        <Testimonials />

        {/* 11. Explore Index */}
        <section className="bg-dark px-6 pb-20 pt-16 text-ivory md:px-10 md:pb-28 md:pt-24 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="eyebrow text-burgundy-light">Explore AKHOM</p>
            </Reveal>
            <div className="mt-8 border-t border-ivory/15 md:mt-10">
              {EXPLORE.map((e) => (
                <Reveal key={e.to}>
                  <Link
                    to={e.to}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ivory/15 py-5 transition-colors duration-300 hover:bg-ivory/[0.04] md:flex md:items-baseline md:justify-between md:py-7"
                  >
                    <span className="flex min-w-0 items-baseline gap-4 md:gap-10">
                      <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy-light">{e.n}</span>
                      <span className="truncate font-serif text-2xl font-light tracking-tight md:text-4xl text-ivory group-hover:text-burgundy-light transition-colors">
                        {e.t}
                      </span>
                    </span>
                    <span className="flex items-baseline gap-6">
                      <span className="hidden text-sm font-light text-ivory/60 md:inline">{e.d}</span>
                      <IconArrowRight
                        className="h-4 w-4 shrink-0 self-center text-ivory/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-burgundy-light"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Final CTA Section */}
        <section className="relative isolate overflow-hidden">
          <img
            src={ctaImg}
            alt="Natural travertine meeting dark walnut joinery in raking light"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-dark/80" aria-hidden="true" />
          <div className="mx-auto max-w-[1500px] px-6 py-20 text-ivory md:px-10 md:py-28 lg:px-14">
            <Reveal>
              <p className="eyebrow text-burgundy-light">Begin Your Project</p>
              <h2
                className="display mt-5 max-w-[18ch] text-ivory"
                style={{
                  fontSize: "clamp(32px, 4.4vw, 64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  textShadow: "0 2px 30px rgba(11,11,11,0.6)",
                }}
              >
                Tell us about the space. <em className="font-light italic text-burgundy-light">We'll tell you the truth.</em>
              </h2>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  to="/contact"
                  className="group inline-flex w-full items-center justify-center gap-3 bg-burgundy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-burgundy-hover sm:w-auto"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 border border-ivory/30 bg-ivory/[0.05] px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-burgundy-light hover:text-burgundy-light sm:w-auto"
                >
                  <IconMessage className="h-4 w-4" />
                  WhatsApp Direct
                </a>
                <a
                  href="mailto:info@akhominteriors.com"
                  className="text-[12px] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-ivory pl-2"
                >
                  info@akhominteriors.com
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

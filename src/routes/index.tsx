import { createFileRoute, Link } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/akhom/icons";

import { Nav } from "@/components/akhom/Nav";
import { Hero } from "@/components/akhom/Hero";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { Glimpses } from "@/components/akhom/Glimpses";
import { Parallax, Reveal } from "@/components/akhom/ui";

import residential from "@/assets/residential.jpg";
import corporate from "@/assets/corporate.jpg";
import craft from "@/assets/craft.jpg";
import material from "@/assets/material.jpg";

const TITLE = "AKHOM Interiors — Timeless Designs, Thoughtful Spaces";
const DESCRIPTION =
  "Premium residential and commercial interior design in Hyderabad. Design, detail, custom craft and turnkey execution by one accountable team.";

const FACTS = [
  { k: "2016", v: "Studio founded in Hyderabad" },
  { k: "120+", v: "Homes and workplaces delivered" },
  { k: "In-house", v: "Joinery and custom craft" },
  { k: "One team", v: "Drawing to handover" },
] as const;

const SEGMENTS = [
  {
    img: residential,
    alt: "Warm residential living room with stone, timber and evening light",
    label: "Residential",
    title: "Homes that age well",
    body: "Villas, apartments and farmhouses in Banjara Hills, Jubilee Hills and Kokapet — planned around how you actually live.",
    to: "/residential",
  },
  {
    img: corporate,
    alt: "Corporate reception with fluted timber walls and a stone desk",
    label: "Corporate",
    title: "Workplaces with presence",
    body: "Offices, showrooms and experience centres delivered on a schedule, with MEP and civil work coordinated in-house.",
    to: "/corporate",
  },
] as const;

const EXPLORE = [
  { n: "01", to: "/projects", t: "Selected work", d: "Finished rooms, photographed as built." },
  { n: "02", to: "/services", t: "Services", d: "Design, detail, craft, execution." },
  { n: "03", to: "/process", t: "Our process", d: "A schedule, not an estimate." },
  { n: "04", to: "/about", t: "The studio", d: "How we decide a room." },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
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
        <Hero />

        {/* Studio statement */}
        <section className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-x-10">
            <div className="md:col-span-7">
              <Reveal>
                <p className="eyebrow text-ink/50">Hyderabad — since 2016</p>
                <h2
                  className="display mt-5 max-w-[16ch] text-ink"
                  style={{ fontSize: "clamp(32px, 4.6vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
                >
                  Timeless designs.
                  <br />
                  <em className="font-light italic">Thoughtful spaces.</em>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={1}>
                <p className="max-w-[46ch] text-base font-light leading-relaxed text-ink/75">
                  We design and build a small number of homes and workplaces each year — stone,
                  timber and light, detailed properly, executed by the same team that drew them.
                </p>
                <Link
                  to="/about"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-ink/30 pb-1 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-ink"
                >
                  About the studio
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Facts strip */}
          <div className="mx-auto mt-14 max-w-[1500px] border-t border-ink/12 md:mt-20">
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {FACTS.map((f, i) => (
                <Reveal
                  key={f.k}
                  delay={Math.min(i, 3)}
                  className="border-b border-ink/12 px-0 py-6 md:border-b-0 md:py-8 md:pr-8"
                >
                  <dt className="font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">{f.k}</dt>
                  <dd className="mt-2 max-w-[22ch] text-[11px] uppercase tracking-[0.16em] text-ink/55">{f.v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Residential / Corporate panels */}
        <section className="bg-ivory px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.label} delay={i}>
                <Link to={s.to} className="group block">
                  <Parallax className="aspect-[4/5] w-full overflow-hidden bg-stone/40 md:aspect-[4/4.6]" speed={-24} scale={1.12}>
                    <img
                      src={s.img}
                      alt={s.alt}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </Parallax>
                  <div className="mt-5 flex items-start justify-between gap-6 border-t border-ink/12 pt-4">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-bronze">{s.label}</p>
                      <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-ink md:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-[42ch] text-sm font-light leading-relaxed text-ink/70">{s.body}</p>
                    </div>
                    <IconArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-ink/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bronze"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Glimpses />

        {/* Custom craft band */}
        <section className="relative overflow-hidden bg-ink text-ivory">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Parallax className="aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]" speed={-26} scale={1.12}>
              <img
                src={craft}
                alt="Craftsman hand-finishing a bronze detail on bespoke joinery"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Parallax>
            <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-16">
              <Reveal>
                <p className="eyebrow text-ivory/45">Custom craft</p>
                <h2
                  className="display mt-5 max-w-[16ch] text-ivory"
                  style={{ fontSize: "clamp(30px, 3.8vw, 56px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  Made for the room, <em className="font-light italic">not the catalogue.</em>
                </h2>
                <p className="mt-6 max-w-[46ch] text-sm font-light leading-relaxed text-ivory/70 md:text-[15px]">
                  Wardrobes, panelling, tables and vanities drawn to the millimetre and built in our
                  own workshop — the same hands that measure the wall finish the edge.
                </p>
                <Link
                  to="/services"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-ivory/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-ivory"
                >
                  Explore services
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Explore index */}
        <section className="bg-ink px-6 pb-20 pt-16 text-ivory md:px-10 md:pb-28 md:pt-24 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="eyebrow text-ivory/45">Explore</p>
            </Reveal>
            <div className="mt-8 border-t border-ivory/15 md:mt-10">
              {EXPLORE.map((e, i) => (
                <Reveal key={e.to} delay={Math.min(i, 3)}>
                  <Link
                    to={e.to}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ivory/15 py-5 transition-colors duration-300 hover:bg-ivory/[0.05] md:flex md:items-baseline md:justify-between md:py-7"
                  >
                    <span className="flex min-w-0 items-baseline gap-4 md:gap-10">
                      <span className="text-[10px] tracking-[0.2em] text-bronze">{e.n}</span>
                      <span className="truncate font-serif text-2xl font-light tracking-tight md:text-4xl">{e.t}</span>
                    </span>
                    <span className="flex items-baseline gap-6">
                      <span className="hidden text-sm font-light text-ivory/60 md:inline">{e.d}</span>
                      <IconArrowRight
                        className="h-4 w-4 shrink-0 self-center text-ivory/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bronze"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative isolate overflow-hidden">
          <img
            src={material}
            alt="Ivory travertine meeting dark walnut joinery in raking light"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />
          <div className="mx-auto max-w-[1500px] px-6 py-20 text-ivory md:px-10 md:py-28 lg:px-14">
            <Reveal>
              <p className="eyebrow text-ivory/50">Begin</p>
              <h2
                className="display mt-5 max-w-[18ch] text-ivory"
                style={{
                  fontSize: "clamp(32px, 4.4vw, 64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  textShadow: "0 2px 30px rgba(11,11,11,0.6)",
                }}
              >
                Tell us about the space. <em className="font-light italic">We'll tell you the truth.</em>
              </h2>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Link
                  to="/contact"
                  className="group inline-flex w-full items-center justify-center gap-3 bg-ivory px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-stone sm:w-auto"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:hello@akhom.in"
                  className="text-[10px] uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-ivory"
                >
                  hello@akhom.in
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

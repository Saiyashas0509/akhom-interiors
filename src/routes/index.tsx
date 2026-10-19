import { createFileRoute, Link } from "@tanstack/react-router";
import { IconArrowRight, IconChat, IconSofa, IconHandshake, IconReceipt } from "@/components/akhom/icons";

import { Nav } from "@/components/akhom/Nav";
import { HeroSlideshow } from "@/components/akhom/HeroSlideshow";
import { ServiceShowcase } from "@/components/akhom/ServiceShowcase";
import { ProcessScroll } from "@/components/akhom/ProcessScroll";
import { ConsultationForm } from "@/components/akhom/ConsultationForm";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { Reveal } from "@/components/akhom/ui";

const TITLE = "AKHOM INTERIORS — Timeless Designs, Thoughtful Spaces | Hyderabad";
const DESCRIPTION =
  "Interior design and turnkey execution in Hyderabad — homes, offices, modular kitchens, wardrobes, painting, civil, electrical and bathroom services by one accountable team.";

// Home page copy intentionally carries no figures, indices or prices.
const REASONS = [
  { icon: IconChat, t: "Free consultation", d: "Talk to a designer at your site, our studio or on video." },
  { icon: IconSofa, t: "In-house workshop", d: "Wardrobes, kitchens and joinery made to measure by our own craftsmen." },
  { icon: IconHandshake, t: "One accountable team", d: "Design, civil, electrical, painting and finishing under one contract." },
  { icon: IconReceipt, t: "Transparent pricing", d: "Clear, itemised quotes with no hidden surprises." },
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
    <div className="min-h-screen overflow-x-clip bg-ivory">
      <Nav solid />
      <main>
        <HeroSlideshow />

        {/* Reasons — a single glass strip, no imagery. */}
        <section className="glass-stage px-3 pt-6 md:px-6 md:pt-8">
          <div className="glass mx-auto grid max-w-[1400px] grid-cols-1 gap-2 rounded-[32px] p-3 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <Reveal key={r.t} delay={i as 0 | 1 | 2 | 3}>
                <div className="h-full rounded-[24px] p-6 transition-colors duration-300 hover:bg-white/60">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone text-ink">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-serif text-xl text-ink">{r.t}</h2>
                  <p className="mt-2 text-[14px] font-light leading-relaxed text-ink">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <ServiceShowcase />

        <ProcessScroll />

        {/* Estimate band */}
        <section className="glass-stage px-4 py-16 md:px-8 md:py-20">
          <Reveal>
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px]">
              <img
                src="/images/curated/estimate.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-12">
                <div className="glass-dark max-w-[560px] rounded-[28px] p-7 text-ivory md:p-9">
                  <p className="eyebrow text-burgundy-light">Plan your budget</p>
                  <h2 className="display mt-4" style={{ fontSize: "clamp(28px, 3.4vw, 46px)" }}>
                    Know your interior cost before we meet.
                  </h2>
                  <p className="mt-4 text-[15px] font-light leading-relaxed text-ivory/80">
                    Choose your home, package and extra services to get an instant, itemised estimate.
                  </p>
                </div>
                <Link
                  to="/price-calculator"
                  className="group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-4 text-[15px] font-medium text-ink shadow-lift transition-colors hover:bg-white"
                >
                  Get a Free Estimate
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <ConsultationForm />
      </main>
      <SiteFooter />
    </div>
  );
}

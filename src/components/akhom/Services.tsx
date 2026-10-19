import { useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconCheck } from "./icons";
import { SERVICE_GROUPS, servicesByGroup, type Service } from "@/data/services";
import { smoothScrollTo } from "./SmoothScroll";

function ServiceBlock({ s, flip }: { s: Service; flip: boolean }) {
  return (
    <article id={s.slug} className="scroll-mt-28">
      <Reveal>
        <div className={`glass grid grid-cols-1 overflow-hidden rounded-[32px] ${s.image ? "lg:grid-cols-2" : ""}`}>
          {s.image ? (
            <div className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[440px] ${flip ? "lg:order-2" : ""}`}>
              <img
                src={s.image}
                alt={s.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="eyebrow text-ink">{s.group}</p>
            <h3 className="display mt-3 text-ink" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
              {s.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] font-light leading-relaxed text-ink">{s.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone text-ink">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-ivory transition-colors hover:bg-burgundy"
              >
                Book a Free Consultation
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/price-calculator"
                className="inline-flex items-center rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-[14px] text-ink transition-colors hover:bg-white"
              >
                Get an Estimate
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export function Services() {
  const { hash } = useLocation();

  // Dropdown links land on /services#slug — bring that service into view.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace(/^#/, ""));
    if (el) requestAnimationFrame(() => smoothScrollTo(el));
  }, [hash]);

  let n = 0;
  return (
    <section id="services" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Service categories" className="glass sticky top-24 z-30 mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
          {SERVICE_GROUPS.map((g) => (
            <a
              key={g}
              href={`#group-${g.replace(/\W+/g, "-").toLowerCase()}`}
              className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] text-ink transition-colors hover:bg-white hover:opacity-70"
            >
              {g}
            </a>
          ))}
        </nav>

        {SERVICE_GROUPS.map((group) => (
          <div key={group} id={`group-${group.replace(/\W+/g, "-").toLowerCase()}`} className="scroll-mt-40 pt-16">
            <Reveal>
              <h2 className="display text-ink" style={{ fontSize: "clamp(30px, 3.6vw, 50px)" }}>
                {group}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {servicesByGroup(group).map((s) => (
                <ServiceBlock key={s.slug} s={s} flip={n++ % 2 === 1} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

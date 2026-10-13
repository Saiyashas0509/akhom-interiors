import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./ui";

export function PageShell({
  eyebrow,
  title,
  italic,
  intro,
  image,
  imageAlt,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  meta?: readonly string[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory">
      <Nav solid />
      <main>
        <div className="px-4 pt-[84px] md:px-6 md:pt-[96px]">
          <header className="relative isolate flex min-h-[68vh] items-end overflow-hidden rounded-2xl bg-ink text-ivory md:min-h-[78vh]">
            {image ? (
              <>
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
              </>
            ) : null}

            <div className="mx-auto w-full max-w-[1600px] px-6 pb-14 pt-24 md:px-10 md:pb-20 md:pt-32 lg:px-14">
              <Reveal>
                <p className="eyebrow text-burgundy-light">{eyebrow}</p>
                <h1
                  className="display mt-6 max-w-[18ch] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
                  style={{ fontSize: "clamp(40px, 7vw, 104px)", lineHeight: 0.96, letterSpacing: "-0.032em" }}
                >
                  {title}
                  {italic ? (
                    <>
                      <br />
                      <em className="font-normal not-italic text-burgundy-light">{italic}</em>
                    </>
                  ) : null}
                </h1>
                {intro ? (
                  <p className="mt-8 max-w-[58ch] text-sm font-light leading-relaxed text-ivory/80 md:text-base">
                    {intro}
                  </p>
                ) : null}
                {meta?.length ? (
                  <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 pt-6">
                    {meta.map((m) => (
                      <li key={m} className="text-[12px] uppercase tracking-[0.16em] text-ivory/70">
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </div>
          </header>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

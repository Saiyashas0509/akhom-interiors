import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";

const EASE = [0.16, 1, 0.3, 1] as const;

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
    <div className="min-h-screen overflow-x-clip bg-transparent">
      <Nav solid />
      <main>
        <div className="glass-stage px-3 pt-[88px] md:px-6 md:pt-[100px]">
          <header className="relative isolate mx-auto flex min-h-[48vh] max-w-[1600px] items-end overflow-hidden rounded-[32px] bg-stone md:min-h-[58vh]">
            {image ? (
              <>
                <motion.img
                  src={image}
                  alt={imageAlt ?? ""}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1.02 }}
                  transition={{ duration: 2.4, ease: EASE }}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              </>
            ) : null}

            <div className="w-full p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
                className="glass-dark max-w-[640px] rounded-[28px] p-6 text-ivory md:p-8"
              >
                <p className="eyebrow text-burgundy-light">{eyebrow}</p>
                <h1 className="display mt-4" style={{ fontSize: "clamp(30px, 4vw, 56px)" }}>
                  {title}
                  {italic ? (
                    <>
                      {" "}
                      <span className="text-burgundy-light">{italic}</span>
                    </>
                  ) : null}
                </h1>
                {intro ? (
                  <p className="mt-5 max-w-[54ch] text-[15px] font-light leading-relaxed text-ivory/80 md:text-base">
                    {intro}
                  </p>
                ) : null}
                {meta?.length ? (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {meta.map((m) => (
                      <li key={m} className="rounded-full border border-ivory/25 bg-white/10 px-4 py-1.5 text-[13px] text-ivory/85">
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            </div>
          </header>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

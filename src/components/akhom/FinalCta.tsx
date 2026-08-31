import { Link } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconMessage } from "./icons";

export function FinalCta() {
  return (
    <section id="contact" className="bg-ink px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-ivory/45">Start a project</p>
              <h2 className="display mt-6 max-w-[14ch]" style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.94, letterSpacing: "-0.035em" }}>
                Tell us about
                <br />
                your space.
              </h2>
              <p className="mt-8 max-w-[48ch] text-sm font-light leading-relaxed text-ivory/65 md:text-base">
                A villa in Kokapet, an office floor in the Financial District, or a kitchen that stopped
                working for you five years ago. Thirty minutes with our design lead is enough to know
                whether we're the right fit.
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 border border-ivory/30 bg-ivory px-8 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-ink transition-all duration-500 hover:border-bronze hover:bg-stone hover:shadow-[0_0_20px_rgba(154,118,84,0.3)]"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-bronze" />
                </Link>
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border border-ivory/30 bg-ivory/[0.04] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.24em] transition-all duration-500 hover:border-bronze hover:bg-ivory/10 hover:text-ivory"
                >
                  <IconMessage className="h-3.5 w-3.5 text-bronze transition-transform duration-300 group-hover:scale-110" />
                  WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={2}>
              <div className="flex h-full flex-col justify-end gap-10 border-t border-ivory/15 pt-8 md:border-t-0 md:pt-0">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">Studio</p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ivory/70">
                    Akhom Interiors
                    <br />
                    Road No. 12, Banjara Hills
                    <br />
                    Hyderabad, Telangana 500034
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">Hours</p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ivory/70">
                    Monday – Saturday
                    <br />
                    10:00 – 19:00
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">Direct</p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ivory/70">
                    hello@akhom.in
                    <br />
                    +91 90000 00000
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

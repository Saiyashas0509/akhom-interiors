import { Link } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconMessage } from "./icons";

export function FinalCta() {
  return (
    <section id="contact" className="bg-dark px-6 py-24 text-ivory md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-burgundy-light">Start a project</p>
              <h2
                aria-label="Tell us about the space. We'll tell you the truth."
                className="display mt-6 max-w-[18ch]"
                style={{ fontSize: "clamp(34px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Tell us about the space.{" "}
                <br className="hidden sm:block" />
                <em className="font-light italic text-burgundy-light">We'll tell you the truth.</em>
              </h2>
              <p className="mt-8 max-w-[48ch] text-sm font-light leading-relaxed text-ivory/70 md:text-base">
                A luxury villa, an office floor in the Financial District, a healthcare facility, or bespoke joinery for your home. Thirty minutes with our design lead is enough to know whether we're the right studio for it.
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 border border-burgundy bg-burgundy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-ivory transition-all duration-500 hover:bg-burgundy-hover hover:shadow-[0_0_25px_rgba(125,38,82,0.4)]"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border border-ivory/30 bg-ivory/[0.04] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] transition-all duration-500 hover:border-burgundy-light hover:bg-ivory/10 hover:text-ivory"
                >
                  <IconMessage className="h-4 w-4 text-burgundy-light transition-transform duration-300 group-hover:scale-110" />
                  WhatsApp Direct
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={2}>
              <div className="flex h-full flex-col justify-end gap-10 border-t border-ivory/15 pt-8 md:border-t-0 md:pt-0">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy-light">Studio</p>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-ivory/70">
                    AKHOM INTERIORS
                    <br />
                    Hyderabad, Telangana
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy-light">Hours</p>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-ivory/70">
                    Monday – Saturday
                    <br />
                    10:00 – 19:00
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy-light">Direct Contact</p>
                  <div className="mt-3 space-y-1 text-[14px] font-light leading-relaxed text-ivory/70">
                    <div>
                      <a href="mailto:info@akhominteriors.com" className="transition-colors hover:text-ivory">
                        info@akhominteriors.com
                      </a>
                    </div>
                    <div>
                      <a href="tel:+919177361122" className="transition-colors hover:text-ivory">
                        +91 91773 61122
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

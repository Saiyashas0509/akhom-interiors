import { Link } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconMessage } from "./icons";
import { WHATSAPP_URL, PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact";

export function FinalCta() {
  return (
    <section id="contact" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px]">
          <img
            src="/images/curated/cta.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/25 to-transparent" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-6 p-5 md:grid-cols-12 md:p-12">
            <div className="glass-dark rounded-[30px] p-7 text-ivory md:col-span-7 md:p-10">
              <p className="eyebrow text-burgundy-light">Start a project</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(30px, 3.8vw, 54px)" }}>
                Tell us about your space.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[15px] font-light leading-relaxed text-ivory/80">
                A home, an office floor, a clinic or a single wardrobe — a short conversation with our
                designer is enough to plan the right next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-[14px] font-medium text-ink transition-colors duration-500 hover:bg-white"
                >
                  Book a Consultation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/35 bg-white/10 px-6 py-3.5 text-[14px] text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-white/20"
                >
                  <IconMessage className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="glass-strong self-end rounded-[30px] p-7 text-ink md:col-span-4 md:col-start-9">
              <dl className="space-y-5 text-[14px]">
                <div>
                  <dt className="eyebrow text-ink">Studio</dt>
                  <dd className="mt-2 font-light text-ink">AKHOM Interiors, Hyderabad, Telangana</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink">Hours</dt>
                  <dd className="mt-2 font-light text-ink">Monday – Saturday, 10:00 – 19:00</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink">Reach us</dt>
                  <dd className="mt-2 space-y-1 font-light text-ink">
                    <a href="mailto:info@akhominteriors.com" className="block transition-colors hover:opacity-70">
                      info@akhominteriors.com
                    </a>
                    <a href={`tel:${PHONE_TEL}`} className="block transition-colors hover:opacity-70">
                      {PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

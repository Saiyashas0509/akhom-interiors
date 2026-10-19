import { IconArrowRight, IconCheck } from "./icons";
import { Reveal } from "./ui";
import { TIERS, type TierId } from "./PriceCalculator";

/** The three AKHOM packages, always visible; choosing one pre-selects it in the calculator. */
export function Packages({ selected, onChoose }: { selected: TierId; onChoose: (t: TierId) => void }) {
  return (
    <section id="packages" className="mx-auto mb-10 max-w-[1100px] scroll-mt-28 px-4 sm:px-6">
      <Reveal>
        <div className="text-center">
          <p className="eyebrow text-ink">Our packages</p>
          <h2 className="display mt-3 text-ink" style={{ fontSize: "clamp(28px, 3.4vw, 46px)" }}>
            Silver, Gold or Platinum.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] font-light text-ink">
            Every package uses branded materials and our in-house joinery. Pick one to start your estimate.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {TIERS.map((t, i) => {
          const on = selected === t.id;
          return (
            <Reveal key={t.id} delay={i}>
              <div
                className={`relative flex h-full flex-col rounded-[28px] p-6 transition-all duration-500 ${
                  on ? "glass-strong ring-1 ring-ink/40" : "glass"
                }`}
              >
                {"popular" in t && t.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory">
                    Most popular
                  </span>
                )}
                <span className="eyebrow text-ink">{t.badge}</span>
                <h3 className="mt-3 font-serif text-2xl text-ink">{t.name}</h3>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-ink">{t.tagline}</p>
                <ul className="mt-4 flex-1 space-y-2 border-t border-ink/10 pt-4">
                  {t.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[14px] text-ink">
                      <IconCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-ink" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-serif text-xl text-ink">
                  ₹{t.rate[0].toLocaleString("en-IN")} – ₹{t.rate[1].toLocaleString("en-IN")}
                  <span className="font-sans text-[13px]"> / sq.ft</span>
                </p>
                <button
                  type="button"
                  onClick={() => onChoose(t.id)}
                  className={`group mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] transition-colors duration-500 ${
                    on ? "bg-ink text-ivory hover:bg-burgundy" : "border border-ink/15 bg-white/70 text-ink hover:bg-white"
                  }`}
                >
                  {on ? "Selected — get estimate" : `Choose ${t.name.replace("AKHOM ", "")}`}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

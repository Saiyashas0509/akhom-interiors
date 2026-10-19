import { Parallax, Reveal } from "./ui";

const CRAFTS = ["Bespoke furniture", "Cabinetry & storage", "Doors & panelling", "Pooja units"] as const;

export function CustomCraft() {
  return (
    <section className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px]">
        <Parallax className="absolute inset-0" speed={-50} scale={1.16}>
          <img
            src="/images/curated/craft.jpg"
            alt="Pooja unit with lit oak shelves and brass lamps, made in the AKHOM workshop"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/15 to-transparent" aria-hidden="true" />

        <div className="relative p-5 py-24 md:p-12 md:py-32">
          <Reveal>
            <div className="glass-dark max-w-[600px] rounded-[30px] p-7 text-ivory md:p-10">
              <p className="eyebrow text-burgundy-light">Custom craft</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(30px, 4vw, 56px)" }}>
                If it can't be bought, we'll make it.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[15px] font-light leading-relaxed text-ivory/80">
                A dining table sized to your family. A wardrobe wall that disappears into the panelling.
                Doors, partitions and pooja units — drawn for your space and built in our own workshop.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {CRAFTS.map((t) => (
                  <li key={t} className="rounded-full border border-ivory/25 bg-white/10 px-4 py-1.5 text-[13px] text-ivory/85">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

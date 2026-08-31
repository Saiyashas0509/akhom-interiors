import { Parallax, Reveal } from "./ui";
import craftImg from "@/assets/craft.jpg";

export function CustomCraft() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <Parallax className="h-full w-full" speed={-70} scale={1.18}>
          <img
            src={craftImg}
            alt="Craftsman's hands fitting a walnut dovetail joint in the Akhom workshop"
            className="h-full w-full object-cover opacity-45"
            loading="lazy"
            decoding="async"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" />
      </div>


      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-44 lg:px-14">
        <div className="max-w-[640px]">
          <Reveal>
            <p className="eyebrow text-ivory/50">Custom Craft</p>
            <h2
              className="display mt-6"
              style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
            >
              If it can't be bought,
              <br />
              we'll make it.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-8 max-w-[52ch] text-sm font-light leading-relaxed text-ivory/70 md:text-base">
              A dining table sized to your family's Sundays. A wardrobe wall that disappears into the
              panelling. Doors, partitions, stair balustrades, reception desks — drawn for your space
              and built in our workshop, to the millimetre.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-y-6 border-t border-ivory/15 pt-8 sm:grid-cols-4">
              {["Bespoke furniture", "Cabinetry & storage", "Doors & panelling", "Joinery & partitions"].map(
                (t) => (
                  <p key={t} className="pr-4 text-[10px] uppercase tracking-[0.18em] text-ivory/55">
                    {t}
                  </p>
                )
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

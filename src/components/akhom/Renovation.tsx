import { Link } from "@tanstack/react-router";
import { Reveal, Parallax } from "./ui";
import { IconArrowRight, IconBrush } from "./icons";
import renovationImg from "@/assets/renovation.jpg";

export function Renovation() {
  return (
    <section className="bg-stone/30 px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-2 text-burgundy">
                <IconBrush className="h-4 w-4" />
                <p className="eyebrow text-burgundy">Renovation & Remodelling</p>
              </div>
              <h2
                className="display mt-4 max-w-[16ch] text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 64px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Transforming spaces <em className="font-light italic text-burgundy">without compromise.</em>
              </h2>
              <p className="mt-6 max-w-[48ch] text-[14px] font-light leading-relaxed text-ink/80 md:text-base">
                Whether revamping an existing villa, upgrading luxury bathrooms and kitchens, or reconfiguring a corporate floor plate, our renovation team executes with meticulous dust control, phased scheduling, and in-house joinery craftsmanship.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-l-2 border-burgundy pl-4">
                  <h4 className="font-serif text-lg font-medium text-ink">Full-Home Transformations</h4>
                  <p className="mt-1 text-xs text-ink/70">Complete strip-out to bespoke luxury handover.</p>
                </div>
                <div className="border-l-2 border-burgundy pl-4">
                  <h4 className="font-serif text-lg font-medium text-ink">Modular Kitchens & Bath Suites</h4>
                  <p className="mt-1 text-xs text-ink/70">Custom stone surfaces and concealed MEP systems.</p>
                </div>
                <div className="border-l-2 border-burgundy pl-4">
                  <h4 className="font-serif text-lg font-medium text-ink">Spatial Reconfiguration</h4>
                  <p className="mt-1 text-xs text-ink/70">Optimising walls, partitions, and daylight flow.</p>
                </div>
                <div className="border-l-2 border-burgundy pl-4">
                  <h4 className="font-serif text-lg font-medium text-ink">In-House Joinery Replacement</h4>
                  <p className="mt-1 text-xs text-ink/70">New wardrobes and custom wall panelling.</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-burgundy px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
                >
                  Discuss Your Renovation
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="text-[12px] uppercase tracking-[0.18em] text-ink/75 hover:text-burgundy transition-colors"
                >
                  Explore Renovation Services →
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={1}>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/10 shadow-lg">
                <Parallax speed={-20} scale={1.1}>
                  <img
                    src={renovationImg}
                    alt="Precision renovation details showing honed natural travertine and dark walnut joinery"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </Parallax>
                <div className="absolute bottom-4 left-4 border border-ivory/20 bg-dark/85 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
                  Precision Restoration & Finishes
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

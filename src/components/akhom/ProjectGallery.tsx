import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, LightboxModal } from "./ui";
import { IconArrowRight, IconMaximize, IconCheck, IconMessage } from "./icons";
import allGallery from "@/data/gallery.json";
import { WHATSAPP_URL } from "@/lib/contact";

// Photos with site clutter (bottles, cloth, boxes, cables, tools), work-in-progress or collages
// are kept out of the public gallery.
const HIDDEN = new Set([
  "003", "004", "007", "020", "021", "022", "023", "024", "025", "026", "028", "029", "030", "031", "032",
  "033", "034", "035", "036", "037", "038", "040", "041", "042", "043", "044", "045", "047", "048", "049",
  "051", "052", "053", "054", "055", "056", "057", "058", "059", "063", "064", "065", "066", "067", "068",
  "069", "070", "071", "081", "082", "102", "105", "113", "121", "123",
]);
const galleryData = allGallery.filter((i) => !HIDDEN.has(i.src.match(/gallery_(\d+)/)?.[1] ?? ""));

// Tab labels for the categories present in gallery.json; empty categories are not shown.
const LABELS: Record<string, string> = {
  villas: "Homes",
  commercial: "Commercial",
  ceilings: "Ceilings & Lighting",
  puja: "Pooja Units",
  archives: "More Interiors",
};
const labelFor = (key: string) => LABELS[key] ?? "Interiors";

const CATEGORIES = [
  { id: "all", label: "All Works" },
  ...Object.keys(LABELS)
    .filter((key) => galleryData.some((i) => i.categoryKey === key))
    .map((key) => ({ id: key, label: labelFor(key) })),
];

export function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return galleryData;
    return galleryData.filter((item) => item.categoryKey === activeTab);
  }, [activeTab]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const activeImage = lightboxIndex !== null ? displayedItems[lightboxIndex] : null;

  const handleTabChange = (catId: string) => {
    setActiveTab(catId);
    setVisibleCount(24);
  };

  return (
    <section className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Gallery Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ink">Project gallery</p>
            <h2
              className="display mt-4 text-ink"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Real homes. Real handovers.
            </h2>
            <p className="mt-4 max-w-[60ch] text-[15px] font-light leading-relaxed text-ink">
              Photographs from finished AKHOM projects across Hyderabad — kitchens, wardrobes, ceilings, pooja units and complete homes.
            </p>
          </div>

        </div>

        {/* Category Pill Filters */}
        <div className="glass mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
          {CATEGORIES.map((cat) => {
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] transition-all duration-500 ${
                  active ? "bg-ink text-ivory shadow-soft" : "text-ink hover:bg-white/70 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-pointer overflow-hidden rounded-[26px] bg-stone shadow-soft transition-shadow duration-700 hover:shadow-lift"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <motion.img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay with maximize icon */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/55 via-transparent to-transparent p-4 text-ivory opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <span className="glass-dark rounded-full px-3.5 py-1.5 text-[13px]">{labelFor(item.categoryKey)}</span>
                    <div className="glass-dark rounded-full p-2.5">
                      <IconMaximize className="h-4 w-4 text-ivory" />
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] text-ink transition-colors duration-500 hover:bg-white"
            >
              Show more photographs
            </button>
          </div>
        )}

        {/* WhatsApp Inquiry Banner */}
        <div className="glass mt-20 flex flex-col items-start justify-between gap-6 rounded-[32px] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="eyebrow text-ink">Looking for a specific layout?</p>
            <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
              Ask for lookbooks and site walkthroughs
            </h3>
            <p className="mt-2 max-w-xl text-[15px] font-light text-ink">
              We share confidential CAD drawings, 3D renders, and complete client portfolios upon request.
            </p>
          </div>
          <a
            href={`${WHATSAPP_URL}?text=Hi%20AKHOM%2C%20I%20reviewed%20your%20project%20gallery.%20I%27d%20like%20to%20request%20the%20complete%20portfolio%20and%20case%20studies.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] text-ivory transition-colors duration-500 hover:bg-burgundy"
          >
            <IconMessage className="h-4 w-4" />
            Talk to a designer
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <LightboxModal
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          imageSrc={activeImage.src}
          title={labelFor(activeImage.categoryKey)}
          subtitle="AKHOM project"
          description="Designed and executed by AKHOM Interiors, Hyderabad."
        />
      )}
    </section>
  );
}

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, LightboxModal } from "./ui";
import { IconArrowRight, IconMaximize, IconCheck, IconMessage } from "./icons";
import galleryData from "@/data/gallery.json";

// Segregated categories based on client's actual folder structures
const CATEGORIES = [
  { id: "all", label: "All Works", count: galleryData.length },
  { id: "villas", label: "Villas & Penthouses", count: galleryData.filter((i) => i.categoryKey === "villas").length },
  { id: "hd-folios", label: "Architectural Folios", count: galleryData.filter((i) => i.categoryKey === "hd-folios").length },
  { id: "signature", label: "Signature Living & Work", count: galleryData.filter((i) => i.categoryKey === "signature").length },
  { id: "rp-provencia", label: "RP Provencia Estate", count: galleryData.filter((i) => i.categoryKey === "rp-provencia").length },
  { id: "puja", label: "Pooja Mandirs & Craft", count: galleryData.filter((i) => i.categoryKey === "puja").length },
  { id: "ceilings", label: "False Ceilings & Lighting", count: galleryData.filter((i) => i.categoryKey === "ceilings").length },
  { id: "turnkey", label: "Turnkey Execution", count: galleryData.filter((i) => i.categoryKey === "turnkey").length },
  { id: "highlights", label: "Interior Highlights", count: galleryData.filter((i) => i.categoryKey === "highlights").length },
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
    <section className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/15 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-burgundy font-semibold">
              Complete Portfolio Gallery ({galleryData.length} Real Project Photographs)
            </span>
            <h2
              className="mt-3 font-serif text-3xl font-light text-ink md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Curated Architectural Archives
            </h2>
            <p className="mt-3 max-w-[65ch] text-sm md:text-base font-light text-ink/75">
              Explore all verified project shoots, bespoke villa joinery, custom teak mandirs, luxury ceilings, and turnkey corporate environments across Hyderabad.
            </p>
          </div>

          <div className="text-sm font-mono text-ink/60">
            Showing <strong className="text-burgundy font-bold">{displayedItems.length}</strong> of {filteredItems.length} photos
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="mt-8 flex flex-wrap gap-2.5 pb-2">
          {CATEGORIES.map((cat) => {
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "bg-burgundy text-white shadow-md ring-2 ring-burgundy/20"
                    : "border border-ink/15 bg-white text-ink/75 hover:border-burgundy/50 hover:bg-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                    active ? "bg-white/20 text-white" : "bg-ink/5 text-ink/60"
                  }`}
                >
                  {cat.count}
                </span>
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
                transition={{ duration: 0.35 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <motion.img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay with maximize icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                        {item.categoryName}
                      </span>
                      <h4 className="font-serif text-lg font-light text-white leading-snug mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                    <div className="rounded-full bg-white/20 p-2 backdrop-blur-md">
                      <IconMaximize className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Sub caption bar */}
                <div className="p-4 border-t border-ink/5 flex items-center justify-between text-xs">
                  <span className="truncate font-medium text-ink/80 text-[12px]">{item.title}</span>
                  <span className="text-[10px] font-mono text-burgundy uppercase tracking-wider shrink-0 ml-2">
                    {item.categoryName}
                  </span>
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
              className="inline-flex items-center gap-3 rounded-full border-2 border-burgundy bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-burgundy hover:bg-burgundy hover:text-white transition-all shadow-sm"
            >
              Load More Photographs ({filteredItems.length - visibleCount} remaining) ↓
            </button>
          </div>
        )}

        {/* WhatsApp Inquiry Banner */}
        <div className="mt-20 rounded-3xl border-2 border-burgundy/20 bg-gradient-to-r from-burgundy/[0.04] via-amber-50/50 to-burgundy/[0.04] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-burgundy font-bold">
              Looking for a specific layout or floor plan?
            </span>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl font-light text-ink">
              Request High-Resolution PDF Lookbooks & Site Walkthroughs
            </h3>
            <p className="mt-2 text-xs md:text-sm text-ink/75 max-w-xl">
              We share confidential CAD drawings, 3D renders, and complete client portfolios upon request.
            </p>
          </div>
          <a
            href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%20reviewed%20your%20project%20gallery.%20I%27d%20like%20to%20request%20the%20complete%20portfolio%20and%20case%20studies."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-3 rounded-xl bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-burgundy-hover shadow-md transition-all"
          >
            <IconMessage className="h-4 w-4" />
            Connect with an Architect
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <LightboxModal
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          imageSrc={activeImage.src}
          title={activeImage.title}
          subtitle={activeImage.categoryName}
          description={`High-definition architectural photograph from ${activeImage.categoryName} archive. Turnkey interior execution and custom joinery by AKHOM INTERIORS.`}
        />
      )}
    </section>
  );
}

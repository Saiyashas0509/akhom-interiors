import { createFileRoute } from "@tanstack/react-router";
import { EstimateSection } from "@/components/akhom/EstimateSection";
import { Nav } from "@/components/akhom/Nav";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { motion } from "framer-motion";

const TITLE = "Interior Price Calculator — AKHOM Interiors Hyderabad";
const DESCRIPTION = "Get an instant interior estimate in Hyderabad — choose your home, AKHOM Silver, Gold or Platinum package and extra site services.";

export const Route = createFileRoute("/price-calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/price-calculator" },
    ],
  }),
  component: PriceCalculatorPage,
});

function PriceCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-transparent text-ink">
      <Nav solid />

      <main className="glass-stage flex-1 pt-24 md:pt-28">
        <div className="mx-auto mb-10 max-w-[1100px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[36px]">
            <motion.img
              src="/images/curated/page-price.jpg"
              alt="Study corner with blush cabinetry, lit niche and floating desk"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
            <div className="relative p-5 pt-40 sm:p-8 sm:pt-48">
              <div className="glass-dark max-w-xl rounded-[28px] p-6 text-ivory sm:p-8">
                <p className="eyebrow text-burgundy-light">Free interior estimate</p>
                <h1 className="display mt-3" style={{ fontSize: "clamp(30px, 4.4vw, 56px)" }}>
                  Plan your budget in minutes.
                </h1>
                <p className="mt-3 text-[15px] font-light text-ivory/80">
                  Pick your home, package and extra services for an instant, itemised estimate.
                </p>
              </div>
            </div>
          </div>
        </div>

        <EstimateSection />
      </main>

      <SiteFooter />
    </div>
  );
}

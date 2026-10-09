import { createFileRoute } from "@tanstack/react-router";
import { PriceCalculator } from "@/components/akhom/PriceCalculator";
import { Nav } from "@/components/akhom/Nav";
import { SiteFooter } from "@/components/akhom/SiteFooter";
import { motion } from "framer-motion";

const TITLE = "Interior Price Calculator — AKHOM Interiors Hyderabad";
const DESCRIPTION = "Estimate your interior design cost based on property type, area, materials and scope. Transparent turnkey pricing by AKHOM INTERIORS.";

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
    <div className="min-h-screen bg-ivory text-ink flex flex-col justify-between">
      <Nav solid={true} />

      <main className="pt-28 pb-20">
        {/* Hero banner */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-12">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl border border-ink/10 aspect-[16/7] max-h-[380px] w-full bg-slate-900">
            <motion.img
              src="/assets/price/hero.jpg"
              alt="AKHOM Interior Architecture Design Estimate"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent flex items-end p-8 sm:p-12">
              <div className="text-white max-w-xl">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300">
                  Turnkey Budgeting
                </span>
                <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
                  Transparent Interior Estimates.
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-white/80 font-light">
                  Line-by-line pricing with zero hidden surcharges. Calculate your project cost below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Bright Calculator */}
        <PriceCalculator />
      </main>

      <SiteFooter />
    </div>
  );
}

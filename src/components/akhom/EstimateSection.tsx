import { useState } from "react";
import { PriceCalculator, type TierId } from "./PriceCalculator";
import { Packages } from "./Packages";
import { smoothScrollTo } from "./SmoothScroll";

/** Packages + step-by-step estimator, shared by the Contact and Price Calculator pages. */
export function EstimateSection() {
  const [tier, setTier] = useState<TierId>("gold");

  const choosePackage = (t: TierId) => {
    setTier(t);
    const el = document.getElementById("estimator");
    if (el) smoothScrollTo(el);
  };

  return (
    <section id="price-calculator" className="glass-stage scroll-mt-28 py-16 md:py-24">
      <Packages selected={tier} onChoose={choosePackage} />
      <div id="estimator" className="scroll-mt-28">
        <PriceCalculator tier={tier} onTierChange={setTier} />
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
  IconMessage,
  IconCheck,
  IconSparkles,
  IconApartment,
  IconHome,
  IconVilla,
  IconEstate,
  IconOffice,
  IconLock,
} from "./icons";

// Pricing Configuration per Sq Ft (INR)
const CONFIG = {
  types: [
    { id: "1bhk", label: "1 BHK", sub: "Compact Apartment", minSqft: 500, defaultSqft: 650, iconComponent: IconApartment },
    { id: "2bhk", label: "2 BHK", sub: "Standard Apartment", minSqft: 850, defaultSqft: 1100, iconComponent: IconHome },
    { id: "3bhk", label: "3 BHK", sub: "Spacious Residence", minSqft: 1300, defaultSqft: 1650, iconComponent: IconVilla },
    { id: "4bhk", label: "4+ BHK / Penthouse", sub: "Luxury Living", minSqft: 2000, defaultSqft: 2500, iconComponent: IconEstate },
    { id: "villa", label: "Villa / Independent", sub: "Full Scale Estate", minSqft: 2800, defaultSqft: 3600, iconComponent: IconEstate },
    { id: "office", label: "Commercial Office", sub: "Corporate Workspace", minSqft: 1000, defaultSqft: 2000, iconComponent: IconOffice },
  ],
  scopes: [
    {
      id: "full",
      label: "Full Turnkey Interiors",
      desc: "Civil, custom modular joinery, false ceiling, architectural MEP, electrical & bespoke finishes",
      multiplier: 1.0,
      badge: "Complete Handover",
    },
    {
      id: "woodwork",
      label: "Woodwork & Kitchen Only",
      desc: "Modular kitchen, wardrobes, TV units, storage cabinetry & custom workshop joinery",
      multiplier: 0.65,
      badge: "Core Joinery",
    },
    {
      id: "renovation",
      label: "Renovation & Remodel",
      desc: "Selective structural remodelling, replanning layouts & upgraded premium finishes",
      multiplier: 0.8,
      badge: "Transformation",
    },
  ],
  tiers: [
    {
      id: "essential",
      name: "Essential Elegance",
      rateRange: [1350, 1750],
      badge: "Classic Value",
      tagline: "Quality BWR plywood, premium laminate finishes, durable branded hardware",
      includes: [
        "Marine/BWR Grade Plywood core",
        "0.8mm–1.0mm Anti-scratch textured laminates",
        "Soft-close Hettich / Hafele architectural hinges",
        "Basic ambient LED warm lighting & cove provisions",
      ],
    },
    {
      id: "premium",
      name: "AKHOM Signature",
      rateRange: [1850, 2450],
      popular: true,
      badge: "Most Selected",
      tagline: "Handcrafted natural veneers, fluted acoustic panels, quartz surfaces, full designer ceiling",
      includes: [
        "Boiling Waterproof (BWP) Marine Core",
        "Natural American Walnut / Oak Veneers",
        "Fluted architectural timber accents",
        "Full false ceiling with magnetic architectural track lights",
        "In-house workshop custom joinery & precision fit",
      ],
    },
    {
      id: "luxury",
      name: "Haute Bespoke",
      rateRange: [2600, 3600],
      badge: "Ultra Luxury",
      tagline: "Honed Italian travertine, bespoke PU metallics, motorized servo hardware & solid teak craft",
      includes: [
        "Italian Marble & Honed Travertine wall cladding",
        "Imported PU lacquer & metallic brush finishes",
        "Blum motorized servo-drive touch fittings",
        "Hand-carved solid Teak mandir & sacred joinery",
        "Full MEP, smart home automation & acoustic planning",
      ],
    },
  ],
};

export function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("3bhk");
  const [sqft, setSqft] = useState(1650);
  const [scope, setScope] = useState("full");
  const [tier, setTier] = useState("premium");
  const [location, setLocation] = useState("Hyderabad (Gachibowli / Kokapet / Financial District)");
  const [startDate, setStartDate] = useState("Immediately (within 30 days)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedTypeObj = (CONFIG.types.find((t) => t.id === projectType) ?? CONFIG.types[2])!;
  const selectedScopeObj = (CONFIG.scopes.find((s) => s.id === scope) ?? CONFIG.scopes[0])!;
  const selectedTierObj = (CONFIG.tiers.find((t) => t.id === tier) ?? CONFIG.tiers[1])!;

  // Calculation logic
  const minRate = (selectedTierObj.rateRange[0] ?? 2400) * selectedScopeObj.multiplier;
  const maxRate = (selectedTierObj.rateRange[1] ?? 3600) * selectedScopeObj.multiplier;
  const lowEst = Math.round((sqft * minRate) / 1000) * 1000;
  const highEst = Math.round((sqft * maxRate) / 1000) * 1000;

  const formatLakhs = (amt: number) => {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`;
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lakhs`;
    return `₹${amt.toLocaleString("en-IN")}`;
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelectType = (t: (typeof CONFIG.types)[0]) => {
    setProjectType(t.id);
    setSqft(t.defaultSqft);
    setStep(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      {/* Radiant Bright Card Wrapper */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-amber-50/20 to-white p-6 sm:p-10 md:p-14 shadow-[0_25px_70px_-15px_rgba(128,0,32,0.12)] border-2 border-burgundy/15">
        
        {/* Subtle decorative glowing background blurs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-burgundy/10 blur-3xl" />

        {/* Header */}
        <div className="relative z-10 mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-burgundy/25 bg-burgundy/5 px-4 py-1.5 shadow-sm">
            <IconSparkles className="h-4 w-4 text-burgundy" />
            <span className="text-[12px] font-mono uppercase tracking-[0.22em] text-burgundy font-semibold">
              Instant Architectural Price Estimator
            </span>
          </div>

          <h2
            className="mt-4 font-serif text-3xl font-normal text-slate-900 md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Estimate Your Interior Investment
          </h2>
          <p className="mx-auto mt-3 max-w-[62ch] text-sm md:text-base font-normal text-slate-600">
            Real-time, transparent calculation based on verified Hyderabad turnkey execution rates. Compare finishes and budget instantly.
          </p>

          {/* Stepper & Progress */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-medium">
              <span className="text-burgundy font-bold">
                {submitted ? "Estimate Unlocked" : `Step ${step} of 5`}
              </span>
              <span>{submitted ? "Completed" : ["Property Type", "Area & Scope", "Material Tier", "Timeline", "Your Estimate"][step - 1]}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-burgundy via-amber-700 to-burgundy shadow-sm"
                initial={{ width: "20%" }}
                animate={{ width: submitted ? "100%" : `${(step / 5) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="relative z-10 rounded-3xl bg-white p-6 sm:p-10 shadow-lg border border-slate-100">
          <AnimatePresence mode="wait">
            {/* STEP 1: Property Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-normal text-slate-900 md:text-3xl">
                    1. What type of space are you designing?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Select your layout to load standard floor plan benchmarks
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 pt-2">
                  {CONFIG.types.map((t) => {
                    const active = projectType === t.id;
                    const IconComp = t.iconComponent;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectType(t)}
                        className={`group relative flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                          active
                            ? "border-burgundy bg-gradient-to-br from-burgundy/[0.04] to-amber-50/40 shadow-md ring-2 ring-burgundy/20"
                            : "border-slate-200 bg-white hover:border-burgundy/50 hover:shadow-md hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className={`p-2.5 rounded-xl border transition-colors ${active ? "border-burgundy bg-burgundy/10 text-burgundy" : "border-slate-200 bg-slate-50 text-slate-700 group-hover:border-burgundy/40 group-hover:text-burgundy"}`}>
                            <IconComp className="h-6 w-6" />
                          </div>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-mono font-medium text-slate-600 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
                            {t.sub}
                          </span>
                        </div>
                        <h4 className="mt-4 font-serif text-2xl font-normal text-slate-900 group-hover:text-burgundy transition-colors">
                          {t.label}
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                          Average scale: <strong className="text-slate-700">{t.defaultSqft} sq.ft</strong>
                        </p>
                        <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-burgundy">
                          <span>Select Plan</span>
                          <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Area & Scope */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-normal text-slate-900 md:text-3xl">
                    2. Adjust Floor Area & Scope of Work
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Fine-tune carpet / super built-up square footage
                  </p>
                </div>

                {/* Bright Slider Box */}
                <div className="mx-auto max-w-xl space-y-4 rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/40 to-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <label htmlFor="sqft-range" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      Total Floor Area
                    </label>
                    <div className="rounded-xl border border-burgundy/30 bg-white px-4 py-1.5 shadow-sm">
                      <span className="font-serif text-3xl font-normal text-burgundy">
                        {sqft.toLocaleString()}
                      </span>
                      <span className="ml-1 text-xs font-medium text-slate-500">sq.ft</span>
                    </div>
                  </div>
                  <input
                    id="sqft-range"
                    type="range"
                    min={selectedTypeObj.minSqft}
                    max={selectedTypeObj.minSqft * 3}
                    step={50}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-burgundy"
                  />
                  <div className="flex justify-between text-xs font-mono font-medium text-slate-400">
                    <span>Min: {selectedTypeObj.minSqft} sq.ft</span>
                    <span>Max: {selectedTypeObj.minSqft * 3} sq.ft</span>
                  </div>
                </div>

                {/* Scope selector */}
                <div className="space-y-3">
                  <p className="text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Select Scope of Execution
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {CONFIG.scopes.map((sc) => {
                      const active = scope === sc.id;
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setScope(sc.id)}
                          className={`rounded-2xl border-2 p-5 text-left transition-all ${
                            active
                              ? "border-burgundy bg-gradient-to-br from-burgundy/[0.04] to-amber-50/50 shadow-md ring-2 ring-burgundy/20"
                              : "border-slate-200 bg-white hover:border-burgundy/40 hover:bg-slate-50"
                          }`}
                        >
                          <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                            {sc.badge}
                          </span>
                          <h4 className="font-serif text-xl font-normal text-slate-900">{sc.label}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600">{sc.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-xl bg-burgundy px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-burgundy-hover shadow-md transition-colors"
                  >
                    Select Finish Tier →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Material Tier */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-normal text-slate-900 md:text-3xl">
                    3. Choose Material & Finish Quality
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Transparent rates with factory certifications and architectural guarantees
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {CONFIG.tiers.map((t) => {
                    const active = tier === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setTier(t.id)}
                        className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 p-6 transition-all duration-300 ${
                          active
                            ? "border-burgundy bg-gradient-to-br from-burgundy/[0.04] via-amber-50/40 to-white shadow-xl ring-2 ring-burgundy/20"
                            : "border-slate-200 bg-white hover:border-burgundy/40 hover:shadow-md"
                        }`}
                      >
                        {t.popular && (
                          <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-burgundy px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                            <IconSparkles className="h-3 w-3" />
                            Most Popular
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
                              {t.badge}
                            </span>
                            {active && <span className="text-xs font-bold text-burgundy">Selected</span>}
                          </div>

                          <h4 className="mt-3 font-serif text-2xl font-normal text-slate-900">{t.name}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600">{t.tagline}</p>

                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                              Includes in this tier:
                            </p>
                            <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                              {t.includes.map((inc) => (
                                <li key={inc} className="flex items-start gap-2">
                                  <span className="text-burgundy font-bold">
                                    <IconCheck className="h-3.5 w-3.5 mt-0.5 inline" />
                                  </span>
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4 bg-slate-50/60 -mx-6 -mb-6 p-6 rounded-b-2xl">
                          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            Benchmark Rate:
                          </span>
                          <p className="mt-0.5 font-serif text-2xl font-normal text-burgundy">
                            ₹{t.rateRange[0]} – ₹{t.rateRange[1]}{" "}
                            <span className="text-xs font-sans text-slate-500">/ sq.ft</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-xl bg-burgundy px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-burgundy-hover shadow-md transition-colors"
                  >
                    Next: Timeline →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Timeline & Location */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-normal text-slate-900 md:text-3xl">
                    4. Project Location & Preferred Start
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Ensures site supervision and dedicated turnkey engineer availability
                  </p>
                </div>

                <div className="mx-auto max-w-xl space-y-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Location in Hyderabad
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-sm text-slate-800 outline-none focus:border-burgundy shadow-sm"
                    >
                      <option value="Hyderabad (Gachibowli / Kokapet / Financial District)">
                        Gachibowli, Kokapet, Financial District, Narsingi
                      </option>
                      <option value="Hyderabad (Jubilee Hills / Banjara Hills / Madhapur)">
                        Jubilee Hills, Banjara Hills, Madhapur, Hitec City
                      </option>
                      <option value="Hyderabad (Kondapur / Miyapur / Tellapur)">
                        Kondapur, Miyapur, Tellapur, Kollur
                      </option>
                      <option value="Hyderabad (Secunderabad / Begumpet / Sainikpuri)">
                        Secunderabad, Begumpet, Sainikpuri
                      </option>
                      <option value="Other Area in Hyderabad">Other Area in Hyderabad</option>
                      <option value="Outside Hyderabad (Telangana / Andhra Pradesh)">
                        Outside Hyderabad (Luxury Villa / Farmhouse)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                      When are you planning to begin?
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {[
                        "Immediately (within 30 days)",
                        "In 1 to 3 months",
                        "Planning ahead (3+ months)",
                      ].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStartDate(st)}
                          className={`rounded-xl border-2 p-3.5 text-center text-xs font-medium transition-all ${
                            startDate === st
                              ? "border-burgundy bg-burgundy/5 text-burgundy shadow-sm ring-1 ring-burgundy/30"
                              : "border-slate-200 bg-white text-slate-600 hover:border-burgundy/40"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-xl bg-burgundy px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-burgundy-hover shadow-md transition-colors"
                  >
                    Calculate Estimate →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Unlock Screen */}
            {step === 5 && !submitted && (
              <motion.div
                key="step5-unlock"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Estimate Calculated
                  </span>
                  <h3 className="mt-3 font-serif text-3xl font-normal text-slate-900 md:text-4xl">
                    Where should we share your itemized estimate?
                  </h3>
                  <p className="mx-auto mt-2 max-w-[50ch] text-sm text-slate-600">
                    Enter your contact details to instantly view the calculated investment range and receive an itemized copy on WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="mx-auto max-w-lg space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-sm text-slate-800 outline-none focus:border-burgundy shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-sm text-slate-800 outline-none focus:border-burgundy shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-sm text-slate-800 outline-none focus:border-burgundy shadow-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-burgundy py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-burgundy-hover shadow-lg transition-all"
                    >
                      View Full Estimated Price →
                    </button>
                  </div>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
                    <IconLock className="h-3 w-3 inline text-slate-400" />
                    <span>Zero spam. Handled confidentially for your design and architectural review.</span>
                  </p>
                </form>

                <div className="flex justify-start border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    ← Modify Inputs
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: FINAL RESULT DISPLAY (Bright & Glowing) */}
            {submitted && (
              <motion.div
                key="step5-result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                    <IconCheck className="h-7 w-7" />
                  </div>
                  <h3 className="mt-3 font-serif text-3xl font-normal text-slate-900 md:text-5xl">
                    Your Turnkey Price Estimate
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Prepared for <strong className="text-slate-900">{name}</strong> • {selectedTypeObj.label} ({sqft.toLocaleString()} sq.ft) in {location}
                  </p>
                </div>

                {/* Bright Radiant Price Result Display */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 p-8 sm:p-12 text-center shadow-xl">
                  <div className="inline-block rounded-full bg-burgundy/10 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-burgundy mb-2">
                    Estimated Investment Range
                  </div>

                  <div className="mt-3 font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-burgundy tracking-tight">
                    {formatLakhs(lowEst)} <span className="text-2xl sm:text-4xl text-slate-400 font-sans">–</span> {formatLakhs(highEst)}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-600">
                    Estimated benchmark: ₹{minRate.toFixed(0)} to ₹{maxRate.toFixed(0)} per sq.ft based on <strong>{selectedTierObj.name}</strong>
                  </p>

                  {/* Included / Excluded Breakdown */}
                  <div className="mt-10 grid grid-cols-1 gap-6 border-t-2 border-amber-200/60 pt-8 text-left sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
                      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-burgundy flex items-center gap-1.5">
                        <IconCheck className="h-3.5 w-3.5 text-burgundy" />
                        <span>Included in AKHOM Turnkey Contract</span>
                      </h5>
                      <ul className="mt-3 space-y-2 text-xs text-slate-700">
                        <li>• 100% In-house factory joinery & custom woodwork from Hyderabad workshop</li>
                        <li>• Complete civil, MEP, false ceiling & ambient architectural lighting execution</li>
                        <li>• Locked line-by-line pricing with dedicated site engineer supervision</li>
                        <li>• Comprehensive 10-year hardware & material warranty coverage</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
                      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <span className="font-bold">✕</span>
                        <span>Excluded / Optional Add-Ons</span>
                      </h5>
                      <ul className="mt-3 space-y-2 text-xs text-slate-500">
                        <li>• Standalone loose decor items & soft furnishings</li>
                        <li>• Consumer electronic appliances and televisions</li>
                        <li>• Society / municipal architectural approvals</li>
                        <li>• Statutory GST taxes (18% as applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={`https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%20used%20the%20price%20calculator%20for%20my%20${encodeURIComponent(selectedTypeObj.label)}%20(${sqft}%20sqft)%20in%20${encodeURIComponent(location)}.%20Estimated%20range%3A%20${encodeURIComponent(formatLakhs(lowEst))}%20-%20${encodeURIComponent(formatLakhs(highEst))}.%20I%27d%20like%20to%20discuss%20with%20an%20architect.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-burgundy-hover sm:w-auto shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <IconMessage className="h-4 w-4" />
                    Book Free 30-Min Consultation on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 sm:w-auto transition-colors"
                  >
                    Recalculate Estimate
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-400 max-w-xl mx-auto">
                  * Indicative cost range based on verified materials and labor indices in Hyderabad. Final quotation is provided following a site visit and 3D architectural plan review.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

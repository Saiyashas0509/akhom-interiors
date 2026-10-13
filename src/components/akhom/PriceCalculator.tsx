import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
  IconMessage,
  IconCheck,
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

  const stepLabels = ["Property type", "Area & scope", "Material tier", "Timeline", "Your estimate"];

  return (
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="border border-ink/12 bg-ivory p-6 sm:p-10 md:p-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="section-index text-burgundy">PRICE ESTIMATOR</span>

          <h2
            className="display mt-5 text-ink"
            style={{ fontSize: "clamp(30px, 4.2vw, 60px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
          >
            Estimate your interior investment.
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-sm font-light leading-relaxed text-ink/70 md:text-[15px]">
            Real-time, transparent calculation based on verified Hyderabad turnkey execution rates. Compare finishes and budget instantly.
          </p>

          {/* Stepper & Progress */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="mb-3 flex items-center justify-between text-[12px] uppercase tracking-[0.18em] text-ink/60">
              <span className="font-medium text-burgundy">
                {submitted ? "Estimate unlocked" : `Step ${step} of 5`}
              </span>
              <span>{submitted ? "Completed" : stepLabels[step - 1]}</span>
            </div>
            <div className="h-px w-full bg-ink/12">
              <motion.div
                className="h-px bg-burgundy"
                initial={{ width: "20%" }}
                animate={{ width: submitted ? "100%" : `${(step / 5) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="border border-ink/12 bg-white p-6 sm:p-10">
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
                  <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
                    1. What type of space are you designing?
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink/60">
                    Select your layout to load standard floor plan benchmarks
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3">
                  {CONFIG.types.map((t) => {
                    const active = projectType === t.id;
                    const IconComp = t.iconComponent;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectType(t)}
                        className={`group relative flex flex-col items-start border p-6 text-left transition-all duration-300 ${
                          active
                            ? "border-burgundy bg-burgundy/5"
                            : "border-ink/12 bg-white hover:border-burgundy/40 hover:bg-stone/30"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div
                            className={`border p-2.5 transition-colors ${
                              active
                                ? "border-burgundy text-burgundy"
                                : "border-ink/12 text-ink/60 group-hover:border-burgundy/40 group-hover:text-burgundy"
                            }`}
                          >
                            <IconComp className="h-6 w-6" />
                          </div>
                          <span className="text-[12px] uppercase tracking-[0.14em] text-ink/50 group-hover:text-burgundy transition-colors">
                            {t.sub}
                          </span>
                        </div>
                        <h4 className="mt-4 font-serif text-2xl font-light text-ink transition-colors group-hover:text-burgundy">
                          {t.label}
                        </h4>
                        <p className="mt-1 text-[12px] font-light text-ink/60">
                          Average scale: <strong className="font-medium text-ink/80">{t.defaultSqft} sq.ft</strong>
                        </p>
                        <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-burgundy">
                          <span>Select plan</span>
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
                  <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
                    2. Adjust floor area & scope of work
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink/60">
                    Fine-tune carpet / super built-up square footage
                  </p>
                </div>

                {/* Slider Box */}
                <div className="mx-auto max-w-xl space-y-4 border border-ink/12 bg-stone/20 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <label htmlFor="sqft-range" className="text-[12px] uppercase tracking-[0.16em] text-ink/70">
                      Total floor area
                    </label>
                    <div className="border border-burgundy/30 bg-white px-4 py-1.5">
                      <span className="font-serif text-3xl font-light text-burgundy">
                        {sqft.toLocaleString()}
                      </span>
                      <span className="ml-1 text-[12px] font-light text-ink/50">sq.ft</span>
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
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-burgundy"
                  />
                  <div className="flex justify-between text-[12px] font-light text-ink/50">
                    <span>Min: {selectedTypeObj.minSqft} sq.ft</span>
                    <span>Max: {selectedTypeObj.minSqft * 3} sq.ft</span>
                  </div>
                </div>

                {/* Scope selector */}
                <div className="space-y-3">
                  <p className="text-center text-[12px] uppercase tracking-[0.16em] text-ink/70">
                    Select scope of execution
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {CONFIG.scopes.map((sc) => {
                      const active = scope === sc.id;
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setScope(sc.id)}
                          className={`border p-5 text-left transition-all ${
                            active
                              ? "border-burgundy bg-burgundy/5"
                              : "border-ink/12 bg-white hover:border-burgundy/40 hover:bg-stone/30"
                          }`}
                        >
                          <span className="mb-2 inline-block text-[12px] uppercase tracking-[0.14em] text-ink/50">
                            {sc.badge}
                          </span>
                          <h4 className="font-serif text-xl font-light text-ink">{sc.label}</h4>
                          <p className="mt-2 text-[12px] font-light leading-relaxed text-ink/60">{sc.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between border-t border-ink/12 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-ink/20 bg-white px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-ink hover:text-ivory"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-burgundy px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
                  >
                    Select finish tier →
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
                  <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
                    3. Choose material & finish quality
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink/60">
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
                        className={`relative flex cursor-pointer flex-col justify-between border p-6 transition-all duration-300 ${
                          active
                            ? "border-burgundy bg-burgundy/5"
                            : "border-ink/12 bg-white hover:border-burgundy/40"
                        }`}
                      >
                        {t.popular && (
                          <span className="absolute -top-3 right-6 inline-block bg-burgundy px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-ivory">
                            Most popular
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] uppercase tracking-[0.14em] text-ink/50">
                              {t.badge}
                            </span>
                            {active && <span className="text-[12px] font-medium text-burgundy">Selected</span>}
                          </div>

                          <h4 className="mt-3 font-serif text-2xl font-light text-ink">{t.name}</h4>
                          <p className="mt-2 text-[12px] font-light leading-relaxed text-ink/60">{t.tagline}</p>

                          <div className="mt-5 border-t border-ink/12 pt-4">
                            <p className="text-[12px] uppercase tracking-[0.14em] text-ink/50">
                              Includes in this tier:
                            </p>
                            <ul className="mt-3 space-y-2 text-[12px] font-light text-ink/75">
                              {t.includes.map((inc) => (
                                <li key={inc} className="flex items-start gap-2">
                                  <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-burgundy" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="-mx-6 -mb-6 mt-6 border-t border-ink/12 bg-stone/30 p-6">
                          <span className="text-[12px] uppercase tracking-[0.14em] text-ink/50">
                            Benchmark rate:
                          </span>
                          <p className="mt-1 font-serif text-2xl font-light text-burgundy">
                            ₹{t.rateRange[0]} – ₹{t.rateRange[1]}{" "}
                            <span className="text-[12px] font-sans text-ink/50">/ sq.ft</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between border-t border-ink/12 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-ink/20 bg-white px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-ink hover:text-ivory"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-burgundy px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
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
                  <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
                    4. Project location & preferred start
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink/60">
                    Ensures site supervision and dedicated turnkey engineer availability
                  </p>
                </div>

                <div className="mx-auto max-w-xl space-y-6">
                  <div>
                    <label className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-ink/70">
                      Location in Hyderabad
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full border border-ink/12 bg-white p-3.5 text-sm text-ink outline-none transition-colors focus:border-burgundy"
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
                    <label className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-ink/70">
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
                          className={`border p-3.5 text-center text-[12px] font-light transition-all ${
                            startDate === st
                              ? "border-burgundy bg-burgundy/5 text-burgundy"
                              : "border-ink/12 bg-white text-ink/70 hover:border-burgundy/40"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border-t border-ink/12 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-ink/20 bg-white px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-ink hover:text-ivory"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-burgundy px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
                  >
                    Calculate estimate →
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
                  <span className="inline-block border border-burgundy/30 px-3.5 py-1 text-[12px] uppercase tracking-[0.16em] text-burgundy">
                    Estimate calculated
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-light text-ink md:text-4xl">
                    Where should we share your itemized estimate?
                  </h3>
                  <p className="mx-auto mt-3 max-w-[50ch] text-sm font-light leading-relaxed text-ink/60">
                    Enter your contact details to instantly view the calculated investment range and receive an itemized copy on WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="mx-auto max-w-lg space-y-4">
                  <div>
                    <label className="block text-[12px] uppercase tracking-[0.16em] text-ink/70">
                      Your full name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border border-ink/12 bg-white p-3.5 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase tracking-[0.16em] text-ink/70">
                      WhatsApp / phone number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full border border-ink/12 bg-white p-3.5 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] uppercase tracking-[0.16em] text-ink/70">
                      Email address (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full border border-ink/12 bg-white p-3.5 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-burgundy py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
                    >
                      View full estimated price →
                    </button>
                  </div>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[12px] font-light text-ink/50">
                    <IconLock className="h-3.5 w-3.5 text-ink/50" />
                    <span>Zero spam. Handled confidentially for your design and architectural review.</span>
                  </p>
                </form>

                <div className="flex justify-start border-t border-ink/12 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-ink/20 bg-white px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-ink hover:text-ivory"
                  >
                    ← Modify inputs
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: FINAL RESULT DISPLAY */}
            {submitted && (
              <motion.div
                key="step5-result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
                    <IconCheck className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-light text-ink md:text-4xl">
                    Your turnkey price estimate
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink/60">
                    Prepared for <strong className="font-medium text-ink">{name}</strong> • {selectedTypeObj.label} (
                    {sqft.toLocaleString()} sq.ft) in {location}
                  </p>
                </div>

                {/* Price Result Display */}
                <div className="relative overflow-hidden bg-dark p-8 text-center text-ivory sm:p-12">
                  <div className="inline-block border border-ivory/25 px-4 py-1 text-[12px] uppercase tracking-[0.18em] text-burgundy-light">
                    Estimated investment range
                  </div>

                  <div className="mt-4 font-serif text-4xl font-light tracking-tight text-ivory sm:text-6xl">
                    {formatLakhs(lowEst)}{" "}
                    <span className="text-2xl font-sans text-ivory/40 sm:text-4xl">–</span> {formatLakhs(highEst)}
                  </div>

                  <p className="mt-3 text-[12px] font-light text-ivory/60">
                    Estimated benchmark: ₹{minRate.toFixed(0)} to ₹{maxRate.toFixed(0)} per sq.ft based on{" "}
                    <strong className="font-medium text-ivory/85">{selectedTierObj.name}</strong>
                  </p>

                  {/* Included / Excluded Breakdown */}
                  <div className="mt-10 grid grid-cols-1 gap-6 border-t border-ivory/15 pt-8 text-left sm:grid-cols-2">
                    <div className="border border-ivory/15 p-5">
                      <h5 className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-burgundy-light">
                        <IconCheck className="h-3.5 w-3.5 text-burgundy-light" />
                        <span>Included in AKHOM turnkey contract</span>
                      </h5>
                      <ul className="mt-3 space-y-2 text-[12px] font-light text-ivory/70">
                        <li>• 100% In-house factory joinery & custom woodwork from Hyderabad workshop</li>
                        <li>• Complete civil, MEP, false ceiling & ambient architectural lighting execution</li>
                        <li>• Locked line-by-line pricing with dedicated site engineer supervision</li>
                        <li>• Comprehensive 10-year hardware & material warranty coverage</li>
                      </ul>
                    </div>
                    <div className="border border-ivory/15 p-5">
                      <h5 className="text-[12px] uppercase tracking-[0.14em] text-ivory/50">
                        Excluded / optional add-ons
                      </h5>
                      <ul className="mt-3 space-y-2 text-[12px] font-light text-ivory/50">
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
                    className="inline-flex w-full items-center justify-center gap-3 bg-burgundy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover sm:w-auto"
                  >
                    <IconMessage className="h-4 w-4" />
                    Book free 30-min consultation on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 border border-ink/20 bg-white px-6 py-4 text-[12px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-ink hover:text-ivory sm:w-auto"
                  >
                    Recalculate estimate
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="mx-auto max-w-xl text-center text-[12px] font-light text-ink/50">
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

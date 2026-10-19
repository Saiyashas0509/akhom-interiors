import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
  IconArrowLeft,
  IconMessage,
  IconCheck,
  IconApartment,
  IconHome,
  IconVilla,
  IconEstate,
  IconOffice,
  IconLock,
  IconBrush,
  IconHelmet,
  IconBulb,
  IconLayers,
  IconSparkles,
} from "./icons";
import { WHATSAPP_URL, sendLead } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

const TYPES = [
  { id: "1bhk", label: "1 BHK", sub: "Compact apartment", minSqft: 450, defaultSqft: 650, baths: 1, icon: IconApartment },
  { id: "2bhk", label: "2 BHK", sub: "Standard apartment", minSqft: 800, defaultSqft: 1100, baths: 2, icon: IconHome },
  { id: "3bhk", label: "3 BHK", sub: "Spacious residence", minSqft: 1200, defaultSqft: 1650, baths: 3, icon: IconVilla },
  { id: "4bhk", label: "4+ BHK", sub: "Penthouse / duplex", minSqft: 2000, defaultSqft: 2500, baths: 4, icon: IconEstate },
  { id: "villa", label: "Villa", sub: "Independent house", minSqft: 2500, defaultSqft: 3600, baths: 5, icon: IconEstate },
  { id: "office", label: "Office", sub: "Commercial space", minSqft: 800, defaultSqft: 2000, baths: 2, icon: IconOffice },
] as const;

const SCOPES = [
  { id: "full", label: "Full Interiors", desc: "Joinery, ceilings, lighting & finishes — complete turnkey handover", multiplier: 1 },
  { id: "woodwork", label: "Kitchen & Wardrobes", desc: "Modular kitchen, wardrobes, TV units and storage only", multiplier: 0.65 },
  { id: "renovation", label: "Renovation", desc: "Selective remodelling and upgraded finishes for an existing home", multiplier: 0.8 },
] as const;

export const TIERS = [
  {
    id: "silver",
    name: "AKHOM Silver",
    badge: "Classic value",
    tagline: "Quality BWR plywood, premium laminate finishes, durable branded hardware",
    rate: [1350, 1750],
    includes: [
      "Marine / BWR grade plywood core",
      "0.8–1.0 mm anti-scratch textured laminates",
      "Soft-close Hettich / Häfele hinges",
      "Ambient warm LED lighting & cove provisions",
    ],
  },
  {
    id: "gold",
    name: "AKHOM Gold",
    badge: "Signature finish",
    popular: true,
    tagline: "Natural veneers, fluted panels, quartz surfaces and a full designer ceiling",
    rate: [1850, 2450],
    includes: [
      "Boiling waterproof (BWP) marine core",
      "Natural American walnut / oak veneers",
      "Fluted architectural timber accents",
      "Full false ceiling with magnetic track lights",
      "In-house workshop joinery & precision fit",
    ],
  },
  {
    id: "platinum",
    name: "AKHOM Platinum",
    badge: "Ultra luxury",
    tagline: "Italian marble, bespoke PU metallics, motorised hardware and solid teak craft",
    rate: [2600, 3600],
    includes: [
      "Italian marble & honed travertine cladding",
      "Imported PU lacquer & metallic finishes",
      "Blum motorised servo-drive fittings",
      "Hand-carved solid teak mandir & joinery",
      "Full MEP, smart home & acoustic planning",
    ],
  },
] as const;

// Indicative site-service rates (₹). "sqft" scales with floor area; "bath" scales per bathroom.
const ADDONS = [
  { id: "painting", label: "Painting", desc: "Walls, ceilings, putty & textures", icon: IconBrush, unit: "sqft", rate: [30, 45] },
  { id: "civil", label: "Civil Work", desc: "Walls, tiling, flooring & demolition", icon: IconHelmet, unit: "sqft", rate: [110, 200] },
  { id: "electrical", label: "Electrical", desc: "Rewiring, points, boards & lighting", icon: IconBulb, unit: "sqft", rate: [80, 130] },
  { id: "ceiling", label: "False Ceiling", desc: "Gypsum ceiling with cove lighting", icon: IconLayers, unit: "ceiling", rate: [120, 170] },
  { id: "bathroom", label: "Bathroom Makeover", desc: "Tiling, vanity, fittings & partition", icon: IconSparkles, unit: "bath", rate: [120000, 250000] },
] as const;

const LOCATIONS = [
  "Gachibowli / Kokapet / Financial District",
  "Jubilee Hills / Banjara Hills",
  "Madhapur / Hitec City / Kondapur",
  "Miyapur / Tellapur / Kollur",
  "Secunderabad / Begumpet",
  "Other area in Hyderabad",
  "Outside Hyderabad",
] as const;

const STEP_LABELS = ["Home", "Size & scope", "Package", "Extras", "Details", "Estimate"] as const;

const formatINR = (amt: number) => {
  if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`;
  if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} L`;
  return `₹${Math.round(amt).toLocaleString("en-IN")}`;
};
const round = (n: number) => Math.round(n / 1000) * 1000;

function ChoiceCard({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative rounded-[22px] border p-5 text-left transition-all duration-300 ${
        active
          ? "border-ink/60 bg-white shadow-soft ring-4 ring-ink/5"
          : "border-white/70 bg-white/50 hover:border-burgundy/30 hover:bg-white/80"
      } ${className}`}
    >
      {active && (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-ivory">
          <IconCheck className="h-3.5 w-3.5" />
        </span>
      )}
      {children}
    </button>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center">
      <h3 className="font-serif text-2xl text-ink md:text-3xl">{title}</h3>
      <p className="mt-2 text-[14px] font-light text-ink">{sub}</p>
    </div>
  );
}

export type TierId = (typeof TIERS)[number]["id"];

export function PriceCalculator({
  tier: tierProp,
  onTierChange,
}: { tier?: TierId; onTierChange?: (t: TierId) => void } = {}) {
  const [step, setStep] = useState(0);
  const [typeId, setTypeId] = useState<(typeof TYPES)[number]["id"]>("3bhk");
  const [sqft, setSqft] = useState(1650);
  const [baths, setBaths] = useState(3);
  const [scopeId, setScopeId] = useState<(typeof SCOPES)[number]["id"]>("full");
  const [tierLocal, setTierLocal] = useState<TierId>("gold");
  const tierId = tierProp ?? tierLocal;
  const setTierId = (t: TierId) => {
    setTierLocal(t);
    onTierChange?.(t);
  };
  const [addons, setAddons] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState<string>(LOCATIONS[0]);
  const [whatsapp, setWhatsapp] = useState(true);
  const [error, setError] = useState("");
  const [leadFailed, setLeadFailed] = useState(false);

  const type = TYPES.find((t) => t.id === typeId)!;
  const scope = SCOPES.find((s) => s.id === scopeId)!;
  const tier = TIERS.find((t) => t.id === tierId)!;

  const breakdown = useMemo(() => {
    const rows: { label: string; low: number; high: number }[] = [
      {
        label: `${scope.label} · ${tier.name}`,
        low: round(sqft * tier.rate[0] * scope.multiplier),
        high: round(sqft * tier.rate[1] * scope.multiplier),
      },
    ];
    for (const a of ADDONS) {
      if (!addons.includes(a.id)) continue;
      const qty = a.unit === "bath" ? baths : a.unit === "ceiling" ? sqft * 0.6 : sqft;
      rows.push({ label: a.label, low: round(qty * a.rate[0]), high: round(qty * a.rate[1]) });
    }
    const low = rows.reduce((s, r) => s + r.low, 0);
    const high = rows.reduce((s, r) => s + r.high, 0);
    return { rows, low, high };
  }, [sqft, baths, scope, tier, addons]);

  const selectType = (t: (typeof TYPES)[number]) => {
    setTypeId(t.id);
    setSqft(t.defaultSqft);
    setBaths(t.baths);
    setStep(1);
  };

  const toggleAddon = (id: string) =>
    setAddons((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLeadFailed(false);
    // The estimate always shows; the lead email goes out alongside it.
    sendLead(`Estimate request — ${name} (${type.label}, ${tier.name})`, {
      Name: name,
      Phone: `+91 ${phone}`,
      Email: email,
      Location: location,
      Home: `${type.label}, ${sqft} sq.ft, ${baths} bathroom(s)`,
      Scope: scope.label,
      Package: tier.name,
      Extras: addons.length ? ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.label).join(", ") : "None",
      Estimate: `${formatINR(breakdown.low)} – ${formatINR(breakdown.high)}`,
      "WhatsApp updates": whatsapp ? "Yes" : "No",
      _replyto: email || undefined,
    }).catch(() => setLeadFailed(true));
    setStep(5);
  };

  const waText = encodeURIComponent(
    `Hi AKHOM, I used the estimate calculator.\n*Home:* ${type.label} (${sqft} sq.ft)\n*Scope:* ${scope.label}\n*Package:* ${tier.name}\n*Extras:* ${
      addons.length ? ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.label).join(", ") : "None"
    }\n*Location:* ${location}\n*Estimate:* ${formatINR(breakdown.low)} – ${formatINR(breakdown.high)}\nI'd like to book a free consultation.`,
  );

  const nav = (canNext = true, nextLabel = "Continue") => (
    <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink/10 pt-6">
      <button
        type="button"
        onClick={() => setStep((s) => Math.max(0, s - 1))}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-[14px] text-ink transition-colors hover:bg-white"
      >
        <IconArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <button
        type="button"
        disabled={!canNext}
        onClick={() => setStep((s) => s + 1)}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[14px] font-medium text-ivory transition-colors hover:bg-burgundy disabled:opacity-40"
      >
        {nextLabel} <IconArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="glass rounded-[36px] p-5 sm:p-8 md:p-12">
        {/* Progress */}
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-1.5">
            {STEP_LABELS.map((l, i) => (
              <div key={l} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-ink" : "bg-ink/10"}`} />
                <p className={`mt-2 hidden text-center text-[12px] sm:block ${i === step ? "text-ink" : "text-ink"}`}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step === 0 && (
                <>
                  <StepHeading title="What are you designing?" sub="Choose your home or space type to begin." />
                  <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                    {TYPES.map((t) => (
                      <ChoiceCard key={t.id} active={typeId === t.id} onClick={() => selectType(t)}>
                        <t.icon className="h-7 w-7 text-ink" />
                        <p className="mt-4 font-serif text-2xl text-ink">{t.label}</p>
                        <p className="mt-1 text-[13px] text-ink">{t.sub}</p>
                      </ChoiceCard>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <StepHeading title="Size & scope of work" sub="Adjust the carpet area and tell us how much you'd like us to do." />
                  <div className="mx-auto mt-8 max-w-xl rounded-[24px] bg-white/60 p-6">
                    <div className="flex items-center justify-between">
                      <label htmlFor="sqft" className="text-[14px] text-ink">Carpet area</label>
                      <span className="font-serif text-3xl text-ink">
                        {sqft.toLocaleString("en-IN")} <span className="font-sans text-[13px] text-ink">sq.ft</span>
                      </span>
                    </div>
                    <input
                      id="sqft"
                      type="range"
                      min={type.minSqft}
                      max={type.minSqft * 3}
                      step={50}
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-burgundy"
                    />
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[14px] text-ink">Bathrooms</span>
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label="Fewer bathrooms" onClick={() => setBaths((b) => Math.max(1, b - 1))} className="h-9 w-9 rounded-full border border-ink/15 bg-white text-lg">−</button>
                        <span className="w-6 text-center font-serif text-xl">{baths}</span>
                        <button type="button" aria-label="More bathrooms" onClick={() => setBaths((b) => Math.min(8, b + 1))} className="h-9 w-9 rounded-full border border-ink/15 bg-white text-lg">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {SCOPES.map((s) => (
                      <ChoiceCard key={s.id} active={scopeId === s.id} onClick={() => setScopeId(s.id)}>
                        <p className="pr-8 font-serif text-xl text-ink">{s.label}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink">{s.desc}</p>
                      </ChoiceCard>
                    ))}
                  </div>
                  {nav()}
                </>
              )}

              {step === 2 && (
                <>
                  <StepHeading title="Choose your package" sub="Every package uses branded materials and our in-house joinery." />
                  <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {TIERS.map((t) => (
                      <ChoiceCard key={t.id} active={tierId === t.id} onClick={() => setTierId(t.id)} className="flex flex-col">
                        {"popular" in t && t.popular && (
                          <span className="absolute -top-3 left-5 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory">
                            Most popular
                          </span>
                        )}
                        <span className="eyebrow text-ink">{t.badge}</span>
                        <p className="mt-3 font-serif text-2xl text-ink">{t.name}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink">{t.tagline}</p>
                        <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                          {t.includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2 text-[13px] text-ink">
                              <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 rounded-2xl bg-stone/50 px-4 py-3 font-serif text-xl text-ink">
                          ₹{t.rate[0].toLocaleString("en-IN")} – ₹{t.rate[1].toLocaleString("en-IN")}
                          <span className="font-sans text-[12px] text-ink"> / sq.ft</span>
                        </p>
                      </ChoiceCard>
                    ))}
                  </div>
                  {nav()}
                </>
              )}

              {step === 3 && (
                <>
                  <StepHeading title="Need any site services?" sub="Optional — pick everything that applies, or skip ahead." />
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {ADDONS.map((a) => (
                      <ChoiceCard key={a.id} active={addons.includes(a.id)} onClick={() => toggleAddon(a.id)}>
                        <a.icon className="h-6 w-6 text-ink" />
                        <p className="mt-3 font-serif text-xl text-ink">{a.label}</p>
                        <p className="mt-1 text-[13px] text-ink">{a.desc}</p>
                      </ChoiceCard>
                    ))}
                  </div>
                  {nav(true, addons.length ? "Continue" : "Skip")}
                </>
              )}

              {step === 4 && (
                <form onSubmit={submitDetails} noValidate>
                  <StepHeading title="Your estimate is ready" sub="Tell us where to send your detailed estimate." />
                  <div className="mx-auto mt-8 grid max-w-xl gap-4">
                    {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</p>}
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] text-ink">Full name</span>
                      <input className="glass-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] text-ink">Mobile number</span>
                      <div className="flex gap-2">
                        <span className="glass-field !w-auto shrink-0 text-ink">+91</span>
                        <input className="glass-field" type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" autoComplete="tel-national" required />
                      </div>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] text-ink">Email (optional)</span>
                      <input className="glass-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] text-ink">Property location</span>
                      <select className="glass-field" value={location} onChange={(e) => setLocation(e.target.value)}>
                        {LOCATIONS.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-center gap-3 text-[13px] text-ink">
                      <input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} className="h-4 w-4 accent-burgundy" />
                      Send updates on WhatsApp
                    </label>
                    <p className="flex items-center gap-2 text-[12px] text-ink">
                      <IconLock className="h-3.5 w-3.5" /> Your details stay private. No spam, ever.
                    </p>
                  </div>
                  <div className="mx-auto mt-8 flex max-w-xl items-center justify-between gap-3 border-t border-ink/10 pt-6">
                    <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-[14px] text-ink hover:bg-white">
                      <IconArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[14px] font-medium text-ivory hover:bg-burgundy">
                      Show my estimate <IconArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {step === 5 && (
                <>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone text-ink">
                      <IconCheck className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-serif text-3xl text-ink md:text-4xl">Your estimate, {name.split(" ")[0]}</h3>
                    <p className="mt-2 text-[14px] text-ink">
                      {type.label} · {sqft.toLocaleString("en-IN")} sq.ft · {location}
                    </p>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-[28px] bg-dark p-6 text-ivory sm:p-10">
                    <p className="text-center text-[13px] uppercase tracking-[0.16em] text-burgundy-light">Estimated investment</p>
                    <p className="mt-3 text-center font-serif text-4xl sm:text-6xl">
                      {formatINR(breakdown.low)} <span className="text-ivory/40">–</span> {formatINR(breakdown.high)}
                    </p>
                    <div className="mx-auto mt-8 max-w-xl divide-y divide-ivory/10 rounded-[20px] border border-ivory/15 bg-white/5">
                      {breakdown.rows.map((r) => (
                        <div key={r.label} className="flex items-center justify-between gap-4 px-5 py-3.5 text-[14px]">
                          <span className="text-ivory/75">{r.label}</span>
                          <span className="whitespace-nowrap text-ivory">
                            {formatINR(r.low)} – {formatINR(r.high)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {leadFailed && (
                      <p className="mx-auto mt-5 max-w-xl rounded-2xl bg-white/10 px-4 py-3 text-center text-[13px] text-ivory">
                        We couldn't send a copy to our team automatically — tap “Book a free consultation” to share this estimate on WhatsApp.
                      </p>
                    )}
                    <p className="mx-auto mt-5 max-w-xl text-center text-[12px] text-ivory/50">
                      Indicative range excluding GST, appliances and loose furniture. Your final quote follows a free site visit and 3D design review.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={`${WHATSAPP_URL}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] font-medium text-ivory hover:bg-burgundy sm:w-auto"
                    >
                      <IconMessage className="h-4 w-4" /> Book a free consultation
                    </a>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-ink/15 bg-white/60 px-7 py-4 text-[14px] text-ink hover:bg-white sm:w-auto"
                    >
                      Start again
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

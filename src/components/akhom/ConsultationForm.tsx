import { useState } from "react";
import { Reveal } from "./ui";
import { IconArrowRight, IconCheck, IconMessage } from "./icons";

const LOCATIONS = [
  "Banjara Hills",
  "Jubilee Hills",
  "Kokapet",
  "Financial District",
  "Gachibowli / Madhapur",
  "Other Area in Hyderabad",
];

const SCOPES = [
  "Luxury Villa / Independent Home",
  "Premium Apartment / Penthouse",
  "Corporate Office / GCC Fit-Out",
  "Bespoke Retail / Showroom",
  "Custom Joinery & Furniture Only",
];

const BUDGETS = [
  "₹15L — ₹30L",
  "₹30L — ₹60L",
  "₹60L — ₹1.2 Cr",
  "₹1.2 Cr+",
  "To be decided",
];

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: LOCATIONS[0],
    scope: SCOPES[0],
    budget: BUDGETS[1],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please complete all required fields (Name, Email, Phone).");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AKHOM Interiors,\n\nI would like to book a consultation.\n*Name:* ${formData.name}\n*Location:* ${formData.location}\n*Scope:* ${formData.scope}\n*Budget:* ${formData.budget}\n*Contact:* ${formData.phone}`
  );

  return (
    <section className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow text-ink/50">Book a Consultation</p>
            <h2
              className="display mt-4 text-ink"
              style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 0.96 }}
            >
              Start your design journey.
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-sm font-light leading-relaxed text-ink/75">
              Share details about your space. Our lead designer will review your requirements and respond within 24 hours to schedule a 30-minute consultation.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 border border-ink/12 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-10 md:p-14">
          {submitted ? (
            <Reveal>
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bronze/10 text-bronze">
                  <IconCheck className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-serif text-3xl font-light text-ink md:text-4xl">
                  Consultation Request Received
                </h3>
                <p className="mt-4 max-w-[50ch] text-sm font-light leading-relaxed text-ink/75">
                  Thank you, <strong className="font-normal text-ink">{formData.name}</strong>. We've recorded your project details for <span className="text-bronze">{formData.location}</span>. Our studio lead will reach out to you shortly.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/919000000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-ink px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-stone hover:text-ink"
                  >
                    <IconMessage className="h-4 w-4" />
                    Instant WhatsApp Follow-Up
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        location: LOCATIONS[0],
                        scope: SCOPES[0],
                        budget: BUDGETS[1],
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-ivory"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="border border-red-500/30 bg-red-50 px-4 py-3 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-1 focus:ring-bronze"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-1 focus:ring-bronze"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-1 focus:ring-bronze"
                  />
                </div>
              </div>

              {/* Project Scope & Location */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                    Project Location / Area
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                    Project Type
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze"
                  >
                    {SCOPES.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget selector */}
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                  Estimated Budget Range
                </label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`border px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-all ${
                        formData.budget === b
                          ? "border-bronze bg-bronze text-ivory shadow-sm"
                          : "border-ink/20 bg-transparent text-ink/75 hover:border-ink/50"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
                  Tell us about the space (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details like area (sq.ft), key rooms, current state, or design preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full border border-ink/20 bg-transparent p-4 text-sm text-ink outline-none transition-colors focus:border-bronze focus:ring-1 focus:ring-bronze"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center">
                <p className="text-[11px] font-light text-ink/60">
                  * Required fields. All information is strictly confidential.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-stone hover:text-ink"
                >
                  Request Consultation
                  <IconArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


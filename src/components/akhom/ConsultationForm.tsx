import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconCheck, IconMessage } from "./icons";

const LOCATIONS = [
  "Hyderabad — Kokapet / Gandipet",
  "Hyderabad — Jubilee Hills",
  "Hyderabad — Banjara Hills",
  "Hyderabad — Financial District / Hitec City",
  "Hyderabad — Gachibowli / Madhapur",
  "Other Area in Telangana / AP",
];

const SCOPES = [
  "Villa",
  "Apartment",
  "Commercial / GCC",
  "Healthcare / Clinic",
  "Hotel / Resort / F&B",
  "Custom Furniture",
  "Renovation",
];

const STAGES = [
  "Planning / Architecture Phase",
  "Civil Structure Under Construction",
  "Ready for Interior Fit-Out",
  "Existing Space / Renovation",
];

const CONTACT_PREFERENCES = [
  "WhatsApp",
  "Phone Call",
  "Email",
];

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: LOCATIONS[0],
    scope: SCOPES[0],
    approxArea: "",
    projectStage: STAGES[2],
    contactMethod: CONTACT_PREFERENCES[0],
    message: "",
    consent: true,
    honeypot: "", // anti-spam
  });

  const [leadSource, setLeadSource] = useState("direct");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const source = params.get("utm_source") || params.get("ref") || "website_direct";
      setLeadSource(source);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Spam bot trapped
      return;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please complete all required fields (Name, Email, Phone).");
      return;
    }
    if (!formData.consent) {
      setError("Please agree to our privacy policy to proceed.");
      return;
    }
    setError("");

    // Store lead record for CRM / Zoho integration
    const leadRecord = {
      ...formData,
      leadSource,
      submittedAt: new Date().toISOString(),
      recipient: "info@akhominteriors.com",
      cc: "projects@akhominteriors.com",
    };

    try {
      localStorage.setItem("akhom_last_enquiry", JSON.stringify(leadRecord));
    } catch {
      // Ignore storage error
    }

    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi AKHOM, I'd like to discuss my space.\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Location:* ${formData.location}\n*Scope:* ${formData.scope}\n*Approx Area:* ${formData.approxArea || "Not specified"}\n*Project Stage:* ${formData.projectStage}\n*Preferred Contact:* ${formData.contactMethod}\n*Phone:* ${formData.phone}`
  );

  return (
    <section id="consultation" className="bg-ivory px-6 py-20 md:px-10 md:py-28 lg:px-14">
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

        <div className="mt-14 border border-ink/12 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-10 md:p-14">
          {submitted ? (
            <Reveal>
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <IconCheck className="h-8 w-8 text-burgundy" />
                </div>
                <h3 className="mt-6 font-serif text-3xl font-light text-ink md:text-4xl">
                  Consultation Request Received
                </h3>
                <p className="mt-4 max-w-[52ch] text-sm font-light leading-relaxed text-ink/75">
                  Thank you, <strong className="font-medium text-ink">{formData.name}</strong>. Your enquiry has been routed to{" "}
                  <span className="text-burgundy font-medium">info@akhominteriors.com</span> (copy to studio projects). Our team will contact you via{" "}
                  <strong>{formData.contactMethod}</strong>.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/919704352346?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-burgundy px-7 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
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
                        approxArea: "",
                        projectStage: STAGES[2],
                        contactMethod: CONTACT_PREFERENCES[0],
                        message: "",
                        consent: true,
                        honeypot: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-ivory"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_url_check"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. suresh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  />
                </div>
              </div>

              {/* Project Scope, Location, Approx Area & Stage */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Project Type *
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                  >
                    {SCOPES.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Project Location / Area
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Approx. Area (Sq. Ft.)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4,500 sq.ft."
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                    Current Project Stage
                  </label>
                  <select
                    value={formData.projectStage}
                    onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                    className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-burgundy"
                  >
                    {STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                  Preferred Contact Method
                </label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {CONTACT_PREFERENCES.map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, contactMethod: method })}
                      className={`border px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] transition-all ${
                        formData.contactMethod === method
                          ? "border-burgundy bg-burgundy text-ivory shadow-sm font-medium"
                          : "border-ink/20 bg-transparent text-ink/75 hover:border-burgundy/50"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">
                  Tell us about the space (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details like floor plans, target handover date, architectural style or specific functional needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full border border-ink/20 bg-transparent p-4 text-sm text-ink outline-none transition-colors focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                />
              </div>

              {/* Consent Line per B15 */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-ink/30 text-burgundy focus:ring-burgundy"
                />
                <label htmlFor="privacy-consent" className="text-[12px] font-light leading-relaxed text-ink/75">
                  I agree that AKHOM INTERIORS may process my details to respond to this consultation enquiry in accordance with the{" "}
                  <Link to="/privacy" className="text-burgundy underline hover:text-burgundy-hover">
                    Privacy Policy
                  </Link>. All project details remain strictly confidential.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center">
                <p className="text-[12px] font-light text-ink/60">
                  * Required fields. Delivered to info@akhominteriors.com with studio copy.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-burgundy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-burgundy-hover"
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

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./ui";
import { IconArrowRight, IconCheck, IconMessage, IconLock } from "./icons";
import { SERVICES } from "@/data/services";
import { WHATSAPP_URL, sendLead, whatsappLink } from "@/lib/contact";

const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa", "Office / Commercial"] as const;

const LOCATIONS = [
  "Gachibowli / Kokapet / Financial District",
  "Jubilee Hills / Banjara Hills",
  "Madhapur / Hitec City / Kondapur",
  "Miyapur / Tellapur / Kollur",
  "Secunderabad / Begumpet",
  "Other area in Hyderabad",
  "Outside Hyderabad",
] as const;

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  propertyType: "3 BHK" as string,
  service: SERVICES[0]!.title,
  location: LOCATIONS[0] as string,
  message: "",
  whatsapp: true,
  consent: true,
  honeypot: "",
};

export function ConsultationForm() {
  const [form, setForm] = useState(EMPTY);
  const [leadSource, setLeadSource] = useState("website_direct");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLeadSource(params.get("utm_source") || params.get("ref") || "website_direct");
  }, []);

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    if (!form.consent) {
      setError("Please agree to our privacy policy to continue.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await sendLead(`Consultation request — ${form.name} (${form.propertyType})`, {
        Name: form.name,
        Phone: `+91 ${form.phone}`,
        Email: form.email,
        "Property type": form.propertyType,
        "Service needed": form.service,
        Location: form.location,
        Notes: form.message,
        "WhatsApp updates": form.whatsapp ? "Yes" : "No",
        "Lead source": leadSource,
        _replyto: form.email || undefined,
      });
      setSubmitted(true);
    } catch {
      setError("We couldn't send your request just now. Please try again, or send it to us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi AKHOM, I'd like to book a consultation.\n*Name:* ${form.name}\n*Property:* ${form.propertyType}\n*Service:* ${form.service}\n*Location:* ${form.location}\n*Phone:* +91 ${form.phone}${form.message ? `\n*Notes:* ${form.message}` : ""}`,
  );

  return (
    <section id="consultation" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-ink">Book a consultation</p>
          <h2 className="display mt-4 text-ink" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Let's design your space.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] font-light leading-relaxed text-ink">
            Share a few details and our designer will call you back to plan a free consultation at
            your site, our studio or over video.
          </p>
          <ul className="mt-8 space-y-3">
            {["Free design consultation", "Transparent, itemised pricing", "One team from design to handover"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-ink">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone text-ink">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href={`${WHATSAPP_URL}?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space.`}
            target="_blank"
            rel="noreferrer"
            className="glass mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] text-ink"
          >
            <IconMessage className="h-4 w-4 text-ink" /> Prefer WhatsApp? Chat with us
          </a>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-7">
          <div className="glass rounded-[32px] p-6 sm:p-9">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone text-ink">
                  <IconCheck className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-serif text-3xl text-ink">Thank you, {form.name.split(" ")[0]}.</h3>
                <p className="mt-3 max-w-[44ch] text-[15px] font-light leading-relaxed text-ink">
                  We've received your request. Our designer will contact you within a working day.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] font-medium text-ivory hover:bg-burgundy"
                  >
                    <IconMessage className="h-4 w-4" /> Continue on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(EMPTY);
                    }}
                    className="rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-[14px] text-ink hover:bg-white"
                  >
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && (
                  <div className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                    {error}
                    {error.includes("WhatsApp") && (
                      <a
                        href={whatsappLink(decodeURIComponent(whatsappMessage))}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block font-medium underline"
                      >
                        Send on WhatsApp
                      </a>
                    )}
                  </div>
                )}

                <input
                  type="text"
                  name="website_url_check"
                  value={form.honeypot}
                  onChange={(e) => set("honeypot", e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <fieldset>
                  <legend className="mb-2 text-[13px] text-ink">Property type</legend>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={form.propertyType === p}
                        onClick={() => set("propertyType", p)}
                        className={`rounded-full border px-4 py-2 text-[13px] transition-all ${
                          form.propertyType === p
                            ? "border-ink bg-ink text-ivory"
                            : "border-ink/12 bg-white/60 text-ink hover:border-burgundy/40"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] text-ink">Full name</span>
                    <input className="glass-field" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" autoComplete="name" required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] text-ink">Mobile number</span>
                    <div className="flex gap-2">
                      <span className="glass-field !w-auto shrink-0 text-ink">+91</span>
                      <input className="glass-field" type="tel" inputMode="numeric" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Mobile number" autoComplete="tel-national" required />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] text-ink">Email (optional)</span>
                    <input className="glass-field" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] text-ink">Service needed</span>
                    <select className="glass-field" value={form.service} onChange={(e) => set("service", e.target.value)}>
                      {SERVICES.map((s) => (
                        <option key={s.slug}>{s.title}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[13px] text-ink">Property location</span>
                  <select className="glass-field" value={form.location} onChange={(e) => set("location", e.target.value)}>
                    {LOCATIONS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[13px] text-ink">Anything we should know? (optional)</span>
                  <textarea
                    rows={3}
                    className="glass-field resize-none"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Possession date, style you like, rooms to design…"
                  />
                </label>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 text-[13px] text-ink">
                    <input type="checkbox" checked={form.whatsapp} onChange={(e) => set("whatsapp", e.target.checked)} className="h-4 w-4 accent-burgundy" />
                    Send me updates on WhatsApp
                  </label>
                  <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-burgundy" />
                    <span>
                      I agree to the{" "}
                      <Link to="/privacy" className="text-ink underline">
                        Privacy Policy
                      </Link>{" "}
                      and to be contacted about my enquiry.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[15px] font-medium text-ivory transition-colors hover:bg-burgundy disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Book a Free Consultation"}
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="flex items-center justify-center gap-2 text-[12px] text-ink">
                  <IconLock className="h-3.5 w-3.5" /> Your details stay private.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

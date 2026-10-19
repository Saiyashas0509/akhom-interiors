import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Parallax, Reveal, LightboxModal } from "./ui";
import { IconArrowRight, IconMaximize, IconMessage, IconCheck } from "./icons";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import pujaCraft from "@/assets/puja-craft.jpg";
import { WHATSAPP_URL, sendLead } from "@/lib/contact";

const PORTFOLIO_ITEMS = [
  {
    name: "Illuminated Walnut Joinery & Marble Living",
    category: "residential",
    style: "Warm Architectural",
    meta: "Custom Villa Concept — Hyderabad",
    narrative: "Full-height illuminated walnut display joinery framed by book-matched natural marble wall panelling and polished stone floors.",
    img: project1,
    alt: "Luxury living room with backlit custom walnut joinery and polished marble wall",
    span: "md:col-span-7",
  },
  {
    name: "Bespoke Teak & Brass Mandir",
    category: "craft",
    style: "Sacred & Traditional",
    meta: "In-House Workshop Joinery",
    narrative: "Solid teak wood shrine crafted with delicate architectural arches, backlit warm niches, and hand-finished brass inlay details.",
    img: pujaCraft,
    alt: "Handcrafted wooden puja mandir with architectural arches and warm illumination",
    span: "md:col-span-5 md:mt-24",
  },
  {
    name: "Master Suite & Fluted Headboard",
    category: "residential",
    style: "Minimalist Modern",
    meta: "Private Residence Suite",
    narrative: "Full-span walnut headboard with recessed acoustic fabric panels, integrated ambient lighting, and bespoke brass accents.",
    img: project2,
    alt: "Master bedroom suite with full-width walnut headboard wall and warm architectural lighting",
    span: "md:col-span-5 md:mt-12",
  },
  {
    name: "Executive Suite & Fluted Glass Architecture",
    category: "corporate",
    style: "Contemporary Commercial",
    meta: "Executive Fit-Out — Hyderabad",
    narrative: "Architectural fluted glass partitions, bespoke marble-top credenza joinery, and monolithic stone flooring for corporate spaces.",
    img: project3,
    alt: "Executive commercial reception and suite with fluted glass doors and marble console",
    span: "md:col-span-7 md:-mt-10",
  },
];

export function SelectedWork() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  useEffect(() => {
    document.body.style.overflow = portfolioModalOpen ? "hidden" : "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPortfolioModalOpen(false);
        setRequestSent(false);
      }
    };
    if (portfolioModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [portfolioModalOpen]);

  const filteredProjects =
    filter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter);

  const [sendError, setSendError] = useState(false);

  const handlePortfolioRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientPhone.trim()) return;
    setSendError(false);
    try {
      await sendLead("Portfolio request", { Email: clientEmail, Phone: clientPhone, _replyto: clientEmail });
      setRequestSent(true);
    } catch {
      setSendError(true);
    }
  };

  return (
    <section id="work" className="glass-stage px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ink">Selected work</p>
              <h2
                className="display mt-4 max-w-[16ch] text-ink"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                Rooms we've designed and built.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setPortfolioModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] text-ivory transition-colors duration-500 hover:bg-burgundy"
            >
              Request our portfolio <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>

        {/* Filter Bar (Type & Sectors per G1) */}
        <Reveal delay={1}>
          <div className="glass mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
            {[
              { id: "all", label: "All Works" },
              { id: "residential", label: "Residential" },
              { id: "corporate", label: "Corporate" },
              { id: "craft", label: "Custom Craft & Puja" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] transition-all duration-500 ${
                  filter === cat.id ? "bg-ink text-ivory shadow-soft" : "text-ink hover:bg-white/70 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Editorial Project Grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-20 md:grid-cols-12">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.name} delay={((i % 3) + 1) as 1 | 2 | 3} className={p.span}>
              <div className="group block cursor-pointer" onClick={() => setSelectedProject(p)}>
                <div className="relative">
                  <Parallax speed={i % 2 === 0 ? -36 : -52} scale={1.12}>
                    <div className="relative overflow-hidden rounded-[30px] bg-stone/40">
                      <img
                        src={p.img}
                        alt={p.alt}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] md:aspect-[4/4.2]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="glass-dark absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <IconMaximize className="h-3 w-3" />
                        View Full Screen
                      </div>
                    </div>
                  </Parallax>
                  {/* Caption card */}
                  <div className="glass-strong relative z-10 -mt-12 ml-5 max-w-[88%] rounded-[26px] p-6 md:-mt-16 md:ml-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl text-ink">{p.name}</h3>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-ink">
                      <span>{p.meta}</span>
                      <span>•</span>
                      <span className="text-ink">{p.style}</span>
                    </div>
                    <p className="mt-4 text-[13px] font-light leading-relaxed text-ink">{p.narrative}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Request Our Portfolio Block (per B6) */}
        <div className="glass mt-20 rounded-[32px] p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <span className="eyebrow text-ink">
                Private client portfolios
              </span>
              <h3 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
                Looking for specific sector case studies?
              </h3>
              <p className="mt-3 max-w-[58ch] text-[14px] font-light leading-relaxed text-ink">
                To respect our clients' privacy, our complete project folios for luxury villas, healthcare facilities, hospitality venues, and corporate fit-outs are shared via private presentation or PDF lookbook.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <button
                type="button"
                onClick={() => setPortfolioModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] text-ivory transition-colors duration-500 hover:bg-burgundy"
              >
                Request Full Portfolio
                <IconArrowRight className="h-3.5 w-3.5" />
              </button>
              <a
                href={`${WHATSAPP_URL}?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20view%20your%20complete%20portfolio.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-[14px] text-ink transition-colors duration-500 hover:bg-white"
              >
                <IconMessage className="h-4 w-4 text-ink" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          imageSrc={selectedProject.img}
          title={selectedProject.name}
          subtitle={selectedProject.meta}
          description={selectedProject.narrative}
        />
      )}

      {/* Request Portfolio Interactive Modal */}
      {portfolioModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPortfolioModalOpen(false);
              setRequestSent(false);
            }
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
        >
          <div className="glass-strong relative w-full max-w-lg rounded-[32px] p-8">
            <button
              type="button"
              onClick={() => {
                setPortfolioModalOpen(false);
                setRequestSent(false);
              }}
              className="absolute top-4 right-4 text-ink hover:text-ink text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            {requestSent ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-ink">
                  <IconCheck className="h-7 w-7 text-ink" />
                </div>
                <h4 className="mt-4 font-serif text-2xl font-light text-ink">Portfolio Access Sent</h4>
                <p className="mt-3 text-sm text-ink">
                  Thank you! Our studio team will share the requested sector lookbook and credentials deck to <strong>{clientEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="mt-6 rounded-full bg-ink px-6 py-3 text-[14px] text-ivory hover:bg-burgundy"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePortfolioRequest} className="space-y-5">
                <div>
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
                    Private Lookbook Access
                  </span>
                  <h4 className="mt-2 font-serif text-3xl font-light text-ink">Request Studio Portfolio</h4>
                  <p className="mt-2 text-xs font-light text-ink">
                    Receive our high-resolution design portfolio, project specifications, and execution case studies directly.
                  </p>
                </div>

                <div>
                  <label className="block text-[12px] uppercase tracking-[0.16em] text-ink">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="glass-field mt-1.5"
                  />
                </div>

                <div>
                  <label className="block text-[12px] uppercase tracking-[0.16em] text-ink">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="glass-field mt-1.5"
                  />
                </div>

                <p className="text-[12px] text-ink">
                  Delivered to info@akhominteriors.com. We respect your privacy and will never share your details.
                </p>

                {sendError && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-[13px] text-red-700">
                    Couldn't send just now — please try again or message us on WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-ink py-3.5 text-[14px] text-ivory transition-colors duration-500 hover:bg-burgundy"
                >
                  Send Portfolio Deck
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Parallax, Reveal, LightboxModal } from "./ui";
import { IconArrowRight, IconMaximize, IconMessage, IconCheck } from "./icons";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import pujaCraft from "@/assets/puja-craft.jpg";

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

  const handlePortfolioRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientPhone.trim()) return;
    setRequestSent(true);
  };

  return (
    <section id="work" className="bg-ivory px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/12 pb-8">
            <div>
              <p className="eyebrow text-burgundy">Portfolio & Craft</p>
              <h2
                className="display mt-4 max-w-[16ch] text-ink"
                style={{ fontSize: "clamp(34px, 4.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Rooms we've designed and built.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setPortfolioModalOpen(true)}
              className="group inline-flex items-center gap-3 border border-burgundy bg-burgundy px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-burgundy-hover"
            >
              REQUEST OUR PORTFOLIO →
            </button>
          </div>
        </Reveal>

        {/* Filter Bar (Type & Sectors per G1) */}
        <Reveal delay={1}>
          <div className="mt-8 flex flex-wrap gap-2.5 pb-4">
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
                className={`px-5 py-2 text-[12px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === cat.id
                    ? "bg-burgundy text-ivory font-medium shadow-sm"
                    : "border border-ink/15 text-ink/70 hover:border-burgundy/50 hover:text-ink"
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
                    <div className="relative overflow-hidden bg-stone/40">
                      <img
                        src={p.img}
                        alt={p.alt}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-[4/4.2]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-ivory/30 bg-dark/80 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                        <IconMaximize className="h-3 w-3" />
                        View Full Screen
                      </div>
                    </div>
                  </Parallax>
                  {/* Caption card */}
                  <div className="relative z-10 -mt-12 ml-5 max-w-[88%] border border-ink/10 bg-ivory p-6 shadow-[0_18px_50px_-24px_rgba(20,18,18,0.25)] md:-mt-16 md:ml-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl font-light text-ink">{p.name}</h3>
                      <span className="text-[12px] font-mono tracking-[0.2em] text-burgundy">0{i + 1}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-burgundy">
                      <span>{p.meta}</span>
                      <span>•</span>
                      <span className="text-ink/60">{p.style}</span>
                    </div>
                    <p className="mt-4 text-[13px] font-light leading-relaxed text-ink/80">{p.narrative}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Request Our Portfolio Block (per B6) */}
        <div className="mt-20 border border-burgundy/30 bg-burgundy/[0.04] p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-burgundy">
                Confidential Client Portfolios
              </span>
              <h3 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
                Looking for specific sector case studies?
              </h3>
              <p className="mt-3 max-w-[58ch] text-[14px] font-light leading-relaxed text-ink/75">
                To respect our clients' privacy, our complete project folios for luxury villas, healthcare facilities, hospitality venues, and corporate fit-outs are shared via private presentation or PDF lookbook.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <button
                type="button"
                onClick={() => setPortfolioModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-burgundy px-7 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
              >
                Request Full Portfolio
                <IconArrowRight className="h-3.5 w-3.5" />
              </button>
              <a
                href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20view%20your%20complete%20portfolio."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ink/25 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <IconMessage className="h-4 w-4 text-burgundy" />
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
          className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg border border-ivory/20 bg-ivory p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setPortfolioModalOpen(false);
                setRequestSent(false);
              }}
              className="absolute top-4 right-4 text-ink/60 hover:text-ink text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            {requestSent ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <IconCheck className="h-7 w-7 text-burgundy" />
                </div>
                <h4 className="mt-4 font-serif text-2xl font-light text-ink">Portfolio Access Sent</h4>
                <p className="mt-3 text-sm text-ink/75">
                  Thank you! Our studio team will share the requested sector lookbook and credentials deck to <strong>{clientEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="mt-6 bg-burgundy px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-ivory hover:bg-burgundy-hover"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePortfolioRequest} className="space-y-5">
                <div>
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-burgundy">
                    Private Lookbook Access
                  </span>
                  <h4 className="mt-2 font-serif text-3xl font-light text-ink">Request Studio Portfolio</h4>
                  <p className="mt-2 text-xs font-light text-ink/70">
                    Receive our high-resolution design portfolio, project specifications, and execution case studies directly.
                  </p>
                </div>

                <div>
                  <label className="block text-[12px] uppercase tracking-[0.16em] text-ink/70">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="mt-1.5 w-full border border-ink/20 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-[12px] uppercase tracking-[0.16em] text-ink/70">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="mt-1.5 w-full border border-ink/20 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-burgundy"
                  />
                </div>

                <p className="text-[12px] text-ink/55">
                  Delivered to info@akhominteriors.com. We respect your privacy and will never share your details.
                </p>

                <button
                  type="submit"
                  className="w-full bg-burgundy py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory hover:bg-burgundy-hover"
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

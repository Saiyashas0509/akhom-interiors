import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IconArrowRight, IconCheck, IconX } from "@/components/akhom/icons";
import { BoomerangLogo } from "@/components/boomerang/BoomerangLogo";
import { BoomerangVideoBg } from "@/components/boomerang/BoomerangVideoBg";

export const Route = createFileRoute("/boomerang")({
  head: () => ({
    meta: [
      { title: "Build Lasting Relationships — Boomerang AI" },
      {
        name: "description",
        content:
          "Boomerang is a conversational AI platform for financial institutions — agents that handle the full borrower lifecycle across email, SMS, and voice.",
      },
      { property: "og:title", content: "Build Lasting Relationships — Boomerang AI" },
      {
        property: "og:description",
        content:
          "Conversational AI for regulated financial institutions. Agents that hold a real conversation, plug into your systems, and show their work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: BoomerangPage,
});

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#company" },
];

const FEATURES = [
  {
    number: "01",
    label: "Lifecycle agents",
    detail:
      "Autonomous agents that run outreach, follow-up, and servicing conversations across email, SMS, and voice — from application to payoff.",
  },
  {
    number: "02",
    label: "Core system sync",
    detail:
      "Two-way integrations with your LOS, core, and CRM, so every conversation reads and writes the same borrower record in real time.",
  },
  {
    number: "03",
    label: "Audit-ready compliance",
    detail:
      "Policy guardrails, consent tracking, and a full transcript trail for every interaction — exportable for examiners on request.",
  },
];

const USE_CASES = [
  {
    title: "Loan origination",
    copy: "Chase missing documents, answer product questions, and keep applicants moving without adding headcount.",
  },
  {
    title: "Collections & recovery",
    copy: "Empathetic, compliant payment conversations that surface hardship cases to a human at the right moment.",
  },
  {
    title: "Deposit onboarding",
    copy: "Guide new account holders through funding, direct deposit, and card activation in the channel they prefer.",
  },
  {
    title: "Member servicing",
    copy: "Resolve balance, payoff, and statement questions instantly, and hand off with full context when it matters.",
  },
];

const PRICING_TIERS = [
  {
    name: "Growth",
    price: "$1,999",
    period: "/ month",
    desc: "Ideal for regional credit unions and community banks automating origination follow-ups.",
    features: [
      "Up to 5,000 active monthly conversations",
      "Email & SMS channels",
      "Standard LOS & CRM connectors",
      "99.9% uptime SLA & audit logs",
    ],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "$4,999",
    period: "/ month",
    desc: "For mid-market and national lenders requiring full lifecycle voice and omnichannel agents.",
    features: [
      "Up to 25,000 active monthly conversations",
      "Email, SMS & AI Voice channels",
      "Real-time Core System bi-directional sync",
      "Custom compliance policy guardrails",
      "Dedicated Solutions Architect",
    ],
    popular: true,
  },
  {
    name: "Custom",
    price: "Custom",
    period: "",
    desc: "Tailored deployments for tier-1 financial institutions with private cloud requirements.",
    features: [
      "Unlimited conversation volume",
      "On-premise or private cloud deployment",
      "Custom LLM fine-tuning on house policy",
      "24/7 dedicated support & SLA guarantees",
    ],
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Boomerang picked up 68% of our post-application follow-up. Our loan officers stopped chasing paperwork and started closing.",
    name: "Dana Whitfield",
    role: "SVP Lending, Harbor Point Bank",
  },
  {
    quote:
      "Compliance signed off in three weeks. Every conversation is logged, scoped to policy, and reviewable line by line.",
    name: "Marcus Oyelaran",
    role: "Chief Risk Officer, Meridian Credit Union",
  },
  {
    quote:
      "Right-party contact went up 2.4x and complaints went down. It reads like our best collector on their best day.",
    name: "Priya Raghunathan",
    role: "Director of Servicing, Northline Financial",
  },
];

function BoomerangPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoData, setDemoData] = useState({ name: "", email: "", institution: "" });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoData.name && demoData.email) {
      setDemoSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased">
      <header className="fixed top-0 right-0 left-0 z-50 px-6 py-4 sm:px-10 sm:py-5 md:px-14 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <BoomerangLogo className="h-6 w-6 text-[#191919]" />
            <span className="text-base font-semibold tracking-tight text-[#191919]">
              Boomerang
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#191919]/70 transition-colors duration-200 hover:text-[#191919]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => { setDemoSubmitted(false); setDemoOpen(true); }}
            className="rounded-lg bg-[#191919] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/90"
          >
            Book A Demo
          </button>
        </div>
      </header>

      <section
        id="top"
        className="relative flex h-screen flex-col items-center overflow-hidden"
      >
        <BoomerangVideoBg />

        <div className="relative z-10 flex w-full flex-1 flex-col items-center">
          <div className="flex flex-col items-center px-4 pt-24 text-center sm:px-6 sm:pt-26 md:pt-32">
            <h1 className="font-mackinac text-4xl leading-[1.1] font-normal tracking-tighter text-[#191919] sm:text-5xl md:text-7xl lg:text-8xl">
              Build lasting
              <br />
              relationships.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#191919]/70 sm:mt-6 sm:max-w-md md:mt-8 md:text-base">
              Conversational AI platform for modern financial institutions —
              agents that handle the full borrower lifecycle across email, SMS,
              and voice.
            </p>

            <button
              type="button"
              onClick={() => { setDemoSubmitted(false); setDemoOpen(true); }}
              className="mt-6 rounded-lg bg-[#191919] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/90 sm:mt-8 sm:px-8 sm:py-3.5 md:mt-10"
            >
              Book A Demo
            </button>
          </div>

          <div id="product" className="mt-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="border border-b-0 border-gray-200 bg-white/90 px-5 pt-8 pb-0 shadow-sm backdrop-blur-sm sm:px-8 sm:pt-12 md:px-12 md:pt-16">
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-16">
                <div>
                  <span className="text-[11px] font-medium tracking-[0.2em] text-[#191919]/50 uppercase">
                    What do we do?
                  </span>
                  <h2 className="font-mackinac mt-3 text-2xl leading-tight font-normal tracking-tight sm:text-3xl md:text-4xl">
                    Conversations that
                    <br className="hidden sm:block" />{" "}
                    <span className="sm:hidden"> </span>
                    build momentum
                  </h2>
                </div>
                <div className="flex items-end">
                  <p className="text-sm leading-relaxed text-[#191919]/70 md:text-[15px]">
                    Conversational AI built for regulated financial
                    institutions. Agents that hold a real conversation, plug
                    into the systems you run, and show their work.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gray-200 sm:mt-8 md:mt-10" />

              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-3">
                {FEATURES.map((f) => (
                  <a
                    key={f.number}
                    href="#solutions"
                    className="group flex cursor-pointer items-center justify-between bg-[#F4F3F3] px-4 py-3.5 text-sm text-[#191919] transition-all duration-200 hover:bg-[#eaeaea] sm:px-6 sm:py-4"
                  >
                    <span>
                      <span className="text-[#191919]/40">{f.number}</span>
                      <span className="mx-2 text-[#191919]/30">/</span>
                      <span className="font-medium">{f.label}</span>
                    </span>
                    <IconArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {FEATURES.map((f) => (
            <div key={f.number}>
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#191919]/40 uppercase">
                {f.number}
              </span>
              <h3 className="font-mackinac mt-3 text-xl font-normal tracking-tight text-[#191919] md:text-2xl">
                {f.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#191919]/70">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="solutions"
        className="border-y border-gray-200 bg-[#FAFAFA]"
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 md:py-28">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#191919]/50 uppercase">
            Where teams deploy it
          </span>
          <h2 className="font-mackinac mt-3 max-w-xl text-3xl leading-tight font-normal tracking-tight text-[#191919] md:text-4xl">
            Built for the moments that decide the relationship
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <div key={u.title} className="bg-white p-6 md:p-8">
                <h3 className="text-base font-medium tracking-tight text-[#191919]">
                  {u.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#191919]/70">
                  {u.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 md:py-28">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#191919]/50 uppercase">
          Flexible Plans
        </span>
        <h2 className="font-mackinac mt-3 max-w-xl text-3xl leading-tight font-normal tracking-tight text-[#191919] md:text-4xl">
          Transparent pricing for institutions of any scale
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-xl border p-6 transition-all duration-300 ${
                tier.popular
                  ? "border-[#191919] bg-[#191919] text-white shadow-xl"
                  : "border-gray-200 bg-white text-[#191919]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-bronze px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-medium tracking-tight">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight">{tier.price}</span>
                  <span className={`text-xs ${tier.popular ? "text-gray-300" : "text-gray-500"}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`mt-3 text-xs leading-relaxed ${tier.popular ? "text-gray-300" : "text-gray-600"}`}>
                  {tier.desc}
                </p>
                <ul className="mt-6 space-y-3 border-t border-gray-200/20 pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs">
                      <IconCheck className={`h-4 w-4 shrink-0 ${tier.popular ? "text-bronze" : "text-emerald-600"}`} />
                      <span className={tier.popular ? "text-gray-200" : "text-gray-700"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => { setDemoSubmitted(false); setDemoOpen(true); }}
                className={`mt-8 w-full rounded-lg py-3 text-xs font-medium transition-colors ${
                  tier.popular
                    ? "bg-white text-[#191919] hover:bg-gray-100"
                    : "bg-[#191919] text-white hover:bg-[#191919]/90"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="company"
        className="border-t border-gray-200 bg-[#FAFAFA]"
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 md:py-28">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#191919]/50 uppercase">
            Customers
          </span>
          <h2 className="font-mackinac mt-3 max-w-xl text-3xl leading-tight font-normal tracking-tight text-[#191919] md:text-4xl">
            Trusted inside regulated institutions
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="border-t border-gray-200 pt-6">
                <blockquote className="font-mackinac text-lg leading-snug font-normal tracking-tight text-[#191919]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-[#191919]/60">
                  <span className="font-medium text-[#191919]">{t.name}</span>
                  <br />
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      {demoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setDemoOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <IconX className="h-5 w-5" />
            </button>

            {demoSubmitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <IconCheck className="h-6 w-6" />
                </div>
                <h3 className="font-mackinac mt-4 text-2xl text-[#191919]">Demo Requested</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Thank you, {demoData.name}. An AI Solutions Specialist will contact you at {demoData.email} within 4 business hours to schedule your personalized walkthrough.
                </p>
                <button
                  type="button"
                  onClick={() => setDemoOpen(false)}
                  className="mt-6 w-full rounded-lg bg-[#191919] py-3 text-xs font-medium text-white hover:bg-[#191919]/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <h3 className="font-mackinac text-2xl text-[#191919]">Book a Boomerang Demo</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    See our autonomous lifecycle agents in action with your custom compliance rules.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={demoData.name}
                    onChange={(e) => setDemoData({ ...demoData, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-[#191919] focus:border-[#191919] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@bank.com"
                    value={demoData.email}
                    onChange={(e) => setDemoData({ ...demoData, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-[#191919] focus:border-[#191919] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Institution Name</label>
                  <input
                    type="text"
                    placeholder="First National Credit Union"
                    value={demoData.institution}
                    onChange={(e) => setDemoData({ ...demoData, institution: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-[#191919] focus:border-[#191919] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-[#191919] py-3 text-xs font-medium text-white hover:bg-[#191919]/90"
                >
                  Schedule Demo
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



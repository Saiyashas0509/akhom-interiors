import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/akhom/Nav";
import { SiteFooter } from "@/components/akhom/SiteFooter";

const TITLE = "Terms of Service — AKHOM INTERIORS";
const DESCRIPTION = "Terms and conditions governing architectural design and turnkey fit-out engagements with AKHOM INTERIORS.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Nav solid={true} />
      <main className="px-6 pt-36 pb-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[900px]">
          <p className="eyebrow text-burgundy">Legal Terms</p>
          <h1
            className="display mt-4 text-ink"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}
          >
            Terms of Service
          </h1>
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-ink/50">
            Last Updated: September 2026 • AKHOM INTERIORS, Hyderabad
          </p>

          <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-ink/80">
            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">1. Scope of Website</h2>
              <p className="mt-3">
                This website is owned and operated by AKHOM INTERIORS ("AKHOM"), an interior architecture and turnkey execution studio located in Hyderabad, Telangana. The content, photographs, renders, material specifications, and articles presented herein are for informational and conceptual evaluation by prospective clients.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">2. Turnkey Engagements & Formal Contracts</h2>
              <p className="mt-3">
                Information, estimates, or conceptual drawings displayed on this site do not constitute a binding legal agreement. Turnkey design and fit-out engagements are governed exclusively by formal, written studio contracts executed between AKHOM and the client, defining precise project scopes, bill of quantities (BOQ), material specifications, milestone payment terms, and delivery schedules.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">3. Intellectual Property & Design Rights</h2>
              <p className="mt-3">
                All drawings, concept designs, bespoke joinery profiles, photographs, graphics, and written content displayed on this website are the intellectual property of AKHOM INTERIORS or licensed for editorial demonstration. Unauthorised reproduction, distribution, or commercial use is prohibited without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">4. Enquiries & Direct Communications</h2>
              <p className="mt-3">
                When you initiate communication via our consultation form, WhatsApp, email, or telephone, you confirm that the details provided are accurate and that you are authorised to discuss the relevant property or project space.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">5. Governing Law</h2>
              <p className="mt-3">
                These terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Hyderabad, Telangana.
              </p>
            </section>
          </div>

          <div className="mt-14 border-t border-ink/12 pt-8">
            <Link to="/" className="text-[12px] uppercase tracking-[0.2em] text-burgundy hover:underline">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

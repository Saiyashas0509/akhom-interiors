import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/akhom/Nav";
import { SiteFooter } from "@/components/akhom/SiteFooter";

const TITLE = "Privacy Policy — AKHOM INTERIORS";
const DESCRIPTION =
  "Privacy Policy and data protection standards for AKHOM INTERIORS studio clients and website visitors.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Nav solid={true} />
      <main className="px-6 pt-36 pb-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[900px]">
          <p className="eyebrow text-burgundy">Legal & Data Standards</p>
          <h1
            className="display mt-4 text-ink"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-ink/50">
            Last Updated: September 2026 • AKHOM INTERIORS, Hyderabad
          </p>

          <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-ink/80">
            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">1. Commitment to Client Confidentiality</h2>
              <p className="mt-3">
                AKHOM INTERIORS ("we", "our", "us") values the discretion and privacy of our residential, commercial, healthcare, and hospitality clients. This policy explains how we collect, handle, and safeguard the information you share when submitting an architectural enquiry or engaging our turnkey design and fit-out services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">2. Information We Collect</h2>
              <p className="mt-3">
                When you request a design consultation through our website or direct communication channels, we collect:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-ink/75">
                <li>Your name, email address, and phone or WhatsApp contact number.</li>
                <li>Project details including approximate area, project stage, location, and functional requirements.</li>
                <li>Technical communication logs necessary to coordinate design meetings and site walkthroughs.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">3. How Your Information is Used</h2>
              <p className="mt-3">
                Information provided is transmitted securely to our studio leads at <strong className="font-medium text-ink">info@akhominteriors.com</strong> (with internal copy to <strong className="font-medium text-ink">projects@akhominteriors.com</strong>). We use your data strictly to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-ink/75">
                <li>Schedule and prepare for your architectural consultation.</li>
                <li>Deliver project proposals, material specifications, and design schedules.</li>
                <li>Maintain warranty records and post-handover service documentation.</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade client information to third-party marketing companies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">4. Photography & Project Imagery</h2>
              <p className="mt-3">
                We hold our clients' residential privacy in the highest regard. Architectural photography and case studies of completed homes or workplaces are published only with prior written permission and with private identifiers removed.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-normal text-ink">5. Studio Contact</h2>
              <p className="mt-3">
                If you have questions regarding data privacy or wish to update or delete your enquiry records, please contact:
              </p>
              <div className="mt-4 border border-ink/15 bg-white/60 p-6 text-sm">
                <p className="font-medium text-ink">AKHOM INTERIORS</p>
                <p className="mt-1 text-ink/70">Hyderabad, Telangana</p>
                <p className="mt-1">
                  Email: <a href="mailto:info@akhominteriors.com" className="text-burgundy underline">info@akhominteriors.com</a>
                </p>
                <p className="mt-1">
                  Phone: <a href="tel:+919177361122" className="text-burgundy underline">+91 91773 61122</a>
                </p>
              </div>
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

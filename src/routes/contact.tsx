import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
const heroContact = "/images/curated/page-contact.jpg";
import { ConsultationForm } from "@/components/akhom/ConsultationForm";
import { FinalCta } from "@/components/akhom/FinalCta";
import { EstimateSection } from "@/components/akhom/EstimateSection";

const TITLE = "Contact & Free Estimate — AKHOM Interiors Hyderabad";
const DESCRIPTION =
  "Book a free design consultation and get an instant interior estimate with AKHOM Silver, Gold or Platinum packages in Hyderabad.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Consultation & Enquiries"
      title="Let's talk"
      italic="about your space."
      intro="Share details about your property, requirements, and target timeline. Our lead design team will review your scope and provide structured feedback on how we can collaborate."
      image={heroContact}
      imageAlt="Parallel kitchen beside a carved oak pooja wall"
      meta={["Hyderabad, Telangana", "Mon — Sat", "info@akhominteriors.com"] as const}
    >
      <ConsultationForm />
      <EstimateSection />
      <FinalCta />
    </PageShell>
  );
}

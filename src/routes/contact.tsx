import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroContact from "@/assets/hero-contact.jpg";
import { ConsultationForm } from "@/components/akhom/ConsultationForm";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Contact AKHOM INTERIORS — Schedule an Architectural Consultation";
const DESCRIPTION =
  "Book a 30-minute design consultation for your villa, penthouse, corporate office, or healthcare project in Hyderabad with AKHOM INTERIORS.";

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
      title="Thirty minutes"
      italic="is usually enough."
      intro="Share details about your property, requirements, and target timeline. Our lead design team will review your scope and provide structured feedback on how we can collaborate."
      image={heroContact}
      imageAlt="Minimal meeting room with a stone table, leather chairs and a glowing sheer curtain"
      meta={["Hyderabad, Telangana", "Mon — Sat", "info@akhominteriors.com"] as const}
    >
      <ConsultationForm />
      <FinalCta />
    </PageShell>
  );
}

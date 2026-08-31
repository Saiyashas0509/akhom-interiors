import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroContact from "@/assets/hero-contact.jpg";
import { ConsultationForm } from "@/components/akhom/ConsultationForm";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Contact Akhom Interiors — Book a Consultation";
const DESCRIPTION =
  "Talk to the Akhom Interiors design lead about your villa, apartment or office fit-out in Hyderabad. Studio in Banjara Hills.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
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
      eyebrow="Contact"
      title="Thirty minutes"
      italic="is usually enough."
      intro="Tell us the address, the rooms and the timeline. We'll tell you honestly whether we're the right studio for it."
      image={heroContact}
      imageAlt="Minimal meeting room with a stone table, leather chairs and a glowing sheer curtain"
      meta={["Banjara Hills", "Mon — Sat", "hello@akhom.in"] as const}
    >
      <ConsultationForm />
      <FinalCta />
    </PageShell>
  );
}


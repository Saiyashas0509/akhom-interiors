import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroServices from "@/assets/hero-services.jpg";
import { Services } from "@/components/akhom/Services";
import { FaqSection } from "@/components/akhom/FaqSection";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Interior Design & Fit-Out Services — AKHOM INTERIORS Hyderabad";
const DESCRIPTION =
  "Eight integrated interior architecture and turnkey execution services across residential, commercial, healthcare, hospitality and bespoke joinery in Hyderabad.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell
      eyebrow="Capabilities & Sectors"
      title="Eight disciplines,"
      italic="one accountable team."
      intro="From measured architectural drawings to turnkey execution, MEP engineering, and in-house workshop joinery — all held in one contract."
      image={heroServices}
      imageAlt="Joinery workshop bench with hand planes and timber stacked in daylight"
      meta={["Residential", "Commercial", "Healthcare", "Hospitality"] as const}
    >
      <Services />
      <FaqSection title="Services & Execution FAQs" />
      <FinalCta />
    </PageShell>
  );
}

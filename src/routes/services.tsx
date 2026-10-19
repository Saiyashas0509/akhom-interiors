import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
const heroServices = "/images/curated/page-services.jpg";
import { Services } from "@/components/akhom/Services";
import { FaqSection } from "@/components/akhom/FaqSection";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Interior Design & Fit-Out Services — AKHOM INTERIORS Hyderabad";
const DESCRIPTION =
  "Residential and commercial interiors, modular kitchens, wardrobes, pooja units, painting, civil, electrical, bathroom and false ceiling services in Hyderabad.";

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
      title="Every service,"
      italic="one accountable team."
      intro="Interiors, joinery and site services — painting, civil, electrical, bathrooms and ceilings — delivered by one accountable team."
      image={heroServices}
      imageAlt="Pantry kitchen with stone worktop and wide window"
      meta={["Interiors", "Joinery & Craft", "Site Services"] as const}
    >
      <Services />
      <FaqSection title="Services & Execution FAQs" />
      <FinalCta />
    </PageShell>
  );
}

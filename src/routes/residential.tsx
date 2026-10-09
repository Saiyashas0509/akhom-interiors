import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroResidential from "@/assets/hero-residential.jpg";
import { Segments } from "@/components/akhom/Segments";
import { CustomCraft } from "@/components/akhom/CustomCraft";
import { FaqSection } from "@/components/akhom/FaqSection";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Residential Interior Architecture — AKHOM INTERIORS Hyderabad";
const DESCRIPTION =
  "Luxury villas, penthouses, apartments and farmhouses across Hyderabad — custom kitchens, wardrobes, joinery and turnkey execution by AKHOM INTERIORS.";

export const Route = createFileRoute("/residential")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/residential" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: ResidentialPage,
});

function ResidentialPage() {
  return (
    <PageShell
      eyebrow="Residential Practice"
      title="Homes built around"
      italic="how you actually live."
      intro="Villas, luxury penthouses, and private estates across Hyderabad — planned, detailed and executed by one unified in-house team."
      image={heroResidential}
      imageAlt="Villa living room at dusk with fluted timber wall and full-height glazing"
      meta={["Luxury Villas", "Apartments", "Farmhouses", "Custom Mandirs"] as const}
    >
      <Segments heading={false} only="residential" />
      <CustomCraft />
      <FaqSection title="Residential Architecture FAQs" />
      <FinalCta />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroResidential from "@/assets/hero-residential.jpg";
import { Segments } from "@/components/akhom/Segments";
import { CustomCraft } from "@/components/akhom/CustomCraft";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Residential Interior Design in Hyderabad — Akhom Interiors";
const DESCRIPTION =
  "Villas, apartments and farmhouses in Banjara Hills, Jubilee Hills and Kokapet — kitchens, wardrobes, joinery and turnkey execution by Akhom Interiors.";

export const Route = createFileRoute("/residential")({
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
  component: ResidentialPage,
});

function ResidentialPage() {
  return (
    <PageShell
      eyebrow="Residential"
      title="Homes built around"
      italic="how you actually live."
      intro="From a 3BHK in Banjara Hills to a weekend farmhouse outside the city — planned, detailed and executed by one team."
      image={heroResidential}
      imageAlt="Villa living room at dusk with fluted timber wall and full-height glazing"
      meta={["Villas", "Apartments", "Farmhouses"] as const}
    >
      <Segments heading={false} only="residential" />
      <CustomCraft />
      <FinalCta />
    </PageShell>
  );
}

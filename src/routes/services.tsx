import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroServices from "@/assets/hero-services.jpg";
import { Services } from "@/components/akhom/Services";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Interior Design Services in Hyderabad — Akhom Interiors";
const DESCRIPTION =
  "Space planning, 3D visualisation, custom joinery, turnkey execution and renovation for homes and offices across Hyderabad.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Design, detail,"
      italic="craft and execution."
      intro="Four disciplines held by one team — from the first measured drawing to the day you get the keys back."
      image={heroServices}
      imageAlt="Joinery workshop bench with hand planes and timber stacked in daylight"
      meta={["Design", "Detail", "Craft", "Execution"] as const}
    >
      <Services />
      <FinalCta />
    </PageShell>
  );
}

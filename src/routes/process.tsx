import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroProcess from "@/assets/hero-process.jpg";
import { Process } from "@/components/akhom/Process";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Seven Stages Delivery Process — AKHOM INTERIORS Hyderabad";
const DESCRIPTION =
  "Consultation, concept, design development, materials, execution, quality audit, and handover — the structured seven-stage delivery process of AKHOM INTERIORS.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/process" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <PageShell
      eyebrow="Our Methodology"
      title="A schedule,"
      italic="not an estimate."
      intro="Every stage has a dedicated owner, an architectural drawing package, and committed milestones. You always know what is occurring on site this week."
      image={heroProcess}
      imageAlt="New walnut joinery under protective film with a plumb line and chalk marks on plaster"
      meta={["Seven stages", "One team", "Fixed dates"] as const}
    >
      <Process />
      <FinalCta />
    </PageShell>
  );
}

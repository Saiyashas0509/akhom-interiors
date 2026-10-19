import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
const heroProcess = "/images/curated/page-process.jpg";
import { ProcessScroll } from "@/components/akhom/ProcessScroll";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "How We Work — AKHOM INTERIORS Hyderabad";
const DESCRIPTION =
  "Consultation, design, materials, execution and handover — how AKHOM Interiors delivers your space, step by step.";

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
      imageAlt="Floating TV unit against a plaster feature wall with concealed lighting"
      meta={["Consultation", "Design", "Execution", "Handover"] as const}
    >
      <ProcessScroll />
      <FinalCta />
    </PageShell>
  );
}

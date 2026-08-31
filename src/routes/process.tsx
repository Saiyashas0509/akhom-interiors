import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroProcess from "@/assets/hero-process.jpg";
import { Process } from "@/components/akhom/Process";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Our Process — How Akhom Interiors Delivers";
const DESCRIPTION =
  "Consultation, design, material selection, execution and handover — the Akhom Interiors process, stage by stage, with dates you can hold us to.";

export const Route = createFileRoute("/process")({
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
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <PageShell
      eyebrow="Our process"
      title="A schedule,"
      italic="not an estimate."
      intro="Every stage has an owner, a drawing set and a date. You always know what is happening on site this week."
      image={heroProcess}
      imageAlt="New walnut joinery under protective film with a plumb line and chalk marks on plaster"
      meta={["Six stages", "One team", "Fixed dates"] as const}
    >
      <Process />
      <FinalCta />
    </PageShell>
  );
}

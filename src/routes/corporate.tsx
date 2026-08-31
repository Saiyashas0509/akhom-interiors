import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroCorporate from "@/assets/hero-corporate.jpg";
import { Segments } from "@/components/akhom/Segments";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Corporate & Commercial Fit-Outs — Akhom Interiors";
const DESCRIPTION =
  "Office, retail and experience-centre fit-outs across Hyderabad. Workstations to boardrooms, MEP and IT coordination, handed over ready to occupy.";

export const Route = createFileRoute("/corporate")({
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
  component: CorporatePage,
});

function CorporatePage() {
  return (
    <PageShell
      eyebrow="Corporate & commercial"
      title="Fit-outs for teams"
      italic="that can't lose a week."
      intro="Offices, showrooms and experience centres delivered on the date we agreed — MEP and IT coordination included."
      image={heroCorporate}
      imageAlt="Double-height corporate lobby with fluted stone wall and floating dark oak reception desk"
      meta={["Offices", "Retail", "Experience centres"] as const}
    >
      <Segments heading={false} only="corporate" />
      <FinalCta />
    </PageShell>
  );
}

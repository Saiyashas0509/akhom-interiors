import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
const heroCorporate = "/images/curated/page-corporate.jpg";
import { Segments } from "@/components/akhom/Segments";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Commercial, Corporate, Healthcare & Hospitality Fit-Outs — AKHOM INTERIORS";
const DESCRIPTION =
  "Offices, GCC centres, healthcare clinics, hotels and retail fit-outs in Hyderabad. MEP coordination, acoustic engineering and turnkey delivery on schedule.";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/corporate" },
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
      eyebrow="Commercial & Institutional Practice"
      title="Fit-outs for teams"
      italic="that cannot afford delays."
      intro="Corporate offices, GCC campuses, healthcare facilities, and hospitality venues delivered on guaranteed handover dates — complete with civil, MEP and acoustic certification."
      image={heroCorporate}
      imageAlt="Office cabin with grey panelling and wide window"
      meta={["Offices & GCC", "Healthcare & Clinics", "Hotels & F&B", "Retail Flagships"] as const}
    >
      <Segments heading={false} only="corporate" />
      <FinalCta />
    </PageShell>
  );
}

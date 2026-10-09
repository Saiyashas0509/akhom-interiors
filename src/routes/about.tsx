import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroAbout from "@/assets/hero-about.jpg";
import { Approach } from "@/components/akhom/Approach";
import { WhyAkhom } from "@/components/akhom/WhyAkhom";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "About AKHOM INTERIORS — Hyderabad Design & Build Studio";
const DESCRIPTION =
  "How AKHOM INTERIORS works: material honesty, textural narrative and a timeless architectural palette, delivered by one accountable Hyderabad studio.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="The Studio"
      title="Rooms decided"
      italic="long before furnishing."
      intro="AKHOM INTERIORS is an architectural interior design and turnkey fit-out studio based in Hyderabad. Architectural drawings, material procurement, workshop joinery, and site execution remain under one roof."
      image={heroAbout}
      imageAlt="Design studio interior with drawings pinned to the wall and material samples on an oak worktable"
      meta={["In-House Joinery", "Hyderabad Studio", "Design + Build"] as const}
    >
      <Approach />
      <WhyAkhom />
      <FinalCta />
    </PageShell>
  );
}

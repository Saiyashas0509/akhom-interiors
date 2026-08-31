import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroAbout from "@/assets/hero-about.jpg";
import { Approach } from "@/components/akhom/Approach";
import { WhyAkhom } from "@/components/akhom/WhyAkhom";

const TITLE = "About Akhom Interiors — Studio & Design Philosophy";
const DESCRIPTION =
  "How Akhom Interiors works: material honesty, textural narrative and a timeless palette, delivered by one accountable Hyderabad studio.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="The studio"
      title="Rooms decided"
      italic="long before furnishing."
      intro="Akhom Interiors is a Hyderabad design and build studio. Drawings, materials, joinery and site work stay under one roof, so what is promised on paper is what gets handed over."
      image={heroAbout}
      imageAlt="Design studio interior with drawings pinned to the wall and material samples on an oak worktable"
      meta={["Founded 2016", "Hyderabad", "Design + build"] as const}
    >
      <Approach />
      <WhyAkhom />
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
import heroProjects from "@/assets/hero-projects.jpg";
import { SelectedWork } from "@/components/akhom/SelectedWork";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Selected Projects — Akhom Interiors Hyderabad";
const DESCRIPTION =
  "Villas, apartments, boardrooms and boutiques designed and built by Akhom Interiors across Jubilee Hills, Banjara Hills and the Financial District.";

export const Route = createFileRoute("/projects")({
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
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Selected work"
      title="A short list,"
      italic="chosen carefully."
      intro="Each project below is finished, occupied and photographed as built — no renders standing in for rooms."
      image={heroProjects}
      imageAlt="Walnut sideboard against a honed travertine wall in warm directional light"
      meta={["Residential", "Corporate", "2016 — 2026"] as const}
    >
      <SelectedWork />
      <FinalCta />
    </PageShell>
  );
}

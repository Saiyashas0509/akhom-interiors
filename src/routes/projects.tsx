import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/akhom/PageShell";
const heroProjects = "/images/curated/page-projects.jpg";
import { SelectedWork } from "@/components/akhom/SelectedWork";
import { ProjectGallery } from "@/components/akhom/ProjectGallery";
import { FinalCta } from "@/components/akhom/FinalCta";

const TITLE = "Projects — AKHOM Interiors Hyderabad";
const DESCRIPTION =
  "Finished homes, kitchens, wardrobes, pooja units and workplaces designed and built by AKHOM Interiors in Hyderabad.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://akhominteriors.com/projects" },
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
      eyebrow="Architectural Folios"
      title="A curated selection,"
      italic="crafted with intention."
      intro="Our portfolio reflects our material discipline, in-house joinery capabilities, and meticulous architectural execution across Hyderabad."
      image={heroProjects}
      imageAlt="Living room with brass-framed partition, oak storage and layered ceiling lights"
      meta={["Residential", "Commercial", "Healthcare", "Workshop Craft"] as const}
    >
      <SelectedWork />
      <ProjectGallery />
      <FinalCta />
    </PageShell>
  );
}

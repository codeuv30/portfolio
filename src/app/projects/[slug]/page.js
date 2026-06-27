import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";

export default async function Page({ params }) {

    const { slug } = await params;

    const index = projects.findIndex((p) => p.slug === slug);
    const project = projects[index];

  return (
    <>

      <ProjectPage project={project} />
    </>
  );
}

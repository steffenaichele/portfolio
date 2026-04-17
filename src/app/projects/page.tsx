import { getPublicProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    const projects = getPublicProjects();

    return (
		<section className="pt-50 px-5 flex flex-col gap-24">
			<h1 className="5xl-regular">
				Projekte
			</h1>
			<ul className="flex flex-col gap-20">
				{projects.map((project) => (
					<li key={project.slug}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}


import { getPublicProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    const projects = getPublicProjects();

    return (
		<section className="layout-grid">
			<h1 className="col-start-3 -col-end-3 row-start-1 row-end-2">
				Projekte
			</h1>
			<ul className="col-start-2 -col-end-2 row-start-2 row-end-3">
				{projects.map((project) => (
					<li key={project.slug}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}


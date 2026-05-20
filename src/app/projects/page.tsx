import type { Metadata } from "next";
import { getPublicProjects } from "../data/content";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
	title: "Projekte – Steffen Aichele",
	description:
		"Ausgewählte Projekte von Steffen Aichele – UX/UI Design und Web Development.",
};

export default function ProjectsPage() {
    const projects = getPublicProjects();

    return (
		<section className="pt-50 flex flex-col gap-24">
			<h1 className="text-4xl text-[var(--color-text-primary)]">
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


import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPublicProjects } from "../data/content";
import ProjectCard from "../components/ProjectCard";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('projects');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function ProjectsPage() {
	const t = await getTranslations('projects');
	const projects = getPublicProjects();

	return (
		<section className="pt-50 flex flex-col gap-24">
			<h1 className="text-4xl text-[var(--color-text-primary)]">
				{t('page_title')}
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


import { getProjectBySlug, projects } from "@/app/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
	params: { slug: string };
};

export default function ProjectPage({ params }: Props) {
	const project = getProjectBySlug(params.slug);

	if (!project) notFound();

	return (
		<>
			<img src={project.coverImage} alt={project.title} />
			<h1 className="text-4xl font-bold mt-8">{project.title}</h1>
			<p className="mt-4 text-lg">{project.description}</p>
		</>
	);
}

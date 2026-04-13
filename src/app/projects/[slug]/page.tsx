import { getProjectBySlug, projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) notFound();

	return (
		<>
			<Image
				src={project.coverImage}
				alt={project.title}
				width={1200}
				height={800}
				priority
				className="w-full h-auto"
			/>
			<h1 className="text-4xl font-bold mt-8">{project.title}</h1>
			<p className="mt-4 text-lg">{project.description}</p>
		</>
	);
}

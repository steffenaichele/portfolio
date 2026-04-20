import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		return {
			title: "Projekt nicht gefunden – Steffen Aichele",
		};
	}

	return {
		title: `${project.title} – Steffen Aichele`,
		description: project.description,
	};
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) notFound();

	return (
		<section className="px-5 flex flex-col gap-24">
			<Image
				src={project.coverImage}
				alt={project.title}
				width={1200}
				height={800}
				priority
				className="w-full aspect-[2/2.5] bg-amber-300 border border-surface-stroke rounded-bl-(--radius-squircle-lg) rounded-br-(--radius-squircle-lg) corner-squircle shadow-(--shadow-soft) object-cover"
			/>
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-normal">{project.title}</h1>
				<p className="text-base font-normal text-(--color-text-tertiary)">
					{project.description}
				</p>
			</div>
		</section>
	);
}

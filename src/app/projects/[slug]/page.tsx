import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/app/data/content";
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
	const t = await getTranslations('projects');

	if (!project) {
		return { title: t('not_found_title') };
	}

	return {
		title: `${t(`${slug}.title` as Parameters<typeof t>[0])} – Steffen Aichele`,
		description: t(`${slug}.description` as Parameters<typeof t>[0]),
	};
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) notFound();

	const t = await getTranslations('projects');
	const title = t(`${slug}.title` as Parameters<typeof t>[0]);
	const description = t(`${slug}.description` as Parameters<typeof t>[0]);

	return (
		<section className="px-5 flex flex-col gap-24">
			<Image
				src={project.coverImage}
				alt={title}
				width={1200}
				height={800}
				priority
				className="w-full aspect-[2/2.5] bg-amber-300 border border-surface-stroke rounded-bl-(--radius-squircle-lg) rounded-br-(--radius-squircle-lg) corner-squircle shadow-[var(--shadow-soft)] object-cover"
			/>
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-normal">{title}</h1>
				<p className="text-base font-normal text-(--color-text-tertiary)">
					{description}
				</p>
			</div>
		</section>
	);
}

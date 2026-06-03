import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import type { CVEntry } from "@/app/data/cv";
import { CVItem } from "@/app/components/CVItem";
import { Tag } from "@/app/components/Tag";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('cv');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function CVPage() {
	const t = await getTranslations('cv');
	const messages = await getMessages() as { cv: { experience: CVEntry[]; education: CVEntry[]; skills: string[] } };
	const { experience, education, skills } = messages.cv;

	return (
		<>
			<section className="pt-80 flex flex-col gap-4">
				<h1 className="text-4xl text-[var(--color-text-primary)]">
					{t('page_title')}
				</h1>
				<p className="text-lg text-[var(--color-text-tertiary)]">
					{t('page_subtitle')}
				</p>
			</section>

			<section aria-labelledby="experience-heading">
				<h2
					id="experience-heading"
					className="text-3xl mb-8 text-[var(--color-text-primary)]">
					{t('experience_heading')}
				</h2>
				<ul className="flex flex-col gap-6">
					{experience.map((entry) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="experience"
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="education-heading">
				<h2
					id="education-heading"
					className="text-3xl mb-8 text-[var(--color-text-primary)]">
					{t('education_heading')}
				</h2>
				<ul className="flex flex-col gap-6">
					{education.map((entry) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="education"
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="skills-heading">
				<h2
					id="skills-heading"
					className="text-3xl mb-8 text-[var(--color-text-primary)]">
					{t('skills_heading')}
				</h2>
				<div className="flex flex-wrap gap-2">
					{skills.map((skill) => (
						<Tag key={skill}>{skill}</Tag>
					))}
				</div>
			</section>
		</>
	);
}

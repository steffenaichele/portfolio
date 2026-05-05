import type { Metadata } from "next";
import { experience, education, skills } from "@/app/data/cv_de";
import { CVExperienceItem } from "@/app/components/CVExperienceItem";
import { CVEducationItem } from "@/app/components/CVEducationItem";
import { Tag } from "@/app/components/Tag";

export const metadata: Metadata = {
	title: "Lebenslauf – Steffen Aichele",
	description:
		"Beruflicher Werdegang und Ausbildung von Steffen Aichele, UI Designer & Frontend Developer.",
};

export default function CVPage() {
	return (
		<>
			<section className="pt-80 flex flex-col gap-4">
				<h1 className="text-4xl text-[var(--color-text-primary)]">
					Servus, Moin & Hallo
				</h1>
				<p className="text-lg text-[var(--color-text-tertiary)]">
					Designer mit Hintergrund in Interaktionsgestaltung und
					Full-Stack-Webentwicklung. Ich arbeite gerne an der
					Schnittstelle von Design und Code und bringe Begeisterung in
					jedes Projekt mit.
				</p>
			</section>

			<section aria-labelledby="experience-heading">
				<h2
					id="experience-heading"
					className="text-3xl mb-8 text-[var(--color-text-priamry)]">
					Berufserfahrung
				</h2>
				<ul>
					{experience.map((entry, index) => (
						<CVExperienceItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							isLast={index === experience.length - 1}
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="education-heading">
				<h2
					id="education-heading"
					className="text-3xl mb-8 text-[var(--color-text-primary)]">
					Ausbildung
				</h2>
				<ul>
					{education.map((entry, index) => (
						<CVEducationItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							isLast={index === education.length - 1}
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="skills-heading">
				<h2
					id="skills-heading"
					className="text-3xl mb-8 text-[var(--color-text-primary)]">
					Skills
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

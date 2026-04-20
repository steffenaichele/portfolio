import type { Metadata } from "next";
import { experience, education, skills } from "@/app/data/cv";
import { CVEntryItem } from "@/app/components/CVEntryItem";
import { Tag } from "@/app/components/Tag";

export const metadata: Metadata = {
	title: "Lebenslauf – Steffen Aichele",
	description:
		"Beruflicher Werdegang und Ausbildung von Steffen Aichele, UI Designer & Frontend Developer.",
};

export default function CVPage() {
	return (
		<>
			<section className="pt-50 px-5 flex flex-col gap-4">
				<h1 className="text-4xl text-(--color-text-primary)">
					Servus, Moin & Hallo
				</h1>
				<p className="text-lg text-(--color-text-tertiary)">
					Designer mit Hintergrund in Interaktionsgestaltung und
					Full-Stack-Webentwicklung. Ich arbeite gerne an der
					Schnittstelle von Design und Code und bringe Begeisterung in
					jedes Projekt mit.
				</p>
			</section>

			<section aria-labelledby="experience-heading" className="px-5">
				<h2
					id="experience-heading"
					className="text-3xl mb-8 text-(--color-text-secondary)">
					Erfahrung
				</h2>
				<ul>
					{experience.map((entry) => (
						<CVEntryItem
							key={entry.organization}
							entry={entry}
							type="experience"
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="education-heading" className="px-5">
				<h2
					id="education-heading"
					className="text-2xl mb-8 text-(--color-text-secondary)">
					Ausbildung
				</h2>
				<ul>
					{education.map((entry) => (
						<CVEntryItem
							key={entry.organization}
							entry={entry}
							type="education"
						/>
					))}
				</ul>
			</section>

			<section aria-labelledby="skills-heading" className="px-5 layout-grid">
				<h2
					id="skills-heading"
					className="text-2xl mb-8 text-(--color-text-secondary)">
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

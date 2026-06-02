"use client";

import { useTranslations, useMessages } from "next-intl";

import { CVItem } from "./CVItem";
import TabGroup from "./TabGroup";
import type { CVEntry } from "../data/cv";

export default function CVSection() {
	const t = useTranslations("cv");
	const messages = useMessages() as {
		cv: { experience: CVEntry[]; education: CVEntry[] };
	};
	const { experience, education } = messages.cv;

	const tabs = [
		{
			label: t("experience_heading"),
			content: (
				<ul className="flex flex-col gap-1">
					{experience.map((entry) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="experience"
						/>
					))}
				</ul>
			),
		},
		{
			label: t("education_heading"),
			content: (
				<ul className="flex flex-col gap-1">
					{education.map((entry) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="education"
						/>
					))}
				</ul>
			),
		},
	];

	return (
		<section className="flex flex-col gap-10 px-5">
			<span className="w-full h-[1px] bg-[var(--color-divider)]"></span>
			<div className="w-full">
				<TabGroup tabs={tabs}/>
			</div>
		</section>
	);
}

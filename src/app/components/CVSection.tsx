"use client";

import { useTranslations, useMessages } from "next-intl";

import { CVItem, SUMMARY_HEIGHT } from "./CVItem";
import TabGroup from "./TabGroup";
import type { CVEntry } from "../data/cv";

export default function CVSection() {
	const t = useTranslations("cv");
	const messages = useMessages() as {
		cv: { experience: CVEntry[]; education: CVEntry[] };
	};
	const { experience, education } = messages.cv;

	// Feste Panel-Höhe = Tab mit den meisten Items (geschlossen), damit das
	// Layout beim Wechsel nicht springt.
	const panelMinHeight =
		Math.max(experience.length, education.length) * SUMMARY_HEIGHT;

	const tabs = [
		{
			label: t("experience_heading"),
			content: (
				<ul className="cv-list flex flex-col">
						<span
							aria-hidden
							className="cv-pill rounded-[var(--radius-tab)]"
						/>
					{experience.map((entry, idx) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="experience"
							isFirst={idx === 0}
							isLast={idx === experience.length - 1}
						/>
					))}
				</ul>
			),
		},
		{
			label: t("education_heading"),
			content: (
				<ul className="cv-list flex flex-col">
						<span
							aria-hidden
							className="cv-pill rounded-[var(--radius-tab)]"
						/>
					{education.map((entry, idx) => (
						<CVItem
							key={`${entry.organization}-${entry.roles[0].startYear}`}
							entry={entry}
							variant="education"
							isFirst={idx === 0}
							isLast={idx === education.length - 1}
						/>
					))}
				</ul>
			),
		},
	];

	return (
		<section className="flex flex-col gap-6 ">
			<span className="w-full h-[1px] bg-[var(--color-divider)]"></span>
			<div className="w-auto -mx-3">
				<TabGroup tabs={tabs} panelMinHeight={panelMinHeight} />
			</div>
		</section>
	);
}

"use client";

import { useTranslations, useMessages } from "next-intl";

import ActionWrapper from "./ActionWrapper";
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

	// Beide Tabs rendern dieselbe Liste, nur Daten und Variante unterscheiden sich.
	const cvList = (
		entries: CVEntry[],
		variant: "experience" | "education",
	) => (
		<ActionWrapper>
			<ul className="flex flex-col">
				{entries.map((entry, idx) => (
					<CVItem
						key={`${entry.organization}-${entry.roles[0].startYear}`}
						entry={entry}
						variant={variant}
						isFirst={idx === 0}
						isLast={idx === entries.length - 1}
					/>
				))}
			</ul>
		</ActionWrapper>
	);

	const tabs = [
		{
			label: t("experience_heading"),
			content: cvList(experience, "experience"),
		},
		{
			label: t("education_heading"),
			content: cvList(education, "education"),
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

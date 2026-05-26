"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import Icon from "./Icon";
import Button from "./Button";
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
				<ul className="flex flex-col gap-6">
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
				<ul className="flex flex-col gap-6">
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
		<section className="flex flex-col gap-5 items-end">
			<div className="w-full">
				<TabGroup tabs={tabs} />
			</div>
			<Button href="/cv" size="md" content="iconRight">
				{t("cv_button")}
				<Icon icon={ArrowRight} />
			</Button>
		</section>
	);
}

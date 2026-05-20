"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import Icon from "./Icon";
import Button from "./Button";
import type { CVEntry } from "../data/cv";

function getYearRange(entry: CVEntry) {
	const startYears = entry.roles.map((r) => r.startYear);
	const endYears = entry.roles.map((r) => r.endYear);
	return {
		startYear: Math.min(...startYears),
		endYear: Math.max(...endYears),
	};
}

export default function CVSection() {
	const t = useTranslations('cv');
	const messages = useMessages() as { cv: { experience: CVEntry[]; education: CVEntry[] } };

	const entries = [
		...messages.cv.experience.map((entry) => ({ ...entry, type: "experience" as const })),
		...messages.cv.education.map((entry) => ({ ...entry, type: "education" as const })),
	].sort((a, b) => getYearRange(b).endYear - getYearRange(a).endYear);

	return (
		<section className="flex flex-col gap-5 items-end">
			<div className="w-full flex flex-col gap-2 p-5 bg-[var(--color-surface-bg)] border border-[var(--color-surface-stroke)] shadow-[var(--shadow-soft)] rounded-[var(--radius-surface)] corner-squircle">
				{entries.map((entry) => {
					const { startYear, endYear } = getYearRange(entry);
					return (
						<div
							key={`${entry.organization}-${startYear}`}
							className="h-7 flex flex-row justify-between items-center gap-4">
							<h4 className="text-base text-[var(--color-text-primary)] truncate">
								<span className="md:hidden">
									{entry.organizationShort}
								</span>
								<span className="hidden md:block">
									{entry.organization}
								</span>
							</h4>
							<div
								className={`${entry.type === "education" ? "bg-[var(--color-badge-edu-bg)]" : "bg-[var(--color-badge-exp-bg)]"} h-full border-[var(--color-badge-stroke)] border text-nowrap flex items-center gap-1 flex-none text-base tabular-nums tracking-tight text-[var(--color-text-primary)] px-2 rounded-[var(--radius-squircle-sm)] corner-squircle`}>
								<span className="sr-only">
									{t(entry.type === "education" ? "education_sr_label" : "experience_sr_label")}
								</span>
								<span>{startYear}</span>
								<span>-</span>
								<span>{endYear}</span>
							</div>
						</div>
					);
				})}
			</div>
			<Button href="/cv" size="md" content="iconRight">
				{t('cv_button')}
				<Icon icon={ArrowRight} />
			</Button>
		</section>
	);
}

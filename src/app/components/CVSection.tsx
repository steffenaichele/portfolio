import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Button from "./Button";

import { experience, education } from "../data/cv_de";
import { getYearRange } from "../data/cv_de";

//Combine experence and education arrays and add a corresponding tag
const entries = [
	...experience.map((entry) => ({ ...entry, type: "experience" })),
	...education.map((entry) => ({ ...entry, type: "education" })),
];

//Sort entries by their overall year range (startYear of the earliest role to endYear of the latest role)
entries.sort((a, b) => {
	const aRange = getYearRange(a);
	const bRange = getYearRange(b);
	return bRange.endYear - aRange.endYear; // Sort in descending order (most recent first)
});

export default function CVSection() {
	return (
		<section className="flex flex-col gap-5 items-end">
			<div className="w-full flex flex-col gap-2 pl-5 pr-4 py-6 bg-[var(--color-surface-bg)] border border-[var(--color-surface-stroke)] shadow-[var(--shadow-soft)] rounded-[var(--radius-surface)] corner-squircle">
				{entries.map((entry) => {
					const { startYear, endYear } = getYearRange(entry);
					return (
						<div
							key={entry.organization}
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
									{entry.type === "education"
										? "Bildung"
										: "Berufserfahrung"}
								</span>
								<span>{startYear}</span>
								<span>-</span>
								<span>{endYear}</span>
							</div>
						</div>
					);
				})}
			</div>
			<Button href="/cv" content="iconRight">
				CV ansehen
				<Icon icon={ArrowRight} />
			</Button>
		</section>
	);
}

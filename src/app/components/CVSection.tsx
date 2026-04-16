import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Button from "./Button";

import { experience, education } from "../data/cv";
import { getYearRange } from "../data/cv";

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
		<section className="layout-grid">
			<div className="col-start-1 -col-end-1 xl:col-end-4 row-start-2 row-end-3 flex flex-col gap-2 px-4 py-5 bg-(--color-surface-bg) border border-surface-stroke shadow-(--shadow) rounded-(--radius-surface) corner-squircle">
				{entries.map((entry) => {
					const { startYear, endYear } = getYearRange(entry);
					return (
						<div
							key={entry.organization}
							className="h-8 flex flex-row justify-between items-center gap-4">
							<h4 className="truncate">
								<span className="md:hidden">{entry.organizationShort}</span>
								<span className="hidden md:block">{entry.organization}</span>
							</h4>
							<div
								className={`${entry.type === "education" ? "bg-(--color-badge-education-bg)" : "bg-(--color-badge-experience-bg)"} h-full border-badge-stroke border text-nowrap flex items-center gap-1 flex-none p-number px-3 rounded-(--radius-squircle-sm) corner-squircle tabular-nums`}>
								<span className="sr-only">
									{entry.type === "education" ? "Bildung" : "Berufserfahrung"}
								</span>
								<span>{startYear}</span>
								<Icon icon={ArrowRight} />
								<span>{endYear}</span>
							</div>
						</div>
					);
				})}
			</div>
			<div className="col-start-1 -col-end-1 xl:col-end-4 row-start-3 xl:row-start-1 row-end-4 xl:row-end-2 flex justify-end">
				<Button href="/about-me" content="iconRight">
					CV ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
}

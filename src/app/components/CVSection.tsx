import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

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
		<section className="layout-grid gap-y-9 xl:gap-y-7">
			<h3 className="col-start-3 xl:col-start-1 -col-end-3 xl:col-end-2 row-start-1 row-end-2">
				experience
			</h3>
			<div className="col-start-2 xl:col-start-1 -col-end-2 xl:col-end-4 row-start-2 row-end-3 flex flex-col gap-2 px-5 py-7 bg-(--color-surface) rounded-2xl corner-squircle">
				{entries.map((entry) => {
					const { startYear, endYear } = getYearRange(entry);
					return (
						<div
							key={entry.organization}
							className="h-8 flex flex-row justify-between items-center gap-4">
							<h4 className="truncate">
								{entry.organizationShort}
							</h4>
							<div
								className={`${entry.type === "education" ? "bg-(--color-badge-education-bg)" : "bg-(--color-badge-experience-bg)"} h-full text-nowrap flex items-center gap-1 flex-none p-number px-3 rounded-lg corner-squircle`}>
								<span>{startYear}</span>
								<Icon icon={ArrowRight} />
								<span>{endYear}</span>
							</div>
						</div>
					);
				})}
			</div>
			<div className="col-start-2 -col-end-2 xl:col-end-4 row-start-3 xl:row-start-1 row-end-4 xl:row-end-2">
				<Button content="iconRight" variant="primary">
					CV ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
}

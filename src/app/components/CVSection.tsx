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
			<h3 className="col-start-3 xl:col-start-1 -col-end-3 xl:col-end-2 row-start-1 row-end-2 text-(--text-tertiary)">
				experience
			</h3>
			<div className="col-start-2 xl:col-start-1 -col-end-2 xl:col-end-4 row-start-2 row-end-3 flex flex-col gap-y-3 px-4 py-5 bg-neutral-100 rounded-2xl corner-squircle border border-neutral-300">
				{entries.map((entry) => {
					const { startYear, endYear } = getYearRange(entry);
					return (
						<dl
							key={entry.organization}
							className="flex flex-col gap-1">
							<dt>{entry.organization}</dt>
							<dd
								className={`entry.type === "education" ? "bg-()" : "bg-()"} p-3 rounded-lg corner-squircle`}>
								{startYear} → {endYear}
							</dd>
						</dl>
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

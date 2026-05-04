import type { CVEntry } from "../data/cv_de";

interface CVEducationItemProps {
	entry: CVEntry;
	isLast?: boolean;
}

export function CVEducationItem({
	entry,
	isLast = false,
}: CVEducationItemProps) {
	const indicatorColor = "var(--color-cvindicator-bg-edu)";
	const role = entry.roles[0]; // Education entries have single role

	const lineClasses = isLast ? "hidden" : "visible";

	return (
		<li>
			<div className="bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] flex flex-col gap-4 px-5 py-6">
				<h2 className="text-xl font-medium text-[var(--color-text-primary)]">
					<span className="mr-1 text-pretty">{role.title}</span>
					<span className="px-2 py-1 text-sm font-medium text-nowrap tabular-nums text-[var(--color-text-primary)] bg-sky-100 rounded-[var(--radius-squircle-sm)] corner-squircle">
						{role.startMonth} {role.startYear} {" - "}
						{role.endMonth} {role.endYear}
					</span>
				</h2>

				<h3 className="text-md font-medium text-[var(--color-text-primary)]">
					{entry.organization},{" "}
					<span className=" text-[var(--color-text-secondary)]">
						{entry.location}
					</span>
				</h3>

				{entry.descriptionShort && (
					<p className="text-base leading-7 text-[var(--color-text-secondary)] pt-2 pb-1 mb-2">
						{entry.descriptionShort}
					</p>
				)}
			</div>
			<div className={`w-0.5 h-6 ml-10 bg-[var(--color-cvindicator-line)] ${lineClasses}`}></div>
		</li>
	);
}

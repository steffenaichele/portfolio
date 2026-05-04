import type { CVEntry } from "../data/cv_de";

interface CVExperienceItemProps {
	entry: CVEntry;
	isLast?: boolean;
}

export function CVExperienceItem({
	entry,
	isLast = false,
}: CVExperienceItemProps) {
	const lineClasses = isLast ? "hidden" : "visible";

	return (
		<li>
			<div className="bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] flex flex-col gap-4 px-5 py-6">
				<h3 className="text-md font-medium text-[var(--color-text-primary)]">
					{entry.organization},{" "}
					<span className=" text-[var(--color-text-secondary)]">
						{entry.location}
					</span>
				</h3>

				<div className="flex flex-col gap-3">
					{entry.roles.map((role) => (
						<h2
							key={`${role.title}-${role.startYear}-${role.startMonth}`}
							className="text-xl font-medium text-[var(--color-text-primary)]">
							{role.title}

							<p className="text-sm font-medium text-nowrap tabular-nums text-emerald-600">
								{role.startMonth} {role.startYear} {" - "}
								{role.endMonth} {role.endYear}
							</p>
						</h2>
					))}
				</div>

				{entry.descriptionShort && (
					<p className="text-base leading-7 text-[var(--color-text-secondary)] pt-2 pb-1 mb-2">
						{entry.descriptionShort}
					</p>
				)}
			</div>
			<div
				className={`w-0.5 h-6 ml-10 bg-[var(--color-cvindicator-line)] ${lineClasses}`}></div>
		</li>
	);
}

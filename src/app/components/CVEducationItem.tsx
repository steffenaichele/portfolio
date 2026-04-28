import type { CVEntry } from "../data/cv_de";

interface CVEducationItemProps {
	entry: CVEntry;
	isFirst?: boolean;
}

export function CVEducationItem({ entry, isFirst = false }: CVEducationItemProps) {
	const indicatorColor = "var(--color-cvindicator-bg-edu)";
	const role = entry.roles[0]; // Education entries have single role

	const lineClasses = isFirst
		? "relative w-8 flex-none flex justify-center before:absolute before:content-[''] before:w-0.5 before:h-[calc(100%-16px)] before:rounded-[1px] before:bg-[var(--color-cvindicator-line)] before:bottom-0 before:left-[50%] before:-translate-x-1/2"
		: "relative w-8 flex-none flex justify-center before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-[var(--color-cvindicator-line)] before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2";

	return (
		<li>
			<div className="flex gap-2">
				<div className={lineClasses}>
					<span
						className="flex-none w-4 h-4 mt-1.5 rounded-full border-3 bg-[var(--color-cvindicator-bg-main)] z-[5]"
						style={{
							borderColor: indicatorColor,
						}}></span>
				</div>
				<div className="flex flex-col gap-4 mb-12">
					<div className="">
						<h2 className="text-xl font-medium text-[var(--color-text-primary)]">
							{entry.organization}
						</h2>
						<p className="text-sm tracking-wide text-[var(--color-text-tertiary)]">
							{entry.location}
						</p>
					</div>
					<div>
						<h3 className="text-lg font-medium text-[var(--color-text-primary)]">
							{role.title}
						</h3>
						<div className="text-sm tracking-wide text-[var(--color-text-tertiary)]">
							{role.startMonth} {role.startYear} {" — "}
							{role.endMonth} {role.endYear}
						</div>
					</div>
					{entry.descriptionShort && (
						<p className="text-base leading-7 text-[var(--color-text-secondary)] pt-2 pb-1 mb-2">
							{entry.descriptionShort}
						</p>
					)}
				</div>
			</div>
		</li>
	);
}

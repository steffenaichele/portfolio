import type { CVEntry } from "../data/cv_de";

interface CVExperienceItemProps {
	entry: CVEntry;
	isFirst?: boolean;
	isLast?: boolean;
}

export function CVExperienceItem({ entry, isFirst = false, isLast = false }: CVExperienceItemProps) {
	const indicatorColor = "var(--color-cvindicator-bg-exp)";

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
				<div className="flex flex-col mb-2">
					<h2 className="text-xl font-medium text-[var(--color-text-primary)]">
						{entry.organization}
					</h2>
					<p className="text-sm text-[var(--color-text-tertiary)]">
						{entry.location}
					</p>
				</div>
			</div>
			<div className="h-[18px] pl-[15px] relative before:absolute before:content-[''] before:w-0.5 before:h-0.5 before:bg-[var(--color-cvindicator-line)] before:top-0 before:left-[15px] before:rounded-bl-sm after:absolute after:content-[''] after:w-0.5 after:h-0.5 after:bg-[var(--color-cvindicator-line)] after:bottom-0 after:left-[31px] after:rounded-tr-sm">
				<svg
					className="w-[18px] h-full"
					viewBox="0 0 18 18"
					preserveAspectRatio="none">
					<line
						x1="1"
						y1="1"
						x2="17"
						y2="17"
						stroke="var(--color-cvindicator-line)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</div>
			<div className="flex ml-8 gap-1 relative before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-[var(--color-cvindicator-line)] before:top-[50%] before:left-0 before:-translate-x-1/2 before:-translate-y-1/2">
				<div className="flex flex-col gap-4">
					{entry.roles.map((role) => {
						return (
							<div
								className="relative flex flex-col pl-6 "
								key={`${role.title}-${role.startYear}-${role.startMonth}`}>
								<span
									className="absolute top-2 -left-1.5 flex-none w-3 h-3 border-2 border-[var(--color-cvindicator-border)] rounded-full z-[5]"
									style={{
										backgroundColor: indicatorColor,
									}}></span>
								<h3 className="text-lg font-medium text-[var(--color-text-primary)]">
									{role.title}
								</h3>
								<div className="text-sm tracking-wide text-[var(--color-text-tertiary)]">
									{role.startMonth} {role.startYear} {" — "}
									{role.endMonth} {role.endYear}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="h-[18px] pl-[15px] relative before:absolute before:content-[''] before:w-0.5 before:h-0.5 before:bg-[var(--color-cvindicator-line)] before:top-0 before:left-[31px] before:rounded-br-sm after:absolute after:content-[''] after:w-0.5 after:h-0.5 after:bg-[var(--color-cvindicator-line)] after:bottom-0 after:left-[15px] after:rounded-tl-sm">
				<svg
					className="w-[18px] h-full"
					viewBox="0 0 18 18"
					preserveAspectRatio="none">
					<line
						x1="1"
						y1="17"
						x2="17"
						y2="1"
						stroke="var(--color-cvindicator-line)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</div>
			<div className="flex gap-2">
				<div className="relative w-8 flex-none flex justify-center before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-[var(--color-cvindicator-line)] before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2"></div>
				<div className="flex flex-col pt-2 pb-1 mb-2">
					{entry.descriptionShort && (
						<p className="text-base leading-7 text-[var(--color-text-secondary)] ">
							{entry.descriptionShort}
						</p>
					)}
				</div>
			</div>
			{!isLast && (
				<div className="relative w-full h-12 before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-[var(--color-cvindicator-line)] before:top-[50%] before:left-4 before:-translate-x-1/2 before:-translate-y-1/2"></div>
			)}
		</li>
	);
}

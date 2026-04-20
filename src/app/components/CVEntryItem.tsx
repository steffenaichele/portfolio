import type { CVEntry, CVRole } from "../data/cv";

interface CVEntryItemProps {
	entry: CVEntry;
	type: "experience" | "education";
}

export function CVEntryItem({ entry, type }: CVEntryItemProps) {
	const indicatorColor =
		type === "experience"
			? "var(--color-cvindicator-bg-exp)"
			: "var(--color-cvindicator-bg-edu)";

	return (
		<li>
			<div className="flex gap-1">
				<div className="relative w-8 flex-none flex justify-center before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-(--color-cvindicator-line) before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2">
					<span
						className="flex-none w-3 h-3 mt-2 rounded-full border-2 bg-(--color-cvindicator-border) z-5"
						style={{
							borderColor: indicatorColor,
						}}></span>
				</div>
				<div className="flex flex-col mb-2">
					<h2 className="text-xl font-medium text-(--color-text-primary)">
						{entry.organization}
					</h2>
					<p className="text-sm text-(--color-text-tertiary)">
						{entry.location}
					</p>
				</div>
			</div>
			<div className="h-4.5 pl-3.75 relative before:absolute before:content-[''] before:w-0.5 before:h-0.5 before:bg-(--color-cvindicator-line) before:top-0 before:left-3.75 before:radius-bl-sm after:absolute after:content-[''] after:w-0.5 after:h-0.5 after:bg-(--color-cvindicator-line) after:bottom-0 after:left-7.75 after:radius-tr-sm">
				<svg
					className=" w-4.5 h-full "
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
			<div className="flex ml-8 gap-1 relative justify-center before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-(--color-cvindicator-line) before:top-[50%] before:left-0 before:-translate-x-1/2 before:-translate-y-1/2">
				<div className="flex flex-col">
					{entry.roles.map((role) => {
						return (
							<div
								className="relative flex flex-col mb-4 pl-4 "
								key={`${role.title}-${role.startYear}-${role.startMonth}`}>
								<span
									className="absolute top-2.5 -left-1 flex-none  w-2 h-2 border-2 border-(--color-cvindicator-border) rounded-full z-5"
									style={{
										backgroundColor: indicatorColor,
									}}></span>
								<h3 className="text-lg font-medium text-(--color-text-primary)">
									{role.title}
								</h3>
								<div className="text-xs tracking-wide text-(--color-text-tertiary)">
									{role.startMonth} {role.startYear} {" — "}
									{role.endMonth} {role.endYear}
								</div>
							</div>
						);
					})}
					{entry.descriptionShort && (
						<p className="text-md leading-8 text-(--color-text-secondary) pl-4 my-2 ">
							{entry.descriptionShort}
						</p>
					)}
				</div>
			</div>
			<div className="h-4.5 pl-3.75 relative before:absolute before:content-[''] before:w-0.5 before:h-0.5 before:bg-(--color-cvindicator-line) before:top-0 before:left-7.75 before:radius-br-sm after:absolute after:content-[''] after:w-0.5 after:h-0.5 after:bg-(--color-cvindicator-line) after:bottom-0 after:left-3.75 after:radius-tl-sm">
				<svg
					className=" w-4.5 h-full"
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
			<div className="relative w-full h-12 before:absolute before:content-[''] before:w-0.5 before:h-full before:rounded-[1px] before:bg-(--color-cvindicator-line) before:top-[50%] before:left-4 before:-translate-x-1/2 before:-translate-y-1/2"></div>
		</li>
	);
}

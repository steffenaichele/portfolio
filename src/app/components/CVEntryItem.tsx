import type { CVEntry, CVRole } from "../data/cv";

interface CVEntryItemProps {
	entry: CVEntry;
}

export function CVEntryItem({ entry }: CVEntryItemProps) {
	return (
		<li className="flex flex-col gap-8">
			<h2 className="text-sm font-medium text-(--color-text-secondary)">
				{entry.organization}, {entry.location}
			</h2>
			<div className="flex flex-col gap-5">
				{entry.roles.map((role) => (
					<div
						className="flex flex-col"
						key={`${role.title}-${role.startYear}-${role.startMonth}`}>
						<div className="text-md tracking-wide text-(--color-text-tertiary)">
							{role.startMonth} {role.startYear} —{" "}
							{role.endMonth && role.endYear
								? `${role.endMonth} ${role.endYear}`
								: "heute"}
						</div>
						<h3 className="text-xl text-(--color-text-primary)">
							{role.title}
						</h3>
					</div>
				))}
			</div>

			{entry.descriptionShort && (
				<p className="text-md leading-1.8 text-(--color-text-tertiary)">
					{entry.descriptionShort}
				</p>
			)}
		</li>
	);
}

"use client";

import { useState } from "react";
import type { CVEntry } from "../data/cv";

const variantStyles = {
	experience: "text-[var(--color-text-exp)]",
	education: "text-[var(--color-text-edu)]",
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
}

export function CVItem({ entry, variant }: CVItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	const detailsId = `cv-details-${entry.organization.replace(/\s+/g, "-").toLowerCase()}`;
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		!!entry.description?.length ||
		!!entry.technologies?.length;

	const color = variantStyles[variant];

	return (
		<li
			className={`cv-item rounded-[var(--radius-surface)] corner-squircle bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] active:bg-[var(--color-surface-bg-active)] transition-colors duration-150 cursor-pointer disabled:cursor-default hover:shadow-[var(--shadow-soft)]${isOpen ? " is-open" : ""}`}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				className="w-full p-0 text-left px-3 gap-4">
				{isOpen ? (
					<div id={detailsId} className="flex flex-col gap-6">
						{otherRoles.length > 0 && (
							<div className="flex flex-col gap-6">
								{otherRoles.map((role) => (
									<div
										key={`${role.title}-${role.startYear}-${role.startMonth}`}
										className="flex flex-wrap items-center gap-x-2 gap-y-1">
										<h2 className="text-2xl text-[var(--color-text-primary)]">
											{role.title}
										</h2>
										<div
											className={`w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums ${color}`}>
											<span>
												{role.startMonth}{" "}
												{role.startYear} –{" "}
												{role.endMonth} {role.endYear}
											</span>
											<span>·</span>
											<span>{role.duration}</span>
										</div>
									</div>
								))}
							</div>
						)}

						{entry.description?.length && (
							<ul className="flex flex-col gap-4">
								{entry.description.map((point) => (
									<li
										key={point}
										className="text-md text-[var(--color-text-secondary)]">
										{point}
									</li>
								))}
							</ul>
						)}

						{entry.technologies?.length && (
							<div className="flex flex-wrap gap-1.5">
								{entry.technologies.map((tech) => (
									<span
										key={tech}
										className="px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-button-primary-bg-hover)] rounded-[var(--radius-squircle-sm)] corner-squircle">
										{tech}
									</span>
								))}
							</div>
						)}
					</div>
				) : (
					<div className="h-8 flex items-center">
						<div className="flex-1 min-w-0 flex text-md text-[var(--color-text-primary)]">
							<p className="font-medium shrink-0">
								{entry.organizationShort}
							</p>
							<p className="shrink-0 mr-1">{", "}</p>
							<p className="truncate min-w-0 text-[var(--color-text-secondary)]">
								{entry.location}
							</p>
						</div>
						<div
							className={`shrink-0 flex items-center gap-0.5 tabular-nums ${color}`}>
							<p>{entry.totalStartYear}</p>
							<p>–</p>
							<p>{entry.totalEndYear}</p>
						</div>
					</div>
				)}
			</button>
		</li>
	);
}

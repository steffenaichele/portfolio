"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CVEntry } from "../data/cv_de";

interface CVEducationItemProps {
	entry: CVEntry;
	isLast?: boolean;
}

export function CVEducationItem({
	entry,
	isLast = false,
}: CVEducationItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const latestRole = entry.roles[0];
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		(entry.description && entry.description.length > 0) ||
		(entry.technologies && entry.technologies.length > 0);

	return (
		<li>
			<div className="bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] overflow-hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-expanded={isOpen}
					disabled={!hasExpandable}
					className="w-full flex items-start justify-between gap-4 px-5 py-6 text-left cursor-pointer disabled:cursor-default">
					<div className="flex flex-col gap-2">
						<h2 className="text-xl font-medium text-[var(--color-text-primary)] text-pretty">
							{latestRole.title}
						</h2>
						<div className="flex flex-wrap items-center gap-2">
							<span className="px-2 py-1 text-sm font-medium text-nowrap tabular-nums text-[var(--color-text-cvitem-edu)] bg-sky-100 rounded-[var(--radius-squircle-sm)] corner-squircle">
								{entry.totalStartMonth} {entry.totalStartYear}
								{" – "}
								{entry.totalEndMonth} {entry.totalEndYear}
								{" · "}
								{entry.totalDuration}
							</span>
						</div>
						<h3 className="text-md font-medium text-[var(--color-text-secondary)]">
							{entry.organization},{" "}
							<span className="text-[var(--color-text-tertiary)]">
								{entry.location}
							</span>
						</h3>
					</div>
					{hasExpandable && (
						<ChevronDown
							size={18}
							className={`flex-none mt-1.5 text-[var(--color-text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
						/>
					)}
				</button>

				<div
					className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
					<div className="overflow-hidden">
						<div className="flex flex-col gap-4 px-5 pb-6">

							{otherRoles.length > 0 && (
								<div className="flex flex-col gap-3 pt-2 border-t border-[var(--color-cvindicator-line)]">
									{otherRoles.map((role) => (
										<div
											key={`${role.title}-${role.startYear}-${role.startMonth}`}
											className="flex flex-col gap-0.5">
											<span className="text-base font-medium text-[var(--color-text-primary)]">
												{role.title}
											</span>
											<span className="text-sm tabular-nums text-[var(--color-text-cvitem-edu)]">
												{role.startMonth} {role.startYear}
												{" – "}
												{role.endMonth} {role.endYear}
												{" · "}
												{role.duration}
											</span>
										</div>
									))}
								</div>
							)}

							{entry.description && entry.description.length > 0 && (
								<ul className="flex flex-col gap-1.5 list-disc list-outside pl-4">
									{entry.description.map((point, i) => (
										<li
											key={i}
											className="text-sm leading-6 text-[var(--color-text-secondary)]">
											{point}
										</li>
									))}
								</ul>
							)}

							{entry.technologies && entry.technologies.length > 0 && (
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
					</div>
				</div>
			</div>

			<div
				className={`w-0.5 h-6 ml-10 bg-[var(--color-cvindicator-line)] ${isLast ? "hidden" : "visible"}`}
			/>
		</li>
	);
}

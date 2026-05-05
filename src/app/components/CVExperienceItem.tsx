"use client";

import { useState } from "react";
import type { CVEntry } from "../data/cv_de";

interface CVExperienceItemProps {
	entry: CVEntry;
	isLast?: boolean;
}

export function CVExperienceItem({
	entry,
	isLast = false,
}: CVExperienceItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const latestRole = entry.roles[0];
	const otherRoles = entry.roles.slice(1);
	const hasMultipleRoles = entry.roles.length > 1;

	return (
		<li>
			<div className="bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] corner-squircle overflow-hidden shadow-[var(--shadow-soft)]">
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-expanded={isOpen}
					className="w-full p-5 pb-6 text-left cursor-pointer">
					<div className="">
						<div className="w-full flex flex-wrap gap-x-1 mb-3">
							<p className="text-md text-[var(--color-text-primary)]">
								{entry.organization}
								{","}
							</p>
							<p className="text-md text-[var(--color-text-secondary)]">
								{entry.location}
							</p>
						</div>

						<div className="w-full flex flex-wrap gap-x-1">
							<h2
								className={`w-full mb-1 text-2xl text-[var(--color-text-primary)] ${isOpen && hasMultipleRoles ? "hidden" : "visible"}`}>
								{latestRole.title}
							</h2>

							<div
								className={`w-min h-6 px-2 bg-[var(--color-badge-exp-bg)] flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums text-[var(--color-badge-exp-text)] ${isOpen && hasMultipleRoles ? "hidden" : "visible"}`}>
								<span>
									{entry.totalStartMonth}{" "}
									{entry.totalStartYear}
									{" – "}
									{entry.totalEndMonth} {entry.totalEndYear}
								</span>
								<span>{" · "}</span>
								<span>{entry.totalDuration}</span>
							</div>
						</div>
					</div>

					<div
						className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
						<div className="overflow-hidden">
							<div className="flex flex-col gap-4 px-5 pb-6">
								{hasMultipleRoles && (
									<div className="flex flex-col gap-3 pt-2">
										<div
											key={`${latestRole.title}-${latestRole.startYear}-${latestRole.startMonth}`}
											className="flex flex-col gap-1">
											<span className="w-full mb-0.5 text-2xl font-medium text-[var(--color-text-primary)]">
												{latestRole.title}
											</span>
											<div
												className={`w-min h-6 px-2 mb-3 bg-[var(--color-badge-exp-bg)] flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums text-[var(--color-badge-exp-text)]`}>
												<span>
													{latestRole.startMonth}{" "}
													{latestRole.startYear}
													{" – "}
													{latestRole.endMonth}{" "}
													{latestRole.endYear}
												</span>
												<span>{" · "}</span>
												<span>
													{latestRole.duration}
												</span>
											</div>
										</div>
										{otherRoles.map((role) => (
											<div
												key={`${role.title}-${role.startYear}-${role.startMonth}`}
												className="flex flex-col gap-1">
												<span className="w-full mb-0.5 text-2xl font-medium text-[var(--color-text-primary)]">
													{role.title}
												</span>
												<div
													className={`w-min h-6 px-2 mb-3 bg-[var(--color-badge-exp-bg)] flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums text-[var(--color-badge-exp-text)]`}>
													<span>
														{role.startMonth}{" "}
														{role.startYear}
														{" – "}
														{role.endMonth}{" "}
														{role.endYear}
													</span>
													<span>{" · "}</span>
													<span>{role.duration}</span>
												</div>
											</div>
										))}
									</div>
								)}

								{entry.description &&
									entry.description.length > 0 && (
										<ul className="flex flex-col gap-1.5 list-disc list-outside pl-4">
											{entry.description.map(
												(point, i) => (
													<li
														key={i}
														className="text-sm leading-6 text-[var(--color-text-secondary)]">
														{point}
													</li>
												),
											)}
										</ul>
									)}

								{entry.technologies &&
									entry.technologies.length > 0 && (
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
				</button>
			</div>

			<div
				className={`w-0.5 h-6 ml-10 bg-[var(--color-cvindicator-line)] ${isLast ? "hidden" : "visible"}`}
			/>
		</li>
	);
}

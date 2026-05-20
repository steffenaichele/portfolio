"use client";

// clsx merges class strings conditionally.
// Usage: clsx("base-class", condition && "conditional-class", { "object-class": condition })
// Strings, arrays, and objects are all valid — falsy values are ignored.

import { useState, useRef } from "react";
import clsx from "clsx";
import type { CVEntry } from "../data/cv";

const DURATION_OPEN = 600;
const DURATION_CLOSE = 200;
const STAGGER_DELAY = 300;

const badgeStyles = {
	experience: "bg-[var(--color-badge-exp-bg)] text-[var(--color-badge-exp-text)]",
	education: "bg-[var(--color-badge-edu-bg)] text-[var(--color-text-cvitem-edu)]",
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
}

export function CVItem({ entry, variant }: CVItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const badgeRef = useRef<HTMLSpanElement>(null);

	const latestRole = entry.roles[0];
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		(entry.description && entry.description.length > 0) ||
		(entry.technologies && entry.technologies.length > 0);
	const duration = isOpen ? DURATION_OPEN : DURATION_CLOSE;
	const badge = badgeStyles[variant];

	const getBadgeText = (open: boolean): string => {
		if (open) {
			return `${latestRole.startMonth} ${latestRole.startYear} – ${latestRole.endMonth} ${latestRole.endYear} · ${latestRole.duration}`;
		}
		return `${entry.totalStartMonth} ${entry.totalStartYear} – ${entry.totalEndMonth} ${entry.totalEndYear} · ${entry.totalDuration}`;
	};

	const [badgeText, setBadgeText] = useState(() => getBadgeText(false));

	const handleToggle = () => {
		const nextOpen = !isOpen;
		setIsOpen(nextOpen);

		const el = badgeRef.current;
		if (!el) return;

		const dur = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur"),
		) || 200;

		el.classList.add("is-exit");
		setTimeout(() => {
			el.classList.remove("is-exit");
			el.classList.add("is-enter-start");
			void el.offsetHeight;
			const newText = getBadgeText(nextOpen);
			el.textContent = newText;
			el.classList.remove("is-enter-start");
			setBadgeText(newText);
		}, dur);
	};

	return (
		<li
			className="cv-item">
			<div className="bg-[var(--color-surface-bg)] h-min rounded-[var(--radius-surface)] corner-squircle overflow-hidden shadow-[var(--shadow-soft)]">
				<button
					onClick={handleToggle}
					aria-expanded={isOpen}
					disabled={!hasExpandable}
					className={clsx(
						"w-full px-5 pb-6 text-left cursor-pointer transition-[margin-bottom] [transition-timing-function:var(--ease-out)] disabled:cursor-default",
						isOpen ? "pt-6" : "pt-5",
					)}>
					<div className="flex flex-col">
						<div
							className={clsx(
								"w-full flex flex-wrap gap-x-1 transition-[margin-bottom] [transition-timing-function:var(--ease-out)]",
								isOpen ? "mb-6" : "mb-4",
							)}
							style={{ transitionDuration: `${duration}ms` }}>
							<p className="text-md text-[var(--color-text-primary)]">
								{entry.organization}
								{","}
							</p>
							<p className="text-md text-[var(--color-text-secondary)]">
								{entry.location}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<h2 className="text-2xl text-[var(--color-text-primary)]">
								{latestRole.title}
							</h2>

							<div
								className={clsx(
									"w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums",
									badge,
								)}>
								<span ref={badgeRef} className="t-text-swap">
									{badgeText}
								</span>
							</div>
						</div>
					</div>

					<div
						className={clsx(
							"grid",
							isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
						)}
						style={{
							transition: `grid-template-rows ${duration}ms var(--ease-out)`,
						}}>
						<div className="overflow-hidden">
							<div
								className={clsx(
									"flex flex-col gap-6 mt-6 transition-opacity [transition-timing-function:var(--ease-out)]",
									isOpen ? "opacity-100" : "opacity-0",
								)}
								style={{ transitionDuration: `${duration}ms` }}>
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
													className={clsx(
														"w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums",
														badge,
													)}>
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
										<ul className="flex flex-col gap-4">
											{entry.description.map(
												(point) => (
													<li
														key={point}
														className="text-md text-[var(--color-text-secondary)]">
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
		</li>
	);
}

"use client";

import { useState, useRef } from "react";
import clsx from "clsx";
import type { CVEntry } from "../data/cv";

// Asymmetric durations: slow open feels deliberate, fast close avoids blocking.
const DURATION_OPEN = 600;
const DURATION_CLOSE = 200;

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
	const detailsRef = useRef<HTMLDivElement>(null);

	const detailsId = `cv-details-${entry.organization.replace(/\s+/g, "-").toLowerCase()}`;
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		!!entry.description?.length ||
		!!entry.technologies?.length;

	const duration = isOpen ? DURATION_OPEN : DURATION_CLOSE;
	const color = variantStyles[variant];

	// scrollHeight reads the natural height of the content regardless of the wrapper's height.
	const detailsHeight = isOpen ? (detailsRef.current?.scrollHeight ?? 0) : 0;

	return (
		<li className={clsx("cv-item", isOpen && "is-open")}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				className="w-full text-left cursor-pointer disabled:cursor-default bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] corner-squircle overflow-hidden hover:shadow-[var(--shadow-soft)]">

				{/* Closed: summary row — collapses and fades up when open */}
				<div
					className="overflow-hidden"
					style={{
						height: isOpen ? 0 : 32,
						transition: `height ${duration}ms var(--ease-out)`,
					}}>
					<div
						className={clsx(
							"h-8 flex items-center px-3 gap-4",
							"transition-[opacity,transform] [transition-timing-function:var(--ease-out)]",
							isOpen ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0",
						)}
						style={{ transitionDuration: `${duration}ms` }}>
						<div className="flex-1 min-w-0 flex text-md text-[var(--color-text-primary)]">
							<p className="font-medium shrink-0">{entry.organizationShort}</p>
							<p className="shrink-0 mr-1">{", "}</p>
							<p className="truncate min-w-0 text-[var(--color-text-secondary)]">{entry.location}</p>
						</div>
						<div className={clsx("shrink-0 flex items-center gap-x-1 tabular-nums", color)}>
							<p>{entry.totalStartYear}</p>
							<p>–</p>
							<p>{entry.totalEndYear}</p>
						</div>
					</div>
				</div>

				{/* Open: expanded details — expands and fades in when open */}
				<div
					id={detailsId}
					className="overflow-hidden"
					style={{
						height: detailsHeight,
						transition: `height ${duration}ms var(--ease-out)`,
					}}>
					<div
						ref={detailsRef}
						className={clsx(
							"flex flex-col gap-6 px-3 pb-6",
							"transition-opacity [transition-timing-function:var(--ease-out)]",
							isOpen ? "opacity-100" : "opacity-0",
						)}
						style={{ transitionDuration: `${duration}ms` }}>

						{otherRoles.length > 0 && (
							<div className="flex flex-col gap-6">
								{otherRoles.map((role) => (
									<div
										key={`${role.title}-${role.startYear}-${role.startMonth}`}
										className="flex flex-wrap items-center gap-x-2 gap-y-1">
										<h2 className="text-2xl text-[var(--color-text-primary)]">{role.title}</h2>
										<div className={clsx(
											"w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums",
											color,
										)}>
											<span>{role.startMonth} {role.startYear} – {role.endMonth} {role.endYear}</span>
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
									<li key={point} className="text-md text-[var(--color-text-secondary)]">
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
				</div>

			</button>
		</li>
	);
}

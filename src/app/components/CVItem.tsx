"use client";

import { useRef, useState } from "react";
import type { CVEntry } from "../data/cv";

const ITEM_DURATION = 150;
const STAGGER = 50;
const BUFFER = 20;

type AnimPhase = "idle" | "exiting" | "entering";

const variantStyles = {
	experience: "text-[var(--color-text-exp)]",
	education: "text-[var(--color-text-edu)]",
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
}

type DetailSection = { key: string; node: React.ReactNode };

function childAnimStyle(
	containerVisible: boolean,
	phase: AnimPhase,
	index: number,
): React.CSSProperties {
	if (phase === "idle") return {};
	const delay = `${index * STAGGER}ms`;
	if (phase === "exiting" && containerVisible)
		return { animation: `cv-fade-out-up ${ITEM_DURATION}ms ease-out ${delay} forwards` };
	if (phase === "entering" && containerVisible)
		return { animation: `cv-fade-in-up ${ITEM_DURATION}ms ease-out ${delay} both` };
	return {};
}

export function CVItem({ entry, variant }: CVItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [phase, setPhase] = useState<AnimPhase>("idle");
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const detailsId = `cv-details-${entry.organization.replace(/\s+/g, "-").toLowerCase()}`;
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		!!entry.description?.length ||
		!!entry.technologies?.length;

	const color = variantStyles[variant];

	const detailSectionCount = [
		otherRoles.length > 0,
		!!entry.description?.length,
		!!entry.technologies?.length,
	].filter(Boolean).length;

	const handleClick = () => {
		if (!hasExpandable || phase !== "idle") return;

		const exitCount = isOpen ? detailSectionCount : 2;
		const enterCount = isOpen ? 2 : detailSectionCount;
		const exitDuration = ITEM_DURATION + (exitCount - 1) * STAGGER + BUFFER;
		const enterDuration = ITEM_DURATION + (Math.max(enterCount, 1) - 1) * STAGGER + BUFFER;

		clearTimeout(timerRef.current);
		setPhase("exiting");

		timerRef.current = setTimeout(() => {
			setIsOpen((prev) => !prev);
			setPhase("entering");

			timerRef.current = setTimeout(() => {
				setPhase("idle");
			}, enterDuration);
		}, exitDuration);
	};

	const summaryVisible = !isOpen;
	const detailsVisible = isOpen;

	const detailSections: DetailSection[] = [];

	if (otherRoles.length > 0) {
		detailSections.push({
			key: "roles",
			node: (
				<div className="flex flex-col gap-6">
					{otherRoles.map((role) => (
						<div
							key={`${role.title}-${role.startYear}-${role.startMonth}`}
							className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<h2 className="text-2xl text-[var(--color-text-primary)]">
								{role.title}
							</h2>
							<div className={`w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-squircle-sm)] corner-squircle text-sm font-medium text-nowrap tabular-nums ${color}`}>
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
			),
		});
	}

	if (entry.description?.length) {
		detailSections.push({
			key: "description",
			node: (
				<ul className="flex flex-col gap-4">
					{entry.description.map((point) => (
						<li key={point} className="text-md text-[var(--color-text-secondary)]">
							{point}
						</li>
					))}
				</ul>
			),
		});
	}

	if (entry.technologies?.length) {
		detailSections.push({
			key: "technologies",
			node: (
				<div className="flex flex-wrap gap-1.5">
					{entry.technologies.map((tech) => (
						<span
							key={tech}
							className="px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-button-primary-bg-hover)] rounded-[var(--radius-squircle-sm)] corner-squircle">
							{tech}
						</span>
					))}
				</div>
			),
		});
	}

	return (
		<li
			className={`cv-item rounded-[var(--radius-surface)] corner-squircle bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] active:bg-[var(--color-surface-bg-active)] transition-colors duration-150 cursor-pointer disabled:cursor-default hover:shadow-[var(--shadow-soft)]${isOpen ? " is-open" : ""}`}>
			<button
				onClick={handleClick}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				className="w-full p-0 text-left px-3">
				{/* Closed: summary row */}
				<div className={`overflow-hidden transition-[height] duration-200 ${isOpen ? "h-0" : "h-8"}`}>
					<div className="h-8 flex items-center">
						<div
							style={childAnimStyle(summaryVisible, phase, 0)}
							className="flex-1 min-w-0 flex text-md text-[var(--color-text-primary)]">
							<p className="font-medium shrink-0">{entry.organizationShort}</p>
							<p className="shrink-0 mr-1">{", "}</p>
							<p className="truncate min-w-0 text-[var(--color-text-secondary)]">{entry.location}</p>
						</div>
						<div
							style={childAnimStyle(summaryVisible, phase, 1)}
							className={`shrink-0 flex items-center gap-0.5 tabular-nums ${color}`}>
							<p>{entry.totalStartYear}</p>
							<p>–</p>
							<p>{entry.totalEndYear}</p>
						</div>
					</div>
				</div>

				{/* Open: expanded details */}
				<div
					id={detailsId}
					className={`overflow-hidden grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${!isOpen ? "pointer-events-none" : ""}`}>
					<div className="overflow-hidden min-h-0 flex flex-col gap-6">
						{detailSections.map(({ key, node }, i) => (
							<div key={key} style={childAnimStyle(detailsVisible, phase, i)}>
								{node}
							</div>
						))}
					</div>
				</div>
			</button>
		</li>
	);
}

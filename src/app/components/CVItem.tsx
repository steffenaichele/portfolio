"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CVEntry } from "../data/cv";

// --- Animation parameters ---
// Distance (px) elements travel while fading in/out.
const SHIFT_DISTANCE = 4;
// Duration (s) of the opacity/transform fade per element.
const FADE_DURATION = 0.3;
// Delay (s) between consecutive staggered children.
const STAGGER_DELAY = 0.1;
// Duration (s) of the container height (open/close) animation.
const HEIGHT_DURATION = 0.2;

const variantStyles = {
	experience: "text-[var(--color-text-exp)]",
	education: "text-[var(--color-text-edu)]",
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
}

type DetailSection = { key: string; node: React.ReactNode };

export function CVItem({ entry, variant }: CVItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const reduceMotion = useReducedMotion();

	const detailsId = `cv-details-${entry.organization.replace(/\s+/g, "-").toLowerCase()}`;
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		!!entry.description?.length ||
		!!entry.technologies?.length;

	const color = variantStyles[variant];

	const handleClick = () => {
		if (!hasExpandable) return;
		setIsOpen((prev) => !prev);
	};

	const offset = reduceMotion ? 0 : SHIFT_DISTANCE;
	const stagger = reduceMotion ? 0 : STAGGER_DELAY;
	const heightDuration = reduceMotion ? 0 : HEIGHT_DURATION;

	// Summary (closed view): elements fade in and out upward.
	const summaryChild = {
		hidden: { opacity: 0, y: offset },
		visible: { opacity: 1, y: 0, transition: { duration: FADE_DURATION } },
		exit: { opacity: 0, y: -offset, transition: { duration: FADE_DURATION } },
	};
	// Details (open view): elements fade in and out downward.
	const detailsChild = {
		hidden: { opacity: 0, y: -offset },
		visible: { opacity: 1, y: 0, transition: { duration: FADE_DURATION } },
		exit: { opacity: 0, y: offset, transition: { duration: FADE_DURATION } },
	};
	// Summary children stagger immediately.
	const summaryContainer = {
		hidden: {},
		visible: { transition: { staggerChildren: stagger } },
		exit: { transition: { staggerChildren: stagger } },
	};
	// Details children wait for the height animation, then stagger in.
	const detailsContainer = {
		hidden: {},
		visible: { transition: { delayChildren: heightDuration, staggerChildren: stagger } },
		exit: { transition: { staggerChildren: stagger } },
	};

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
				<motion.div
					id={detailsId}
					layout
					className="overflow-hidden"
					transition={{ duration: heightDuration, ease: "easeOut" }}>
					<AnimatePresence mode="wait" initial={false}>
						{isOpen ? (
							<motion.div
								key="details"
								variants={detailsContainer}
								initial="hidden"
								animate="visible"
								exit="exit"
								className="flex flex-col gap-6">
								{detailSections.map(({ key, node }) => (
									<motion.div key={key} variants={detailsChild}>
										{node}
									</motion.div>
								))}
							</motion.div>
						) : (
							<motion.div
								key="summary"
								variants={summaryContainer}
								initial="hidden"
								animate="visible"
								exit="exit"
								className="h-8 flex items-center text-md">
								<motion.p
									variants={summaryChild}
									className="font-medium shrink-0 mr-1 text-[var(--color-text-primary)]">
									{entry.organizationShort}{","}
								</motion.p>
								<motion.p
									variants={summaryChild}
									className="flex-1 min-w-0 truncate text-[var(--color-text-secondary)]">
									{entry.location}
								</motion.p>
								<motion.div
									variants={summaryChild}
									className={`shrink-0 flex items-center gap-0.5 tabular-nums ${color}`}>
									<p>{entry.totalStartYear}</p>
									<p>–</p>
									<p>{entry.totalEndYear}</p>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</button>
		</li>
	);
}

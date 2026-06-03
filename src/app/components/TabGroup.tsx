"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Tab from "./Tab";

interface TabItem {
	label: string;
	content: React.ReactNode;
}

interface TabGroupProps {
	tabs: TabItem[];
	className?: string;
	// Feste Mindesthöhe (px) des Panel-Bereichs — verhindert Layout-Sprung beim
	// Wechsel zwischen Tabs mit unterschiedlich vielen Items.
	panelMinHeight?: number;
}

// Distanz (px), um die der Tab-Inhalt beim Wechsel horizontal slidet.
const SHIFT_DISTANCE = 24;
// Dauer (s) des Slide-/Opacity-Fades.
const FADE_DURATION = 0.18;

// Richtung: +1 = Wechsel nach rechts (alter Inhalt nach links raus, neuer von
// rechts rein), -1 = nach links. dir=0 bei reduce-motion (reiner Opacity-Fade).
const panelVariants = {
	enter: (dir: number) => ({ opacity: 0, x: dir * SHIFT_DISTANCE }),
	center: { opacity: 1, x: 0 },
	exit: (dir: number) => ({ opacity: 0, x: dir * -SHIFT_DISTANCE }),
};

export default function TabGroup({
	tabs,
	className,
	panelMinHeight,
}: TabGroupProps) {
	const [[activeIndex, direction], setActive] = useState<[number, number]>([
		0, 0,
	]);
	const reduceMotion = useReducedMotion();

	const handleSelect = (i: number) => {
		setActive(([prev]) => [i, Math.sign(i - prev)]);
	};

	const custom = reduceMotion ? 0 : direction;

	return (
		<div className={clsx("flex flex-col gap-10", className)}>
			<div role="tablist" className="tab-list flex flex-row">
				<span
					aria-hidden
					className="tab-pill rounded-[var(--radius-tab)]"
				/>
				{tabs.map((tab, i) => (
					<Tab
						key={tab.label}
						isActive={activeIndex === i}
						onClick={() => handleSelect(i)}>
						{tab.label}
					</Tab>
				))}
			</div>
			<div
				role="tabpanel"
				className="relative overflow-x-clip"
				style={{ minHeight: panelMinHeight }}>
				<AnimatePresence
					mode="popLayout"
					initial={false}
					custom={custom}>
					<motion.div
						key={activeIndex}
						custom={custom}
						variants={panelVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: FADE_DURATION, ease: "easeOut" }}>
						{tabs[activeIndex].content}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

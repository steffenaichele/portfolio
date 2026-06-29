"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useMessages } from "next-intl";

import ActionWrapper from "./ActionWrapper";
import Button from "./Button";
import { CVItem, SUMMARY_HEIGHT } from "./CVItem";
import type { CVEntry } from "../data/cv";

type Category = "experience" | "education";

const PANEL_ID = "cv-panel";
// Reihenfolge der Tabs = Slide-Richtung: links/rechts vom aktiven Index.
const ORDER: Category[] = ["experience", "education"];
// Dauer (ms) des Slide/Opacity-Wechsels. Synchron mit der CSS-Transition unten
// und dem Timer, der den Panel-Hintergrund wieder ausblendet.
const SWITCH_MS = 200;

export default function CVSection() {
	const t = useTranslations("cv");
	const messages = useMessages() as {
		cv: { experience: CVEntry[]; education: CVEntry[] };
	};
	const { experience, education } = messages.cv;
	const [active, setActive] = useState<Category>("experience");
	// True während des Slide-Wechsels: blendet den Panel-Hintergrund kurz ein.
	const [switching, setSwitching] = useState(false);
	const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const activeIndex = ORDER.indexOf(active);

	const select = (category: Category) => {
		if (category === active) return;
		setActive(category);
		setSwitching(true);
		if (switchTimer.current) clearTimeout(switchTimer.current);
		switchTimer.current = setTimeout(() => setSwitching(false), SWITCH_MS);
	};

	useEffect(
		() => () => {
			if (switchTimer.current) clearTimeout(switchTimer.current);
		},
		[],
	);

	// Feste Panel-Höhe = Tab mit den meisten Items (geschlossen), damit das
	// Layout beim Wechsel nicht springt.
	const panelMinHeight =
		Math.max(experience.length, education.length) * SUMMARY_HEIGHT;

	// Beide Tabs rendern dieselbe Liste, nur Daten und Variante unterscheiden sich.
	const cvList = (entries: CVEntry[], variant: Category) => (
		<ActionWrapper>
			<ul className="flex flex-col">
				{entries.map((entry, idx) => (
					<CVItem
						key={`${entry.organization}-${entry.roles[0].startYear}`}
						entry={entry}
						variant={variant}
						isFirst={idx === 0}
						isLast={idx === entries.length - 1}
					/>
				))}
			</ul>
		</ActionWrapper>
	);

	// Tab = Ghost-Button im Tablist-ActionWrapper (liefert die Hover-Pille).
	// Active-State allein über die Textfarbe (wie zuvor das Tab).
	const tab = (category: Category, label: string) => (
		<Button
			ghost
			role="tab"
			aria-selected={active === category}
			aria-controls={PANEL_ID}
			onClick={() => select(category)}
			className={
				active === category
					? "text-(--color-text-secondary)"
					: "text-(--color-text-tertiary)"
			}>
			{label}
		</Button>
	);

	return (
		<section className="flex flex-col gap-6 ">
			<span className="w-auto h-[1px] mx-4 bg-[var(--color-divider)]"></span>
			<div className="w-full flex flex-col gap-10">
				<ActionWrapper role="tablist" className="flex flex-row">
					{tab("experience", t("experience_heading"))}
					{tab("education", t("education_heading"))}
				</ActionWrapper>
				<div
					id={PANEL_ID}
					role="tabpanel"
					className={`relative overflow-x-clip rounded-2xl transition-colors duration-200 ease-out ${
						switching
							? "bg-[var(--color-interactive-wrapper-bg-hover)]"
							: "bg-transparent"
					}`}
					style={{ minHeight: panelMinHeight }}>
					{ORDER.map((category, i) => {
						const isActive = active === category;
						// -1 = links vom aktiven Tab, +1 = rechts.
						const dir = Math.sign(i - activeIndex);
						return (
							<div
								key={category}
								aria-hidden={!isActive}
								inert={!isActive || undefined}
								className={`transition-[opacity,transform] duration-800 ease-out will-change-transform ${
									isActive
										? "relative opacity-100 translate-x-0"
										: `absolute inset-0 opacity-0 pointer-events-none motion-reduce:translate-x-0 ${
												dir < 0
													? "-translate-x-6"
													: "translate-x-6"
											}`
								}`}>
								{cvList(
									category === "experience"
										? experience
										: education,
									category,
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

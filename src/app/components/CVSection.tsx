"use client";

import { useRef, useState } from "react";
import { useTranslations, useMessages } from "next-intl";

import InteractionWrapper from "./InteractionWrapper";
import Button from "./Button";
import { CVItem } from "./CVItem";
import type { CVEntry } from "../data/cv";
import styles from "./CVSection.module.scss";

type Category = "experience" | "education";

const PANEL_ID = "cv-panel";
// Reihenfolge der Tabs = Slide-Richtung: links/rechts vom aktiven Index.
const ORDER: Category[] = ["experience", "education"];
// Muss mit --duration-panel in CVSection.module.scss übereinstimmen.
const PANEL_SWAP_MS = 800;

export default function CVSection() {
	const t = useTranslations("cv");
	const messages = useMessages() as {
		cv: { experience: CVEntry[]; education: CVEntry[] };
	};
	const { experience, education } = messages.cv;
	const [active, setActive] = useState<Category>("experience");
	// Erst ab dem ersten Wechsel Enter/Exit-Animation anhängen, sonst würde
	// das initial aktive Panel beim Mount unnötig reinanimieren.
	const [hasSwapped, setHasSwapped] = useState(false);
	const [panelChanging, setPanelChanging] = useState(false);
	const swapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const select = (category: Category) => {
		if (category === active) return;
		setActive(category);
		setHasSwapped(true);
		setPanelChanging(true);
		if (swapTimeout.current) clearTimeout(swapTimeout.current);
		swapTimeout.current = setTimeout(
			() => setPanelChanging(false),
			PANEL_SWAP_MS,
		);
	};

	// ID eines Eintrags (React-Key).
	const idOf = (entry: CVEntry) =>
		`${entry.organization}-${entry.roles[0].startYear}`;

	// Beide Tabs rendern dieselbe Liste, nur die Daten unterscheiden sich.
	// Die Variante wird nicht pro Item, sondern einmal am categoryPanel gesetzt
	// (siehe data-variant unten) — CVItem.module.scss stylt darüber die Kinder.
	// Feste Seite je Tab-Index: Eintrag 0 hängt links, Eintrag 1 rechts —
	// bestimmt sowohl Ruheposition (inaktiv) als auch Enter/Exit-Richtung.
	const cvList = (
		entries: CVEntry[],
		category: Category,
		isActive: boolean,
		side: "left" | "right",
	) => (
		<ul
			key={category}
			aria-hidden={!isActive}
			inert={!isActive || undefined}
			data-variant={category}
			className={`${styles.categoryPanel} ${
				isActive
					? `${styles.categoryActive} ${
							hasSwapped
								? side === "left"
									? styles.categoryEnterLeft
									: styles.categoryEnterRight
								: ""
						}`
					: `${styles.categoryInactive} ${
							side === "left"
								? styles.categoryInactiveLeft
								: styles.categoryInactiveRight
						} ${
							hasSwapped
								? side === "left"
									? styles.categoryExitLeft
									: styles.categoryExitRight
								: ""
						}`
			}`}>
			{entries.map((entry) => (
				<CVItem key={idOf(entry)} entry={entry} />
			))}
		</ul>
	);

	// Tab = Ghost-Button; Hover/Active-Pille kommt vom InteractionWrapper im
	// tablist-Wrapper. Active-State (ausgewählter Tab) allein über die Textfarbe.
	const tab = (category: Category, label: string) => (
		<Button
			role="tab"
			aria-selected={active === category}
			aria-controls={PANEL_ID}
			onClick={() => select(category)}
			className={active === category ? styles.tabActive : styles.tabInactive}>
			<span>{label}</span>
		</Button>
	);

	return (
		<section className={styles.section}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.heading}>{t("cv_section_heading")}</h2>
			</div>
			<div
				id={PANEL_ID}
				role="tabpanel"
				className={`${styles.panel} ${panelChanging ? styles.panelChanging : ""}`}>
				{ORDER.map((category, i) => {
					const isActive = active === category;
					const side = i === 0 ? "left" : "right";
					return cvList(
						category === "experience" ? experience : education,
						category,
						isActive,
						side,
					);
				})}
				<InteractionWrapper role="tablist" className={styles.controls}>
					{tab("experience", t("experience_heading"))}
					{tab("education", t("education_heading"))}
				</InteractionWrapper>
			</div>
		</section>
	);
}

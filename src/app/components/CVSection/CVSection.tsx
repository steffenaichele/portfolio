"use client";

import { useRef, useState } from "react";
import { useTranslations, useMessages } from "next-intl";

import SegmentedControl from "../SegmentedControl/SegmentedControl";
import { CVItem } from "../CVItem/CVItem";
import type { CVEntry } from "../../data/cv";
import styles from "./CVSection.module.scss";

type Category = "experience" | "education";

const PANEL_ID = "cv-panel";
// Reihenfolge der Tabs = Slide-Richtung: links/rechts vom aktiven Index.
const ORDER: Category[] = ["experience", "education"];

// Liest --duration-panel aus CVSection.module.scss statt es als JS-Konstante
// zu duplizieren (gleiches Verfahren wie ImprintModal/ToastNotification bei
// --duration-state).
const panelSwapMs = () =>
	parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--duration-panel",
		),
	) || 800;

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
			panelSwapMs(),
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

	// Tab = Segment im SegmentedControl: Auswahl-Pille ruht auf dem aktiven Tab
	// und wandert nur bei Klick; Hover/Active trägt jedes Segment selbst.
	const tab = (category: Category, label: string) => (
		<SegmentedControl.Segment
			role="tab"
			active={active === category}
			aria-selected={active === category}
			aria-controls={PANEL_ID}
			onClick={() => select(category)}
			className={active === category ? styles.tabActive : styles.tabInactive}>
			<span>{label}</span>
		</SegmentedControl.Segment>
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
				<div className={styles.categoryStack}>
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
				</div>
				<SegmentedControl
					role="tablist"
					variant="primary"
					className={styles.controls}>
					{tab("experience", t("experience_heading"))}
					{tab("education", t("education_heading"))}
				</SegmentedControl>
			</div>
		</section>
	);
}

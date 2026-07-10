"use client";

import { useState } from "react";
import { useTranslations, useMessages } from "next-intl";

import Accordion from "./Accordion";
import InteractionWrapper from "./InteractionWrapper";
import Button from "./Button";
import { CVItem, SUMMARY_HEIGHT } from "./CVItem";
import type { CVEntry } from "../data/cv";
import styles from "./CVSection.module.scss";

type Category = "experience" | "education";

const PANEL_ID = "cv-panel";
// Reihenfolge der Tabs = Slide-Richtung: links/rechts vom aktiven Index.
const ORDER: Category[] = ["experience", "education"];

export default function CVSection() {
	const t = useTranslations("cv");
	const messages = useMessages() as {
		cv: { experience: CVEntry[]; education: CVEntry[] };
	};
	const { experience, education } = messages.cv;
	const [active, setActive] = useState<Category>("experience");
	const activeIndex = ORDER.indexOf(active);

	const select = (category: Category) => {
		if (category === active) return;
		setActive(category);
	};

	// Feste Panel-Höhe = Tab mit den meisten Items (geschlossen), damit das
	// Layout beim Wechsel nicht springt.
	const panelMinHeight =
		Math.max(experience.length, education.length) * SUMMARY_HEIGHT;

	// ID eines Eintrags im Accordion-State.
	const idOf = (entry: CVEntry) =>
		`${entry.organization}-${entry.roles[0].startYear}`;

	// Beide Tabs rendern dieselbe Liste, nur die Daten unterscheiden sich.
	// Die Variante wird nicht pro Item, sondern einmal am categoryPanel gesetzt
	// (siehe data-variant unten) — CVItem.module.scss stylt darüber die Kinder.
	const cvList = (entries: CVEntry[]) => (
		<Accordion>
			{entries.map((entry) => (
				<CVItem key={idOf(entry)} id={idOf(entry)} entry={entry} />
			))}
		</Accordion>
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
			<InteractionWrapper role="tablist" className={styles.tablist}>
				{tab("experience", t("experience_heading"))}
				{tab("education", t("education_heading"))}
			</InteractionWrapper>
			<div
				id={PANEL_ID}
				role="tabpanel"
				className={styles.panel}
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
							data-variant={category}
							className={`${styles.categoryPanel} ${
								isActive
									? styles.categoryActive
									: `${styles.categoryInactive} ${
											dir < 0
												? styles.categoryInactiveLeft
												: styles.categoryInactiveRight
										}`
							}`}>
							{cvList(
								category === "experience"
									? experience
									: education,
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}

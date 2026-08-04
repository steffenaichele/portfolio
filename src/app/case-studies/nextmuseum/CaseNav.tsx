"use client"; // IntersectionObserver ist eine Browser-API — die gibt es beim Server-Rendering nicht.

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

import Icon from "../../components/Icon";
import type { CaseSection } from "../../data/caseStudies/nextmuseum";
import styles from "./CaseNav.module.scss";

interface CaseNavProps {
	sections: CaseSection[];
	navLabel: string;
	homeLabel: string;
}

const CaseNav = ({ sections, navLabel, homeLabel }: CaseNavProps) => {
	const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
	// Nur für den Fallback ohne scroll-getriebene Animation: der wievielte
	// Abschnitt gerade aktiv ist (1-basiert).
	const activeIndex =
		sections.findIndex((section) => section.id === activeId) + 1;

	// Abhängigkeit als String statt als Array: die Props kommen bei jedem Render
	// der Server-Komponente als neues Array an, der Observer soll sich aber nur
	// neu aufhängen, wenn sich die IDs wirklich ändern.
	const ids = sections.map((section) => section.id).join(",");

	useEffect(() => {
		const elements = ids
			.split(",")
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null);

		// Ein einziger Observer für alle Abschnitte — kein Scroll-Listener.
		// rootMargin schneidet oben 33% und unten 60% weg. Übrig bleibt ein
		// schmales Band im oberen Drittel: erst wenn ein Abschnitt es kreuzt,
		// gilt er als aktiv (nicht schon beim Auftauchen am unteren Rand).
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((entry) => entry.isIntersecting);
				// Nichts im Band (z. B. zwischen zwei Abschnitten) → letzten
				// aktiven Eintrag behalten, sonst würde die Markierung ausgehen.
				if (visible.length === 0) return;
				const topmost = visible.reduce((a, b) =>
					a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
				);
				setActiveId(topmost.target.id);
			},
			{ rootMargin: "-33% 0px -60% 0px", threshold: 0 },
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [ids]);

	return (
		<nav className={styles.nav} aria-label={navLabel}>
			<div className={styles.inner}>
				{/* Lesefortschritt: stufenlos per CSS scroll-timeline, ohne
				    Scroll-Listener. Wo der Browser das nicht kann, greift
				    data-progress als Vier-Stufen-Fallback aus demselben
				    Observer — siehe CaseNav.module.scss. */}
				<div
					className={styles.rail}
					data-progress={activeIndex}
					aria-hidden="true">
					<span className={styles.railFill} />
				</div>
				<div className={styles.content}>
					<Link href="/" className={styles.home}>
						<Icon icon={RiArrowLeftLine} />
						<span>{homeLabel}</span>
					</Link>
					<ul className={styles.list}>
						{sections.map((section) => {
							const isActive = section.id === activeId;
							return (
								<li key={section.id}>
									<a
										href={`#${section.id}`}
										className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
										aria-current={isActive ? "true" : undefined}>
										{section.navLabel}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default CaseNav;

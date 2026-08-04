"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RiArrowRightLine } from "@remixicon/react";

import Button from "../Button/Button";
import Icon from "../Icon";
import { caseStudies, type CaseStudy } from "../../data/caseStudies";
import styles from "./CaseStudySection.module.scss";

/**
 * CaseStudySection — Case Studies als aufklappbare Slabs unter dem Intro.
 *
 * Auf-/Zuklappen macht natives <details name="…">: das name-Attribut sorgt
 * dafür, dass immer nur eine Karte offen ist (Akkordeon), <summary> ist von
 * Haus aus fokussierbar, per Enter/Space bedienbar und meldet den Zustand —
 * deshalb kein useState und kein aria-expanded von Hand.
 *
 * "use client" steht hier ausschließlich für den Scroll-Reveal auf Touch: ohne
 * Hover müssen die Produktshots anders auftauchen als über :hover.
 */
export default function CaseStudySection() {
	const t = useTranslations("home");
	const listRef = useRef<HTMLDivElement>(null);
	// enhanced schaltet erst der erste Observer-Callback: ohne JS (oder ohne
	// feuernden IntersectionObserver) bleiben die Shots per CSS eingeblendet —
	// unsichtbare Deko wäre schlechter als eine, die sich nicht bewegt.
	const [enhanced, setEnhanced] = useState(false);
	const [revealed, setRevealed] = useState<string[]>([]);

	useEffect(() => {
		// Auf Zeigergeräten übernimmt :hover — Observer nur auf Touch.
		if (!window.matchMedia("(hover: none)").matches) return;
		if (typeof IntersectionObserver !== "function") return;

		const cards =
			listRef.current?.querySelectorAll<HTMLElement>("[data-case-id]");
		if (!cards?.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				// Erst mit dem ersten Callback übernimmt JS die Steuerung. Feuert der
				// Observer nie, bleibt die CSS-Fallbackposition stehen.
				setEnhanced(true);
				setRevealed((previous) => {
					const next = new Set(previous);
					entries.forEach((entry) => {
						const id = entry.target.getAttribute("data-case-id");
						if (!id) return;
						if (entry.intersectionRatio > 0.45) next.add(id);
						else next.delete(id);
					});
					return [...next];
				});
			},
			{ threshold: [0, 0.45, 0.75] },
		);
		cards.forEach((card) => observer.observe(card));
		return () => observer.disconnect();
	}, []);

	// Die Shots liegen absolut im überlaufenden Karten-Rechteck: im Ruhezustand
	// stehen sie unterhalb der Karte und werden weggeschnitten, Hover/Fokus und
	// der offene Zustand fahren sie hoch (--shot-y, siehe SCSS).
	const shots = (study: CaseStudy) =>
		study.shots?.length ? (
			<div className={styles.shots} aria-hidden="true">
				{study.shots.map((shot) => (
					<span key={shot} className={styles.shot}>
						{shot}
					</span>
				))}
			</div>
		) : null;

	const head = (study: CaseStudy) => (
		<>
			{study.tags?.length ? (
				<ul className={styles.tags}>
					{study.tags.map((tag) => (
						<li key={tag} className={styles.tag}>
							{tag}
						</li>
					))}
				</ul>
			) : null}
			<h3 className={styles.headline}>{study.headline}</h3>
			{study.subline ? <p className={styles.subline}>{study.subline}</p> : null}
		</>
	);

	return (
		<section className={`${styles.section} breakout`} aria-labelledby="case-studies-heading">
			<h2 className={styles.heading} id="case-studies-heading">
				{t("cases_heading")}
			</h2>
			<div
				className={styles.list}
				ref={listRef}
				data-enhanced={enhanced ? "" : undefined}>
				{caseStudies.map((study) => {
					const isRevealed = revealed.includes(study.id);
					// Ohne Detailinhalt gäbe es nichts aufzuklappen — dann bleibt die
					// Karte eine statische Slab statt eines leeren Akkordeons.
					const expandable = Boolean(
						study.context || study.tags?.length || study.caseHref,
					);

					if (!expandable) {
						return (
							<article
								key={study.id}
								className={styles.card}
								data-case-id={study.id}
								data-revealed={isRevealed ? "" : undefined}>
								{head(study)}
								{shots(study)}
							</article>
						);
					}

					return (
						<details
							key={study.id}
							name="case-study"
							className={styles.card}
							data-case-id={study.id}
							data-revealed={isRevealed ? "" : undefined}>
							{/* Die Shots stehen IM summary: alles andere blendet der Browser
							    aus, solange <details> zu ist — außerhalb wären sie im
							    geschlossenen Zustand nicht da und der Hover liefe ins Leere.
							    Absolut positioniert bleiben sie trotzdem an der Karte. */}
							<summary className={styles.summary}>
								{head(study)}
								{shots(study)}
							</summary>
							<div className={styles.body}>
								{study.timeframe ? (
									<div className={styles.duration}>
										<span className={styles.eyebrow}>{t("cases_duration")}</span>
										<span className={styles.durationValue}>
											{study.timeframe}
										</span>
									</div>
								) : null}
								<div className={styles.detail}>
									{study.context ? (
										<p className={styles.context}>{study.context}</p>
									) : null}
									{study.caseHref ? (
										<Button
											variant="filled"
											content="iconText"
											href={study.caseHref}>
											<span>{t("cases_cta")}</span>
											<Icon icon={RiArrowRightLine} />
										</Button>
									) : null}
								</div>
							</div>
						</details>
					);
				})}
			</div>
		</section>
	);
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import AccordionItem from "./AccordionItem";
import { useAccordion } from "./Accordion";
import type { CVEntry } from "../data/cv";
import { prefersReduced } from "../hooks/usePrefersReducedMotion";
import { EASING_UI } from "../lib/motion";
import styles from "./CVItem.module.scss";

// CVItem — gesamter Inhalt eines CV-Accordion-Eintrags samt Animation. Die
// Karten-Optik (Bg, Rundung, Gap) liefert die umgebende AccordionItem-Shell;
// den Open-State liest CVItem selbst aus dem Accordion-Context (per `id`).
// Choreografie in drei Phasen:
//   Phase 1 (Klick):  Summary-Zeile (Org+Ort, dann Jahre) fadet gestaffelt
//                     nach oben aus.
//   Phase 2 (mit 1):  Container wächst von SUMMARY_HEIGHT auf auto.
//   Phase 3 (nach 1): Detail-Elemente faden gestaffelt von unten ein.
// Schließen = Umkehrung (Detail-Gruppen aus, Höhe schrumpft, Summary ein).

// --- Animationsparameter ---
// Distanz (px), um die sich Elemente beim Ein-/Ausfaden bewegen.
const SHIFT_DISTANCE = 4;
// Dauer (s) des Opacity-/Transform-Fades pro Element.
const FADE_DURATION = 0.2;
// Verzögerung (s) zwischen aufeinanderfolgenden gestaffelten Elementen.
const STAGGER_DELAY = 0.075;
// Verzögerung (s) zwischen Detail-Gruppen beim Ausfaden (Schließen, minimal).
const CLOSE_STAGGER = 0.1;
// Pause (s) nach dem letzten Detail-Element, bevor Höhe schrumpft und Summary erscheint.
const CLOSE_BUFFER = 0.175;
// Geschwindigkeits-Multiplikator für den Summary-Fade-in beim Schließen.
// 0.5 = halbe Geschwindigkeit → doppelte Dauer.
const SUMMARY_CLOSE_FADE_SPEED = 0.75;
// Dauer (s) pro animiertem Element für die Höhen-Animation des Containers
// (Öffnen/Schließen). Gesamtdauer = dieser Wert × Anzahl der Detail-Elemente.
const HEIGHT_PER_ELEMENT = 0.05;
// Höhe (px) des geschlossenen Items / der Summary-Zeile (single source).
export const SUMMARY_HEIGHT = 36;
// Anzahl der Summary-Elemente (Org+Location, Datum) — steuert das Öffnen-Timing.
const SUMMARY_COUNT = 2;

const variantBgStyles = {
	experience: styles.bgExp,
	education: styles.bgEdu,
};

const variantStyles = {
	experience: styles.textExp,
	education: styles.textEdu,
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
	/** Key im Accordion-State (identisch zur id des umgebenden AccordionItem). */
	id: string;
}

export function CVItem({ entry, variant, id }: CVItemProps) {
	const { openIds, toggle } = useAccordion();
	const isOpen = openIds.has(id);
	// True nach erster Interaktion. Davor (auch nach Tab-Wechsel/Remount) bleibt
	// das Item im statischen `rest`-Zustand — kein Keyframe → kein Mount-Flash.
	const [hasToggled, setHasToggled] = useState(false);
	const reduceMotion = prefersReduced();

	const detailsId = `cv-details-${entry.organization.replace(/\s+/g, "-").toLowerCase()}`;
	const otherRoles = entry.roles.slice(1);
	const hasExpandable =
		otherRoles.length > 0 ||
		!!entry.description?.length ||
		!!entry.technologies?.length;

	const color = variantStyles[variant];
	const bgColor = variantBgStyles[variant];

	const handleClick = () => {
		if (!hasExpandable) return;
		setHasToggled(true);
		toggle(id);
	};

	// Mount/Remount → "rest" (statisch, kein Keyframe). Erst nach erster
	// Interaktion die richtungsabhängigen Open/Closed-Keyframe-Varianten.
	const stateLabel = isOpen ? "open" : hasToggled ? "closed" : "rest";

	// Gesamtanzahl einzelner Detail-Elemente, die beim Öffnen animieren
	// (jede Rolle, jeder Description-Punkt und jeder Technologie-Tag zählt als ein Element).
	const animatedCount =
		otherRoles.length +
		(entry.description?.length ?? 0) +
		(entry.technologies?.length ?? 0);

	const offset = reduceMotion ? 0 : SHIFT_DISTANCE;
	const stagger = reduceMotion ? 0 : STAGGER_DELAY;
	const closeStagger = reduceMotion ? 0 : CLOSE_STAGGER;
	const closeBuffer = reduceMotion ? 0 : CLOSE_BUFFER;
	const heightDuration = reduceMotion
		? 0
		: HEIGHT_PER_ELEMENT * animatedCount;
	// Öffnen: Details warten, bis das letzte Summary-Element fertig ausgefadet ist.
	const summaryExitTime = (SUMMARY_COUNT - 1) * stagger + FADE_DURATION;
	// Schließen: Detail-Gruppen (statt einzelner Elemente) faden von unten nach
	// oben gestaffelt aus. Reihenfolge zuerst → zuletzt: technologies, description,
	// otherRoles, organisation+location. Nur vorhandene Gruppen zählen, damit der
	// Stagger lückenlos bleibt.
	const hasRoles = otherRoles.length > 0;
	const hasDesc = !!entry.description?.length;
	const hasTech = !!entry.technologies?.length;
	const closeOrder = [
		hasTech ? "tech" : null,
		hasDesc ? "desc" : null,
		hasRoles ? "roles" : null,
		"org",
	].filter(Boolean) as string[];
	const groupCount = closeOrder.length;
	const closeIndex = (name: string) => closeOrder.indexOf(name);
	// Phase 1 (Gruppen ausfaden) endet, wenn die letzte Gruppe (org) fertig ist.
	const detailsExitTime = (groupCount - 1) * closeStagger + FADE_DURATION / 2;
	// Schließen: Phase 2 (Höhe schrumpfen) dauert genau so lange wie Phase 1.
	const closeHeightDuration = reduceMotion ? 0 : detailsExitTime;

	// Details: Öffnen = von unten einfaden (+offset → 0), gestaffelt, nach dem
	// Summary-Exit. Einzelne Detail-Elemente faden NUR beim Öffnen gestaffelt ein.
	// Beim Schließen bleiben sie statisch — das Ausfaden übernimmt die Eltern-Gruppe.
	const detailsChild = {
		open: (i: number) => ({
			opacity: [0, 1],
			y: [offset, 0],
			transition: {
				duration: FADE_DURATION,
				delay: summaryExitTime + i * stagger,
			},
		}),
		closed: { opacity: 1, y: 0 },
		rest: { opacity: 0, y: 0 },
	};
	// Detail-Gruppen (otherRoles, description, technologies): beim Öffnen sofort
	// sichtbar (die Kinder faden einzeln ein), beim Schließen als Block ausfaden —
	// nach oben (y: 0 → -offset) bei opacity 1 → 0, gestaffelt von unten nach oben.
	const groupParent = {
		open: { opacity: 1, y: 0, transition: { duration: 0 } },
		closed: (c: { close: number }) => ({
			opacity: [1, 0],
			y: [0, -offset],
			transition: {
				duration: FADE_DURATION / 2,
				delay: c.close * closeStagger,
			},
		}),
		rest: { opacity: 0, y: 0 },
	};
	// Organisation + Location ist eine Blatt-Gruppe (keine animierten Kinder) und
	// animiert daher selbst: Öffnen wie ein Detail-Element, Schließen wie eine Gruppe.
	const orgGroup = {
		open: (c: { open: number }) => ({
			opacity: [0, 1],
			y: [offset, 0],
			transition: {
				duration: FADE_DURATION,
				delay: summaryExitTime + c.open * stagger,
			},
		}),
		closed: (c: { close: number }) => ({
			opacity: [1, 0],
			y: [0, -offset],
			transition: {
				duration: FADE_DURATION / 2,
				delay: c.close * closeStagger,
			},
		}),
		rest: { opacity: 0, y: 0 },
	};
	// Summary: `custom` = Element-Index (Org, Location, Datum). Öffnen = nach oben
	// ausfaden. Schließen = von unten einfaden, gestaffelt, nachdem Phase 1 fertig ist.
	const summaryChild = {
		open: (i: number) => ({
			opacity: [1, 0],
			y: [0, -offset],
			transition: { duration: FADE_DURATION, delay: i * stagger },
		}),
		closed: (i: number) => ({
			opacity: [0, 1],
			y: [offset, 0],
			transition: {
				duration: FADE_DURATION / SUMMARY_CLOSE_FADE_SPEED,
				delay: detailsExitTime + closeBuffer + i * stagger,
			},
		}),
		rest: { opacity: 1, y: 0 },
	};
	// Leere Eltern-Varianten: machen den Container zum Varianten-Knoten, damit
	// das `open`/`closed`/`rest`-Label an die Kinder (über `custom`) weitergegeben wird.
	const container = { open: {}, closed: {}, rest: {} };

	// Index-Offset pro Detail-Gruppe, damit alle Elemente fortlaufend gestaffelt werden.
	const descBase = otherRoles.length;
	const techBase = otherRoles.length + (entry.description?.length ?? 0);

	return (
		<AccordionItem isOpen={isOpen}>
			<button
				onClick={handleClick}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				className={`${styles.button} ${
					hasExpandable ? styles.cursorPointer : styles.cursorDefault
				}`}>
				{/* ╔══════════════════════════════════════════════════════════════╗
				    ║ HÖHEN-ANIMATION (Phase 2 — Container auf-/zuklappen)           ║
				    ║ • Dauer Öffnen   → heightDuration (= HEIGHT_PER_ELEMENT × N)   ║
				    ║ • Dauer Schließen → closeHeightDuration (= Länge von Phase 1)  ║
				    ╚══════════════════════════════════════════════════════════════╝ */}
				<motion.div
					id={detailsId}
					initial={false}
					animate={{ height: isOpen ? "auto" : SUMMARY_HEIGHT }}
					transition={{
						duration: isOpen ? heightDuration : closeHeightDuration,
						delay: isOpen ? 0 : closeBuffer,
						ease: EASING_UI,
					}}
					className={styles.heightWrap}>
					{/* ───────── Summary-Zeile (geschlossener Zustand) ─────────
					    Bleibt `absolute` (Overlay) — sonst beeinflusst es die Flow-Höhe. */}
					<motion.div
						variants={container}
						initial={false}
						animate={stateLabel}
						aria-hidden={isOpen}
						inert={isOpen || undefined}
						style={{ height: SUMMARY_HEIGHT }}
						className={styles.summaryRow}>
						<motion.div
							custom={0}
							variants={summaryChild}
							initial={false}
							className={styles.summaryOrgLoc}>
							<p className={styles.orgShort}>
								{entry.organizationShort}
								{","}
							</p>
							<p className={styles.summaryLocation}>
								{entry.location}
							</p>
						</motion.div>
						<motion.div
							custom={1}
							variants={summaryChild}
							initial={false}
							className={`${styles.summaryYears} ${color}`}>
							<p>{entry.totalStartYear}</p>
							<p> – </p>
							<p>{entry.totalEndYear}</p>
						</motion.div>
					</motion.div>
	
					{/* ───────── Detail-Inhalt (offener Zustand) ───────── */}
					<motion.div
						variants={container}
						initial={false}
						animate={stateLabel}
						aria-hidden={!isOpen}
						inert={!isOpen || undefined}
						className={styles.detailContainer}>
						<motion.div
							custom={{ open: -1, close: closeIndex("org") }}
							variants={orgGroup}
							initial={false}
							className={styles.orgGroup}>
							<p className={styles.orgName}>
								{entry.organization}
							</p>
							<p className={styles.orgLocation}>
								{entry.location}
							</p>
						</motion.div>
						{hasRoles && (
							<motion.div
								variants={groupParent}
								custom={{ close: closeIndex("roles") }}
								initial={false}
								className={styles.rolesGroup}>
								{otherRoles.map((role, idx) => (
									<motion.div
										key={`${role.title}-${role.startYear}-${role.startMonth}`}
										custom={idx}
										variants={detailsChild}
										initial={false}
										className={styles.roleItem}>
										<h2 className={styles.roleTitle}>
											{role.title}
										</h2>
										<div
											className={`${styles.roleDuration} ${color} ${bgColor}`}>
											<span>
												{role.startMonth}{" "}
												{role.startYear} – {role.endMonth}{" "}
												{role.endYear}
											</span>
											<span>·</span>
											<span>{role.duration}</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						)}
						{!!entry.description?.length && (
							<motion.ul
								variants={groupParent}
								custom={{ close: closeIndex("desc") }}
								initial={false}
								className={styles.descList}>
								{entry.description.map((point, idx) => (
									<motion.li
										key={point}
										custom={descBase + idx}
										variants={detailsChild}
										initial={false}
										className={styles.descItem}>
										{point}
									</motion.li>
								))}
							</motion.ul>
						)}
						{!!entry.technologies?.length && (
							<motion.div
								variants={groupParent}
								custom={{ close: closeIndex("tech") }}
								initial={false}
								className={styles.techList}>
								{entry.technologies.map((tech, idx) => (
									<motion.span
										key={tech}
										custom={techBase + idx}
										variants={detailsChild}
										initial={false}
										className={styles.techTag}>
										{tech}
									</motion.span>
								))}
							</motion.div>
						)}
					</motion.div>
				</motion.div>
			</button>
		</AccordionItem>
	);
}

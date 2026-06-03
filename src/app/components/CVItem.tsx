"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CVEntry } from "../data/cv";

// --- Animationsparameter ---
// Distanz (px), um die sich Elemente beim Ein-/Ausfaden bewegen.
const SHIFT_DISTANCE = 4;
// Dauer (s) des Opacity-/Transform-Fades pro Element.
const FADE_DURATION = 0.2;
// Verzögerung (s) zwischen aufeinanderfolgenden gestaffelten Elementen.
const STAGGER_DELAY = 0.075;
// Verzögerung (s) zwischen Detail-Elementen beim Ausfaden (Schließen, minimal).
const CLOSE_STAGGER = 0.05;
// Geschwindigkeits-Multiplikator für den Summary-Fade-in beim Schließen.
// 0.5 = halbe Geschwindigkeit → doppelte Dauer.
const SUMMARY_CLOSE_FADE_SPEED = 0.5;
// Dauer (s) pro animiertem Element für die Höhen-Animation des Containers
// (Öffnen/Schließen). Gesamtdauer = dieser Wert × Anzahl der Detail-Elemente.
const HEIGHT_PER_ELEMENT = 0.05;
// Höhe (px) des geschlossenen Items / der Summary-Zeile (single source).
const SUMMARY_HEIGHT = 36;
// Abstand (px) unterhalb des Buttons, nur im geöffneten Zustand.
const BOTTOM_SPACING = 20;
// Anzahl der Summary-Elemente (Org, Location, Datum) — steuert das Öffnen-Timing.
const SUMMARY_COUNT = 3;

const variantStyles = {
	experience: "text-[var(--color-text-exp)]",
	education: "text-[var(--color-text-edu)]",
};

interface CVItemProps {
	entry: CVEntry;
	variant: "experience" | "education";
}

export function CVItem({ entry, variant }: CVItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [showSurfaceBg, setShowSurfaceBg] = useState(false);
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

	// Gesamtanzahl einzelner Detail-Elemente, die beim Öffnen animieren
	// (jede Rolle, jeder Description-Punkt und jeder Technologie-Tag zählt als ein Element).
	const animatedCount =
		otherRoles.length +
		(entry.description?.length ?? 0) +
		(entry.technologies?.length ?? 0);

	const offset = reduceMotion ? 0 : SHIFT_DISTANCE;
	const stagger = reduceMotion ? 0 : STAGGER_DELAY;
	const closeStagger = reduceMotion ? 0 : CLOSE_STAGGER;
	const heightDuration = reduceMotion ? 0 : HEIGHT_PER_ELEMENT * animatedCount;
	// Öffnen: Details warten, bis das letzte Summary-Element fertig ausgefadet ist.
	const summaryExitTime = (SUMMARY_COUNT - 1) * stagger + FADE_DURATION;
	// Schließen: Phase 1 (Details ausfaden) dauert so lange, bis das letzte Detail-Element
	// fertig ist — danach startet die Summary (Phase 3).
	const detailsExitTime = Math.max(animatedCount - 1, 0) * closeStagger + FADE_DURATION / 2;
	// Schließen: Phase 2 (Höhe schrumpfen) dauert genau so lange wie Phase 1.
	const closeHeightDuration = reduceMotion ? 0 : detailsExitTime;
	// Surface-Hintergrund beim Schließen bis zur Hälfte der Gesamt-Schließdauer.
	const surfaceBgCloseMs = reduceMotion
		? 0
		: ((detailsExitTime +
				(SUMMARY_COUNT - 1) * stagger +
				FADE_DURATION / SUMMARY_CLOSE_FADE_SPEED) /
				2) *
			1000;

	useEffect(() => {
		if (isOpen) {
			setShowSurfaceBg(true);
			return;
		}
		if (surfaceBgCloseMs === 0) {
			setShowSurfaceBg(false);
			return;
		}
		const timeout = setTimeout(() => setShowSurfaceBg(false), surfaceBgCloseMs);
		return () => clearTimeout(timeout);
	}, [isOpen, surfaceBgCloseMs]);

	// Beide Content-Blöcke bleiben dauerhaft gemountet (kein Mount/Unmount =
	// kein Layout-Sprung). Zustände `open`/`closed` werden über `animate`
	// gesteuert. Keyframe-Arrays [start, end] erzwingen die Richtung unabhängig
	// vom Ruhepunkt — so kann Enter von unten und Exit nach oben gehen.

	// Details: Öffnen = von unten einfaden (+offset → 0), gestaffelt, nach dem
	// Summary-Exit. Schließen = nach oben ausfaden (0 → -offset), minimaler Stagger.
	const detailsChild = {
		open: (i: number) => ({
			opacity: [0, 1],
			y: [offset, 0],
			transition: { duration: FADE_DURATION, delay: summaryExitTime + i * stagger },
		}),
		closed: (i: number) => ({
			opacity: [1, 0],
			y: [0, -offset],
			transition: { duration: FADE_DURATION / 2, delay: i * closeStagger },
		}),
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
			transition: { duration: FADE_DURATION / SUMMARY_CLOSE_FADE_SPEED, delay: detailsExitTime + i * stagger },
		}),
	};
	// Leere Eltern-Varianten: machen den Container zum Varianten-Knoten, damit
	// das `open`/`closed`-Label an die Kinder (über `custom`) weitergegeben wird.
	const container = { open: {}, closed: {} };

	// Index-Offset pro Detail-Gruppe, damit alle Elemente fortlaufend gestaffelt werden.
	const descBase = otherRoles.length;
	const techBase = otherRoles.length + (entry.description?.length ?? 0);

	return (
		<>
		<li
			className={`cv-item relative rounded-[var(--radius-tab)] transition-colors duration-150 ${
				hasExpandable
					? "cv-item-interactive cursor-pointer active:bg-[var(--color-surface-bg-active)]"
					: "cursor-default"
			}${showSurfaceBg ? " is-open bg-[var(--color-surface-bg)]" : ""}`}>
			<button
				onClick={handleClick}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				className="block w-full p-0 text-left px-3">
				{/* ╔══════════════════════════════════════════════════════════════╗
				    ║ HÖHEN-ANIMATION (Container auf-/zuklappen)                     ║
				    ║ • Easing  → `ease` unten (gilt für Öffnen UND Schließen)       ║
				    ║ • Dauer Öffnen   → Konstante HEIGHT_PER_ELEMENT (oben)         ║
				    ║   (heightDuration = HEIGHT_PER_ELEMENT × Anzahl Elemente)      ║
				    ║ • Dauer Schließen → closeHeightDuration (= Länge von Phase 1)  ║
				    ╚══════════════════════════════════════════════════════════════╝ */}
				<motion.div
					id={detailsId}
					initial={false}
					animate={{ height: isOpen ? "auto" : SUMMARY_HEIGHT }}
					transition={{
						duration: isOpen ? heightDuration : closeHeightDuration,
						ease: "easeOut", // ← Easing der Höhen-Animation hier ändern
					}}
					className="relative overflow-hidden">
					{/* ───────── STYLING: Summary-Zeile (geschlossener Zustand) ─────────
					    Klassen der Texte/Layouts hier anpassen. Wichtig: bleibt
					    `absolute` (Overlay) — sonst beeinflusst es die Flow-Höhe. */}
					<motion.div
						variants={container}
						initial={false}
						animate={isOpen ? "open" : "closed"}
						aria-hidden={isOpen}
						inert={isOpen || undefined}
						style={{ height: SUMMARY_HEIGHT }}
						className="absolute inset-x-0 top-0 flex items-center text-md">
						<motion.p
							custom={0}
							variants={summaryChild}
							className="font-medium shrink-0 mr-1 text-[var(--color-text-primary)]">
							{entry.organizationShort}
							{","}
						</motion.p>
						<motion.p
							custom={1}
							variants={summaryChild}
							className="flex-1 min-w-0 truncate font-medium text-[var(--color-text-tertiary)]">
							{entry.location}
						</motion.p>
						<motion.div
							custom={2}
							variants={summaryChild}
							className={`shrink-0 flex items-center gap-0.5 tabular-nums font-medium ${color}`}>
							<p>{entry.totalStartYear}</p>
							<p>–</p>
							<p>{entry.totalEndYear}</p>
						</motion.div>
					</motion.div>

					{/* ───────── STYLING: Detail-Inhalt (offener Zustand) ─────────
					    Klassen/Markup der Rollen, Beschreibung, Tags hier anpassen.

					    DAMIT DIE ANIMATION HEIL BLEIBT, beim Bearbeiten beachten:
					    1. Jedes ANIMIERTE Element muss `motion.*` sein und
					       `variants={detailsChild}` + `custom={INDEX}` tragen.
					    2. `custom` = fortlaufender Index über ALLE Detail-Elemente
					       (Rollen → descBase+i → techBase+i). Beim Hinzufügen neuer
					       Gruppen den Index-Offset (descBase/techBase oben) anpassen,
					       sonst stimmt der Stagger nicht.
					    3. Dieser Container muss `variants`, `initial={false}` und
					       `animate={isOpen ? "open" : "closed"}` behalten — sonst wird
					       das Label nicht an die Kinder weitergegeben.
					    4. Nicht-animierte Zwischen-Wrapper (Gruppen) sind ok; sie
					       reichen das Label durch.
					    5. Container im normalen Flow lassen (kein `absolute`) — er
					       bestimmt die `auto`-Höhe beim Öffnen.
					    6. `inert`/`aria-hidden` an `!isOpen` gekoppelt lassen (A11y). */}
					<motion.div
						variants={container}
						initial={false}
						animate={isOpen ? "open" : "closed"}
						aria-hidden={!isOpen}
						inert={!isOpen || undefined}
						className="flex flex-col gap-6">
						{otherRoles.length > 0 && (
							<motion.div className="flex flex-col gap-6 ">
								{otherRoles.map((role, idx) => (
									<motion.div
										key={`${role.title}-${role.startYear}-${role.startMonth}`}
										custom={idx}
										variants={detailsChild}
										className="flex flex-wrap items-center gap-x-2 gap-y-1">
										<h2 className="text-2xl text-[var(--color-text-primary)]">
											{role.title}
										</h2>
										<div
											className={`w-min h-6 px-2 flex gap-2 items-center rounded-[var(--radius-sm)] text-sm font-medium text-nowrap tabular-nums ${color}`}>
											<span>
												{role.startMonth}{" "}
												{role.startYear} –{" "}
												{role.endMonth} {role.endYear}
											</span>
											<span>·</span>
											<span>{role.duration}</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						)}
						{!!entry.description?.length && (
							<motion.ul className="flex flex-col gap-4">
								{entry.description.map((point, idx) => (
									<motion.li
										key={point}
										custom={descBase + idx}
										variants={detailsChild}
										className="text-md text-[var(--color-text-secondary)]">
										{point}
									</motion.li>
								))}
							</motion.ul>
						)}
						{!!entry.technologies?.length && (
							<motion.div className="flex flex-wrap gap-1.5">
								{entry.technologies.map((tech, idx) => (
									<motion.span
										key={tech}
										custom={techBase + idx}
										variants={detailsChild}
										className="px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-button-primary-bg-hover)] rounded-[var(--radius-sm)]">
										{tech}
									</motion.span>
								))}
							</motion.div>
						)}
					</motion.div>
				</motion.div>
			</button>
		</li>
		<motion.div
				aria-hidden
				initial={false}
				animate={{ height: isOpen ? BOTTOM_SPACING : 0 }}
				transition={{
					duration: isOpen ? heightDuration : closeHeightDuration,
					ease: "easeOut",
				}}
				className="overflow-hidden"
			/>
		</>
	);
}

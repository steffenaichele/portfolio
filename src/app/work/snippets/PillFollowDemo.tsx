"use client";

import { useRef } from "react";
import {
	computeFlipTransform,
	prefersReducedMotion,
	readInlineBounds,
} from "../../lib/motion";
import styles from "./PillFollowDemo.module.scss";

/**
 * PillFollowDemo — bewusst UNVERDRAHTETES Code-Snippet (nirgends importiert).
 *
 * Destillat des früheren InteractionWrapper: eine einzige Pille gleitet per
 * FLIP zwischen den Buttons einer Gruppe und folgt dem Cursor — der Effekt,
 * der als spätere Impression gezeigt werden soll. Auf das Wesentliche
 * reduziert: pointerover/pointerout (nur Maus) + FLIP-Gleiten + Fade-out.
 * Keine Varianten, kein Rest-Ziel, keine Observer, keine Press-States.
 *
 * Kernidee (FLIP): Geometrie (left/top/width/height) wird SOFORT gesetzt —
 * animiert wird nur die inverse Compositor-Transform zurück zur Identität.
 * Dadurch gleitet die Pille ohne Layout-Arbeit pro Frame.
 */
const PillFollowDemo = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);

	// Pille deckungsgleich über den Button legen und vom alten Ort hingleiten.
	const moveTo = (target: HTMLElement) => {
		const pill = pillRef.current;
		const wrap = wrapperRef.current;
		if (!pill || !wrap) return;
		const wasVisible = pill.style.opacity === "1";
		const previousBounds = readInlineBounds(pill);
		const r = target.getBoundingClientRect();
		const w = wrap.getBoundingClientRect();
		pill.style.transition = "none";
		pill.style.left = `${r.left - w.left}px`;
		pill.style.top = `${r.top - w.top}px`;
		pill.style.width = `${r.width}px`;
		pill.style.height = `${r.height}px`;
		if (wasVisible && !prefersReducedMotion()) {
			// FLIP: am alten Ort erscheinen, dann zur Identität gleiten.
			pill.style.transform = computeFlipTransform(
				previousBounds,
				readInlineBounds(pill),
			);
			pill.getBoundingClientRect(); // Reflow: Start-Transform committen
			pill.style.transition =
				"transform var(--duration-move) var(--easing-ui), opacity var(--duration-state) var(--easing-ui)";
		}
		pill.style.transform = "translate(0, 0)";
		pill.style.opacity = "1";
	};

	const handlePointerOver = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const target = (e.target as HTMLElement).closest("button");
		if (target) moveTo(target);
	};

	const handlePointerOut = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		// Wechsel auf anderen Button → handlePointerOver übernimmt.
		if ((e.relatedTarget as HTMLElement | null)?.closest?.("button")) return;
		const pill = pillRef.current;
		if (!pill) return;
		pill.style.transition = "opacity var(--duration-state) var(--easing-ui)";
		pill.style.opacity = "0";
	};

	return (
		<div
			ref={wrapperRef}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			className={styles.wrapper}>
			<span ref={pillRef} aria-hidden className={styles.pill} />
			<button type="button" className={styles.item}>
				One
			</button>
			<button type="button" className={styles.item}>
				Two
			</button>
			<button type="button" className={styles.item}>
				Three
			</button>
		</div>
	);
};

export default PillFollowDemo;

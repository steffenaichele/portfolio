"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import {
	computeFlipTransform,
	prefersReducedMotion,
	readInlineBounds,
} from "../../lib/motion";
import styles from "./InteractionWrapper.module.scss";

/**
 * InteractionWrapper — einheitlicher Wrapper für ALLE klickbaren Elemente (Buttons,
 * Links, Tabs, Toggles). Einzige Quelle für die Pille der Seite.
 *
 * Eine einzige Pille bedient drei Fälle über zwei orthogonale Achsen:
 *
 *   variant  — Kontrast der RUHENDEN Pille:
 *     "primary"   sichtbar, hoher Kontrast  (z.B. Haupt-Navigation)
 *     "secondary" sichtbar, wenig Kontrast  (z.B. Sprachumschalter)
 *     "tertiary"  unsichtbar (nur Hover)    (z.B. Footer-Links, CV-Tabs) [default]
 *
 *   data-pill-rest="true" am Kind — RUHE-ZIEL: die Pille kehrt bei pointerout
 *     dorthin zurück (Toggle/Selektion) statt zu verschwinden. Ohne Ruhe-Ziel
 *     ist der Wrapper rein transient (Pille faded bei Verlassen aus).
 *
 * Lebenszyklus der Pille:
 *   - Ruhe    → liegt auf dem data-pill-rest-Kind (Variant-Farbe), ODER versteckt
 *   - Hover   → gleitet zum überfahrenen Kind (Hover-Farbe, nur Maus)
 *   - Press   → Active-Farbe + scale(0.97) auf Pille und Kind
 *   - pointerout → zurück zum Ruhe-Ziel, sonst ausblenden
 *
 * Die Ruhe-Platzierung läuft POINTER-UNABHÄNGIG (auch auf Touch) — sonst wäre
 * auf dem Handy nicht sichtbar, welches Segment ausgewählt ist.
 *
 * Kinder sollten im Ruhezustand transparent und OHNE eigene Rundung sein:
 * border-radius clippt das Pointer-Hit-Testing an den Ecken, die Pille würde
 * dort flackern. Rundung + Hintergrund + Active-State trägt allein die Pille.
 * Consumer setzt aria (aria-current/-selected/-pressed) UND data-pill-rest am
 * selben Kind — der Wrapper liest nur DOM, hält keinen eigenen State.
 *
 * Props (zusätzlich zu div-Attributen wie role/aria-label/style):
 *   variant    (optional)  — "primary" | "secondary" | "tertiary", default tertiary
 *   children   (required)  — klickbare Elemente
 *   className  (optional)  — Klassen für den Wrapper (z.B. Layout/Flex)
 */

// Nur Compositor-Properties animieren (transform/opacity/background-color).
// Geometrie (left/top/width/height) wird per FLIP sofort gesetzt; die Pille
// erscheint am alten Ort via inverser Transform und animiert zur Zielposition.
const FULL_TRANSITION =
	"transform var(--duration-move) var(--easing-ui), opacity var(--duration-state) var(--easing-ui), background-color var(--duration-state) var(--easing-ui)";

type Variant = "primary" | "secondary" | "tertiary";

// Pillenfarbe im Hover- bzw. Press-Zustand (variantenübergreifend).
const HOVER_BG = "var(--color-interactive-pill-hover)";
const ACTIVE_BG = "var(--color-interactive-pill-active)";
// Ruhefarbe je Variante (tertiary = transparent → effektiv unsichtbar).
const REST_BG: Record<Variant, string> = {
	primary: "var(--color-interactive-pill-rest-primary)",
	secondary: "var(--color-interactive-pill-rest-secondary)",
	tertiary: "var(--color-interactive-pill-rest-tertiary)",
};

interface InteractionWrapperProps extends HTMLAttributes<HTMLDivElement> {
	variant?: Variant;
	children: ReactNode;
}

const InteractionWrapper = ({
	variant = "tertiary",
	children,
	className,
	...rest
}: InteractionWrapperProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);
	// Aktuell von der Maus überfahrenes Kind (null = kein Hover).
	const hoverRef = useRef<HTMLElement | null>(null);
	// Aktuell gedrücktes Kind (für Scale-Down-Reset beim Loslassen).
	const pressedRef = useRef<HTMLElement | null>(null);
	const restBg = REST_BG[variant];

	// Pille deckungsgleich über das Element legen (relativ zum Wrapper).
	const place = (el: HTMLElement) => {
		const pill = pillRef.current;
		const wrap = wrapperRef.current;
		if (!pill || !wrap) return;
		const r = el.getBoundingClientRect();
		const w = wrap.getBoundingClientRect();
		pill.style.left = `${r.left - w.left}px`;
		pill.style.top = `${r.top - w.top}px`;
		pill.style.width = `${r.width}px`;
		pill.style.height = `${r.height}px`;
	};

	// Klickbares Element im Wrapper finden; disabled/suppressed zählt nicht.
	// Aufgeklappte/schließende Items setzen data-pill-suppress (eigener
	// Surface-Hintergrund) — die Pille bleibt dann fern, sonst Flackern.
	const clickableIn = (node: EventTarget | null): HTMLElement | null => {
		const el = (node as HTMLElement | null)?.closest?.("a, button") as
			| HTMLElement
			| null;
		if (!el || !wrapperRef.current?.contains(el)) return null;
		if (el.matches(":disabled") || el.getAttribute("aria-disabled") === "true")
			return null;
		if (el.getAttribute("data-pill-suppress") === "true") return null;
		return el;
	};

	// Ruhe-Ziel: das als data-pill-rest markierte Kind (falls klickbar).
	const restTarget = (): HTMLElement | null => {
		const el =
			wrapperRef.current?.querySelector<HTMLElement>(
				'[data-pill-rest="true"]',
			) ?? null;
		return el ? clickableIn(el) : null;
	};

	// Gedrücktes Element entspannen (Scale-Down zurücksetzen).
	const releasePressed = () => {
		if (pressedRef.current) {
			pressedRef.current.style.transform = "";
			pressedRef.current = null;
		}
	};

	// Pille auf ein Element bewegen. Verhalten nach Sichtbarkeit + animate:
	//   sichtbar + animate → FLIP-Gleiten vom alten Ort (Compositor-Pfad)
	//   sichtbar + !animate → Snap (Erstplatzierung/Resize)
	//   versteckt + animate → Einblenden am Ort (Opacity 0→1, kein Slide)
	//   versteckt + !animate → sofort sichtbar (Mount ohne Fade, kein Flash)
	const moveTo = (el: HTMLElement, bg: string, animate: boolean) => {
		const pill = pillRef.current;
		if (!pill) return;
		const wasVisible = pill.style.opacity === "1";
		const previousBounds = readInlineBounds(pill);
		pill.style.transition = "none";
		place(el);
		pill.style.background = bg;
		const targetBounds = readInlineBounds(pill);

		if (wasVisible && previousBounds.width) {
			if (animate && !prefersReducedMotion()) {
				pill.style.opacity = "1";
				pill.style.transform = computeFlipTransform(
					previousBounds,
					targetBounds,
				);
				pill.getBoundingClientRect(); // Reflow erzwingen
				pill.style.transition = FULL_TRANSITION;
				pill.style.transform = "translate(0, 0)";
			} else {
				pill.style.transform = "translate(0, 0)";
				pill.style.opacity = "1";
				pill.getBoundingClientRect();
				pill.style.transition = FULL_TRANSITION;
			}
		} else {
			pill.style.transform = "translate(0, 0)";
			pill.style.opacity = animate ? "0" : "1";
			pill.getBoundingClientRect(); // Reflow: opacity:0 committen für den Fade
			pill.style.transition = FULL_TRANSITION;
			if (animate) pill.style.opacity = "1";
		}
	};

	// Pille ausblenden (kein Ruhe-Ziel). animate=false → sofort (Mount).
	const hide = (animate: boolean) => {
		const pill = pillRef.current;
		if (!pill) return;
		pill.style.transition = animate ? FULL_TRANSITION : "none";
		pill.style.transform = "translate(0, 0)";
		pill.style.opacity = "0";
		pill.style.background = restBg;
		releasePressed();
	};

	// Natürlichen Zustand herstellen: Hover-Ziel, sonst Ruhe-Ziel, sonst weg.
	const settle = (animate: boolean) => {
		const target = hoverRef.current ?? restTarget();
		if (!target) {
			hide(animate);
			return;
		}
		moveTo(target, hoverRef.current ? HOVER_BG : restBg, animate);
	};

	const handlePointerOver = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const el = clickableIn(e.target);
		if (!el || el === hoverRef.current) return;
		hoverRef.current = el;
		moveTo(el, HOVER_BG, true);
	};

	const handlePointerOut = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		if (!clickableIn(e.target)) return;
		// Wechsel auf anderes Kind → handlePointerOver übernimmt (kein Verstecken).
		if (clickableIn(e.relatedTarget)) return;
		hoverRef.current = null;
		settle(true); // zurück zum Ruhe-Ziel oder ausblenden
	};

	// Active-State auf der Pille: Drücken färbt sie und skaliert leicht ein
	// (Emil-Prinzip: Buttons müssen auf Druck responsiv reagieren).
	const handlePointerDown = (e: React.PointerEvent) => {
		const pill = pillRef.current;
		const el = clickableIn(e.target);
		if (!pill || !el) return;
		// Touch hat keinen Hover-Pass — Pille sitzt evtl. woanders/versteckt.
		// Snap (kein Slide) direkt auf das getippte Element vor dem Einfärben.
		if (e.pointerType !== "mouse") moveTo(el, ACTIVE_BG, false);
		else pill.style.background = ACTIVE_BG;
		pill.style.transform = "scale(0.97)";
		// Gedrücktes Element selbst mitskalieren (sitzt über der Pille).
		el.style.transition = "transform var(--duration-state) var(--easing-ui)";
		el.style.transform = "scale(0.97)";
		pressedRef.current = el;
	};

	const handlePointerUp = () => {
		releasePressed();
		const pill = pillRef.current;
		if (!pill) return;
		const target = hoverRef.current ?? restTarget();
		pill.style.transition = FULL_TRANSITION;
		pill.style.transform = "translate(0, 0)";
		if (target) {
			pill.style.background = hoverRef.current ? HOVER_BG : restBg;
		} else {
			pill.style.opacity = "0";
		}
	};

	useEffect(() => {
		const wrap = wrapperRef.current;
		if (!wrap) return;

		// Ruhe-Pille beim Mount setzen — pointer-unabhängig (Snap, kein Fade).
		settle(false);

		// Ruhe-Ziel kann sich ändern (Toggle-Auswahl) oder ein bedecktes Kind
		// unbedienbar werden (data-pill-suppress/disabled). Beides → neu setzen.
		const mo = new MutationObserver(() => {
			if (hoverRef.current && !clickableIn(hoverRef.current))
				hoverRef.current = null;
			settle(true);
		});
		mo.observe(wrap, {
			subtree: true,
			attributes: true,
			attributeFilter: [
				"data-pill-rest",
				"data-pill-suppress",
				"disabled",
				"aria-disabled",
			],
		});

		// Segmentbreiten ändern sich am responsiven Typo-Breakpoint → Ruhe-Pille
		// neu platzieren (Snap). Erster (Initial-)Callback übersprungen.
		let first = true;
		const ro = new ResizeObserver(() => {
			if (first) {
				first = false;
				return;
			}
			settle(false);
		});
		ro.observe(wrap);

		return () => {
			mo.disconnect();
			ro.disconnect();
		};
		// Handler lesen nur Refs/DOM (kein reaktiver State) → stabil.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={wrapperRef}
			{...rest}
			data-interaction-wrapper=""
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			className={`${styles.wrapper} ${className ?? ""}`}>
			<span
				ref={pillRef}
				aria-hidden
				className={styles.pill}
				style={{
					background: restBg,
					transition: FULL_TRANSITION,
				}}
			/>
			{children}
		</div>
	);
};

export default InteractionWrapper;

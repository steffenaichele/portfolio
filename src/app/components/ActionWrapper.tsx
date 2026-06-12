"use client";

import { HTMLAttributes, ReactNode, useRef } from "react";
import clsx from "clsx";

/**
 * ActionWrapper — einheitlicher Wrapper für klickbare Elemente (Buttons,
 * Links, Tabs, CV-Items). Einzige Quelle für den Pill-Hover-Effekt der Seite.
 *
 * Erzeugt eine richtungsabhängige Hover-Pille: Sie erscheint aus der Kante, an
 * der der Cursor eintritt (oben/unten/links/rechts), und verschwindet zur
 * Kante, an der er austritt. Zwischen mehreren Elementen im selben Wrapper
 * gleitet die Pille (geteilte Geometrie).
 *
 * Jedes <a>/<button> im Wrapper wird automatisch zum Hover-Ziel — außer
 * disabled/aria-disabled. Kinder sollten im Ruhezustand transparent und OHNE
 * eigene Rundung sein: border-radius clippt das Pointer-Hit-Testing an den
 * Ecken, die Pille würde dort flackern. Die Rundung trägt allein die Pille.
 *
 * Props (zusätzlich zu div-Attributen wie role/style):
 *   children   (required)  — klickbare Elemente
 *   className  (optional)  — Klassen für den Wrapper (z.B. Layout/Flex)
 *
 * Pillen-Farben: universelle Tokens --color-pill-hover / --color-pill-active.
 * Die Pille trägt auch den Active-State (gedrückt = active-Farbe) — die
 * Elemente selbst haben keinen eigenen active:bg mehr, sonst würde deren
 * fehlende Rundung sichtbar. Kontext-Overrides der Tokens per CSS-Scope
 * (siehe `footer .action-wrapper` in globals.css).
 *
 * Beispiel:
 *   <ActionWrapper className="flex flex-row gap-1">
 *     <Button isLink href="/">Home</Button>
 *     <Button isLink href="/imprint">Impressum</Button>
 *   </ActionWrapper>
 */

type Direction = "top" | "right" | "bottom" | "left";

// Versatz (% der Elementgröße), mit dem die Pille beim Erscheinen/Verschwinden
// startet/endet. 100 → Pille kommt exakt von der angrenzenden Kante.
const offsetDistance = 100;
// Start-/End-Transform pro Eintritts-/Austrittskante.
const OFFSET: Record<Direction, string> = {
	top: `translateY(-${offsetDistance}%)`,
	bottom: `translateY(${offsetDistance}%)`,
	left: `translateX(-${offsetDistance}%)`,
	right: `translateX(${offsetDistance}%)`,
};

// Nur Compositor-Properties animieren (transform/opacity/background-color).
// Geometrie (left/top/width/height) wird per FLIP sofort gesetzt; die Pille
// erscheint am alten Ort via inverser Transform und animiert zur Zielposition.
const FULL_TRANSITION =
	"transform 300ms var(--ease-out), opacity 150ms var(--ease-out), background-color 150ms var(--ease-out)";
// Reduced motion: kein Gleiten/Schieben, nur Ein-/Ausblenden + Farbwechsel.
const REDUCED_TRANSITION =
	"opacity 150ms var(--ease-out), background-color 150ms var(--ease-out)";

// MediaQueryList einmal anlegen (lazy, Browser-only) statt pro Pointer-Event —
// das Objekt hält .matches selbst aktuell.
let reducedMotionQuery: MediaQueryList | undefined;
const prefersReduced = () => {
	if (typeof window === "undefined") return false;
	reducedMotionQuery ??= window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	);
	return reducedMotionQuery.matches;
};

interface ActionWrapperProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const ActionWrapper = ({
	children,
	className,
	...rest
}: ActionWrapperProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);
	// Aktuell von der Pille bedecktes Element (null = Pille versteckt).
	const currentRef = useRef<HTMLElement | null>(null);

	// Nächstliegende Kante des Element-Rects zum Cursor (Eintritt/Austritt).
	const edgeOf = (e: React.PointerEvent, r: DOMRect): Direction => {
		const top = (e.clientY - r.top) / r.height;
		const left = (e.clientX - r.left) / r.width;
		const dist = { top, bottom: 1 - top, left, right: 1 - left };
		const min = Math.min(dist.top, dist.bottom, dist.left, dist.right);
		if (min === dist.top) return "top";
		if (min === dist.bottom) return "bottom";
		if (min === dist.left) return "left";
		return "right";
	};

	// Pille deckungsgleich über das Element legen (relativ zum Wrapper).
	// Rect kann vom Aufrufer durchgereicht werden, um Doppellesungen zu sparen.
	const place = (el: HTMLElement, r = el.getBoundingClientRect()) => {
		const pill = pillRef.current;
		const wrap = wrapperRef.current;
		if (!pill || !wrap) return;
		const w = wrap.getBoundingClientRect();
		pill.style.left = `${r.left - w.left}px`;
		pill.style.top = `${r.top - w.top}px`;
		pill.style.width = `${r.width}px`;
		pill.style.height = `${r.height}px`;
	};

	// Erscheinen: Pille sofort an die Kante setzen, dann in die Mitte animieren.
	const show = (el: HTMLElement, dir: Direction, rect?: DOMRect) => {
		const pill = pillRef.current;
		if (!pill) return;
		currentRef.current = el;
		if (prefersReduced()) {
			pill.style.transition = REDUCED_TRANSITION;
			place(el, rect);
			pill.style.transform = "translate(0, 0)";
			pill.style.opacity = "1";
			return;
		}
		pill.style.transition = "none";
		place(el, rect);
		pill.style.transform = OFFSET[dir];
		pill.style.opacity = "0";
		pill.getBoundingClientRect(); // Reflow erzwingen, damit Startwerte greifen
		pill.style.transition = FULL_TRANSITION;
		pill.style.transform = "translate(0, 0)";
		pill.style.opacity = "1";
	};

	// Wechsel zwischen Elementen: FLIP — Geometrie sofort setzen, inverse
	// Transform anlegen, dann zu Identität animieren (nur Compositor-Pfad).
	const slide = (el: HTMLElement) => {
		const pill = pillRef.current;
		if (!pill) return;
		currentRef.current = el;
		if (prefersReduced()) {
			pill.style.transition = REDUCED_TRANSITION;
			place(el);
			return;
		}
		// Alte Geometrie aus Inline-Styles lesen (bereits platziert).
		const oldLeft = parseFloat(pill.style.left) || 0;
		const oldTop = parseFloat(pill.style.top) || 0;
		const oldW = parseFloat(pill.style.width) || 0;
		const oldH = parseFloat(pill.style.height) || 0;
		// Neue Geometrie setzen (kein Übergang).
		pill.style.transition = "none";
		place(el);
		const newLeft = parseFloat(pill.style.left);
		const newTop = parseFloat(pill.style.top);
		const newW = parseFloat(pill.style.width);
		const newH = parseFloat(pill.style.height);
		// Inverse Transform: Pille visuell am alten Ort erscheinen lassen.
		const tx = oldLeft + oldW / 2 - (newLeft + newW / 2);
		const ty = oldTop + oldH / 2 - (newTop + newH / 2);
		const sx = newW ? oldW / newW : 1;
		const sy = newH ? oldH / newH : 1;
		pill.style.transform = `translate(${tx}px, ${ty}px) scaleX(${sx}) scaleY(${sy})`;
		pill.getBoundingClientRect(); // Reflow erzwingen
		pill.style.transition = FULL_TRANSITION;
		pill.style.transform = "translate(0, 0)";
	};

	// Verschwinden: zur Austrittskante schieben und ausblenden.
	const hide = (e: React.PointerEvent) => {
		const pill = pillRef.current;
		const el = currentRef.current;
		if (!pill || !el) return;
		if (prefersReduced()) {
			pill.style.transition = REDUCED_TRANSITION;
			pill.style.transform = "translate(0, 0)";
		} else {
			pill.style.transition = FULL_TRANSITION;
			pill.style.transform = OFFSET[edgeOf(e, el.getBoundingClientRect())];
		}
		pill.style.opacity = "0";
		// Gedrückt rausgezogen → Active-Farbe zurücksetzen.
		pill.style.background = "var(--color-pill-hover)";
		currentRef.current = null;
	};

	// Klickbares Element im Wrapper finden; disabled zählt nicht (z.B.
	// nicht-aufklappbare CV-Items).
	const clickableIn = (node: EventTarget | null): HTMLElement | null => {
		const el = (node as HTMLElement | null)?.closest?.("a, button") as
			| HTMLElement
			| null;
		if (!el || !wrapperRef.current?.contains(el)) return null;
		if (el.matches(":disabled") || el.getAttribute("aria-disabled") === "true")
			return null;
		return el;
	};

	const handlePointerOver = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const el = clickableIn(e.target);
		if (!el || el === currentRef.current) return;
		if (currentRef.current) {
			slide(el);
		} else {
			// Rect einmal lesen, für Kanten-Erkennung und Platzierung teilen.
			const rect = el.getBoundingClientRect();
			show(el, edgeOf(e, rect), rect);
		}
	};

	const handlePointerOut = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		if (!clickableIn(e.target)) return;
		// Wechsel auf anderes klickbares Element → gleitet (handlePointerOver),
		// kein Verstecken. Nur ausblenden, wenn Ziel kein Clickable ist.
		if (clickableIn(e.relatedTarget)) return;
		hide(e);
	};

	// Active-State liegt auf der Pille: Drücken färbt sie und skaliert leicht
	// ein (Emil-Prinzip: Buttons müssen auf Druck responsiv reagieren).
	const handlePointerDown = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const pill = pillRef.current;
		if (!pill || !clickableIn(e.target)) return;
		pill.style.background = "var(--color-pill-active)";
		pill.style.transform = "scale(0.97)";
	};

	const handlePointerUp = () => {
		const pill = pillRef.current;
		// Nur zurücksetzen, wenn die Pille überhaupt aktiv auf einem Element liegt.
		if (!pill || !currentRef.current) return;
		pill.style.background = "var(--color-pill-hover)";
		pill.style.transform = "translate(0, 0)";
	};

	return (
		<div
			ref={wrapperRef}
			{...rest}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			// Kinder positioniert (relative), damit sie über der absolut
			// positionierten Pille gerendert werden. rounded-none erzwingt den
			// Pill-Kontrakt strukturell: gerundete Clickables würden das
			// Pointer-Hit-Testing an den Ecken clippen (Pille flackert).
			className={clsx(
				"action-wrapper relative [&_a]:relative [&_button]:relative [&_a]:rounded-none [&_button]:rounded-none",
				className,
			)}>
			<span
				ref={pillRef}
				aria-hidden
				className="absolute left-0 top-0 size-0 opacity-0 pointer-events-none rounded-full"
				style={{
					background: "var(--color-pill-hover)",
					transition: FULL_TRANSITION,
				}}
			/>
			{children}
		</div>
	);
};

export default ActionWrapper;

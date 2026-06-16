"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";

/**
 * ActionWrapper — einheitlicher Wrapper für klickbare Elemente (Buttons,
 * Links, Tabs, CV-Items). Einzige Quelle für den Pill-Hover-Effekt der Seite.
 *
 * Erzeugt eine richtungsabhängige Hover-Pille: Sie erscheint aus der Richtung,
 * in der der Cursor eintritt (stufenlos, jeder Winkel), und verschwindet zur
 * Austrittsrichtung. Zwischen mehreren Elementen im selben Wrapper gleitet die
 * Pille (geteilte Geometrie).
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

// Versatz (% der Elementgröße), mit dem die Pille beim Erscheinen/Verschwinden
// startet/endet. 100 → Pille kommt exakt von der angrenzenden Kante.
const offsetDistance = 100;

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
	// Aktuell gedrücktes Element (für Scale-Down-Reset beim Loslassen).
	const pressedRef = useRef<HTMLElement | null>(null);

	// Eintritts-/Austrittsrichtung als stufenloser Versatz-Transform. Eintrittspunkt
	// zentriert und per Max-Komponente normalisiert: die dominante (Eintritts-)Achse
	// landet exakt auf ±offsetDistance%, die Quer-Achse skaliert linear mit der
	// Eintrittsposition (jeder Winkel, nicht nur die 4 Kardinalrichtungen). minDist
	// (0–0.5) erkennt wie bisher, ob der Cursor bereits im Inneren liegt (kein echter
	// Eintritt von außen).
	const offsetOf = (
		e: React.PointerEvent,
		r: DOMRect,
	): { offset: string; minDist: number } => {
		const nx = (e.clientX - r.left) / r.width - 0.5;
		const ny = (e.clientY - r.top) / r.height - 0.5;
		const m = Math.max(Math.abs(nx), Math.abs(ny));
		const d = m || 1; // Division-Guard im Element-Zentrum (m = 0)
		const ox = (nx / d) * offsetDistance;
		const oy = (ny / d) * offsetDistance;
		return { offset: `translate(${ox}%, ${oy}%)`, minDist: 0.5 - m };
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
	// fadeOnly=true wenn Cursor bereits im Inneren liegt (z.B. nach Schließen eines
	// CV-Items) — dann nur Opacity, kein Richtungs-Slide (sonst Flackern).
	const show = (
		el: HTMLElement,
		offset: string,
		rect?: DOMRect,
		fadeOnly = false,
	) => {
		const pill = pillRef.current;
		if (!pill) return;
		currentRef.current = el;
		if (prefersReduced() || fadeOnly) {
			// Snap position + opacity zu 0, dann Opacity-only animieren.
			// Reflow zwischen "none" und REDUCED_TRANSITION nötig, damit der
			// Browser den Startwert committet — sonst batchet er alles und springt.
			pill.style.transition = "none";
			place(el, rect);
			pill.style.transform = "translate(0, 0)";
			pill.style.opacity = "0";
			pill.getBoundingClientRect();
			pill.style.transition = REDUCED_TRANSITION;
			pill.style.opacity = "1";
			return;
		}
		pill.style.transition = "none";
		place(el, rect);
		pill.style.transform = offset;
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
		const oldWidth = parseFloat(pill.style.width) || 0;
		const oldHeight = parseFloat(pill.style.height) || 0;
		// Neue Geometrie setzen (kein Übergang).
		pill.style.transition = "none";
		place(el);
		const newLeft = parseFloat(pill.style.left);
		const newTop = parseFloat(pill.style.top);
		const newWidth = parseFloat(pill.style.width);
		const newHeight = parseFloat(pill.style.height);
		// Inverse Transform: Pille visuell am alten Ort erscheinen lassen.
		const tx = oldLeft + oldWidth / 2 - (newLeft + newWidth / 2);
		const ty = oldTop + oldHeight / 2 - (newTop + newHeight / 2);
		const sx = newWidth ? oldWidth / newWidth : 1;
		const sy = newHeight ? oldHeight / newHeight : 1;
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
			pill.style.transform = offsetOf(e, el.getBoundingClientRect()).offset;
		}
		pill.style.opacity = "0";
		// Gedrückt rausgezogen → Active-Farbe und Scale zurücksetzen.
		pill.style.background = "var(--color-pill-hover)";
		if (pressedRef.current) {
			pressedRef.current.style.transform = "";
			pressedRef.current = null;
		}
		currentRef.current = null;
	};

	// Pille ohne Richtungs-Slide ausblenden — genutzt, wenn das bedeckte Element
	// unbedienbar wird (z.B. CV-Item öffnet unter ruhendem Cursor und setzt
	// data-pill-suppress). Dann feuert kein Pointer-Event, also keine Austritts-
	// richtung: nur an Ort und Stelle ausfaden.
	const fadeOut = () => {
		const pill = pillRef.current;
		if (!pill || !currentRef.current) return;
		pill.style.transition = prefersReduced()
			? REDUCED_TRANSITION
			: FULL_TRANSITION;
		pill.style.opacity = "0";
		pill.style.background = "var(--color-pill-hover)";
		if (pressedRef.current) {
			pressedRef.current.style.transform = "";
			pressedRef.current = null;
		}
		currentRef.current = null;
	};

	// Klickbares Element im Wrapper finden; disabled zählt nicht (z.B.
	// nicht-aufklappbare CV-Items). Aufgeklappte und gerade schließende Items
	// setzen data-pill-suppress (eigener Surface-Hintergrund); die Pille wird erst
	// nach Abschluss der Schließ-Animation wieder zugelassen — sonst Flackern.
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

	const handlePointerOver = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const el = clickableIn(e.target);
		if (!el || el === currentRef.current) return;
		if (currentRef.current) {
			slide(el);
		} else {
			// Rect einmal lesen, für Richtungs-Erkennung und Platzierung teilen.
			const rect = el.getBoundingClientRect();
			const { offset, minDist } = offsetOf(e, rect);
			// Cursor bereits im Inneren (minDist > 0.15) → kein Richtungs-Slide,
			// nur Opacity-Fade. Passiert z.B. wenn ein CV-Item unter dem Cursor
			// schließt und die Pille nach Ablauf der Suppress-Zeit erscheint.
			show(el, offset, rect, minDist > 0.15);
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
		const el = clickableIn(e.target);
		if (!pill || !el) return;
		pill.style.background = "var(--color-pill-active)";
		pill.style.transform = "scale(0.97)";
		// Gedrücktes Element selbst mitskalieren (sitzt über der Pille).
		el.style.transition = "transform 150ms var(--ease-out)";
		el.style.transform = "scale(0.97)";
		pressedRef.current = el;
	};

	const handlePointerUp = () => {
		const el = pressedRef.current;
		if (el) {
			el.style.transform = "";
			pressedRef.current = null;
		}
		const pill = pillRef.current;
		// Nur zurücksetzen, wenn die Pille überhaupt aktiv auf einem Element liegt.
		if (!pill || !currentRef.current) return;
		pill.style.background = "var(--color-pill-hover)";
		pill.style.transform = "translate(0, 0)";
	};

	// Pille ist Pointer-Event-getrieben — ein still stehender Cursor erzeugt keinen
	// pointerout. Wird das bedeckte Element jedoch unbedienbar (CV-Item öffnet und
	// setzt data-pill-suppress, oder wird disabled), muss die Pille trotzdem weg.
	// MutationObserver überwacht diese Attribute und blendet die Pille aus, sobald
	// das aktuell bedeckte Element nicht mehr klickbar ist.
	useEffect(() => {
		const wrap = wrapperRef.current;
		if (!wrap) return;
		const obs = new MutationObserver(() => {
			const el = currentRef.current;
			if (el && !clickableIn(el)) fadeOut();
		});
		obs.observe(wrap, {
			subtree: true,
			attributes: true,
			attributeFilter: ["data-pill-suppress", "disabled", "aria-disabled"],
		});
		return () => obs.disconnect();
		// clickableIn/fadeOut lesen nur Refs/DOM (kein reaktiver State) → stabil.
	}, []);

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
				"relative w-fit -m-1 p-1 overflow-hidden rounded-3xl bg-[var(--color-interactive-wrapper)] hover:bg-[var(--color-interactive-wrapper-hover)] inner-shadow-none hover:inset-shadow-[var(--shadow-interactive-wrapper-inner)] [&_a]:relative [&_button]:relative [&_a]:rounded-none [&_button]:rounded-none",
				className,
			)}>
			<span
				ref={pillRef}
				aria-hidden
				className="absolute left-0 top-0 size-0 opacity-0 pointer-events-none rounded-2xl shadow-[var(--shadow)] will-change-opacity will-change-transform"
				style={{
					background: "var(--color-interactive-pill)",
					transition: FULL_TRANSITION,
				}}
			/>
			{children}
		</div>
	);
};

export default ActionWrapper;

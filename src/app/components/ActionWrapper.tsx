"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { computeFlipTransform, readInlineBounds } from "../lib/motion";
import styles from "./ActionWrapper.module.scss";

/**
 * ActionWrapper — einheitlicher Wrapper für klickbare Elemente (Buttons,
 * Links, Tabs, CV-Items). Einzige Quelle für den Pill-Hover-Effekt der Seite.
 *
 * Erzeugt eine Hover-Pille: Sie blendet hinter dem überfahrenen Element ein
 * (Opacity 0 → 1, ohne Richtungs-Slide) und beim Verlassen wieder aus.
 * Zwischen mehreren Elementen im selben Wrapper gleitet die Pille
 * (geteilte Geometrie).
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
 * Pillen-Farben: universelle Tokens --color-interactive-pill /
 * --color-interactive-pill-active. Die Pille trägt auch den Active-State
 * (gedrückt = active-Farbe) — die Elemente selbst haben keinen eigenen
 * active:bg mehr, sonst würde deren fehlende Rundung sichtbar. Die Tokens
 * lassen sich per CSS-Scope kontextabhängig überschreiben.
 *
 * Beispiel:
 *   <ActionWrapper className="flex flex-row gap-1">
 *     <Button isLink href="/">Home</Button>
 *     <Button isLink href="/imprint">Impressum</Button>
 *   </ActionWrapper>
 */

// Nur Compositor-Properties animieren (transform/opacity/background-color).
// Geometrie (left/top/width/height) wird per FLIP sofort gesetzt; die Pille
// erscheint am alten Ort via inverser Transform und animiert zur Zielposition.
const FULL_TRANSITION =
	"transform var(--duration-move) var(--easing-ui), opacity var(--duration-state) var(--easing-ui), background-color var(--duration-state) var(--easing-ui)";

// Pillenfarbe im Ruhe-/Hover-Zustand bzw. beim Drücken (Active).
const PILL_BG = "var(--color-interactive-pill)";
const PILL_BG_ACTIVE = "var(--color-interactive-pill-active)";

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

	// Erscheinen: Pille deckungsgleich hinter das Element legen und einblenden
	// (Opacity 0 → 1, kein Richtungs-Slide). Reflow zwischen "none" und der
	// Transition nötig, damit der Browser opacity:0 committet — sonst batcht er
	// alles und springt ohne Fade.
	const show = (el: HTMLElement) => {
		const pill = pillRef.current;
		if (!pill) return;
		currentRef.current = el;
		pill.style.transition = "none";
		place(el);
		pill.style.transform = "translate(0, 0)";
		pill.style.opacity = "0";
		pill.getBoundingClientRect();
		pill.style.transition = FULL_TRANSITION;
		pill.style.opacity = "1";
	};

	// Wechsel zwischen Elementen: FLIP — Geometrie sofort setzen, inverse
	// Transform anlegen, dann zu Identität animieren (nur Compositor-Pfad).
	const slide = (el: HTMLElement) => {
		const pill = pillRef.current;
		if (!pill) return;
		currentRef.current = el;
		// Alte Geometrie aus Inline-Styles lesen (bereits platziert), dann neue
		// Geometrie ohne Übergang setzen.
		const previousBounds = readInlineBounds(pill);
		pill.style.transition = "none";
		place(el);
		const targetBounds = readInlineBounds(pill);
		// Inverse Transform: Pille visuell am alten Ort erscheinen lassen.
		pill.style.transform = computeFlipTransform(previousBounds, targetBounds);
		pill.getBoundingClientRect(); // Reflow erzwingen
		pill.style.transition = FULL_TRANSITION;
		pill.style.transform = "translate(0, 0)";
	};

	// Gedrücktes Element entspannen (Scale-Down zurücksetzen).
	const releasePressed = () => {
		if (pressedRef.current) {
			pressedRef.current.style.transform = "";
			pressedRef.current = null;
		}
	};

	// Verschwinden: an Ort und Stelle ausblenden (kein Richtungs-Slide). Genutzt
	// bei pointerout und vom MutationObserver, wenn das bedeckte Element unbedienbar
	// wird (CV-Item öffnet unter ruhendem Cursor, setzt data-pill-suppress) — dann
	// feuert kein Pointer-Event, also nur ausfaden + Active-Farbe/Scale zurücksetzen.
	const hide = () => {
		const pill = pillRef.current;
		if (!pill || !currentRef.current) return;
		pill.style.transition = FULL_TRANSITION;
		pill.style.transform = "translate(0, 0)";
		pill.style.opacity = "0";
		pill.style.background = PILL_BG;
		releasePressed();
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
			show(el);
		}
	};

	const handlePointerOut = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		if (!clickableIn(e.target)) return;
		// Wechsel auf anderes klickbares Element → gleitet (handlePointerOver),
		// kein Verstecken. Nur ausblenden, wenn Ziel kein Clickable ist.
		if (clickableIn(e.relatedTarget)) return;
		hide();
	};

	// Active-State liegt auf der Pille: Drücken färbt sie und skaliert leicht
	// ein (Emil-Prinzip: Buttons müssen auf Druck responsiv reagieren).
	const handlePointerDown = (e: React.PointerEvent) => {
		if (e.pointerType !== "mouse") return;
		const pill = pillRef.current;
		const el = clickableIn(e.target);
		if (!pill || !el) return;
		pill.style.background = PILL_BG_ACTIVE;
		pill.style.transform = "scale(0.97)";
		// Gedrücktes Element selbst mitskalieren (sitzt über der Pille).
		el.style.transition = "transform var(--duration-state) var(--easing-ui)";
		el.style.transform = "scale(0.97)";
		pressedRef.current = el;
	};

	const handlePointerUp = () => {
		releasePressed();
		const pill = pillRef.current;
		// Nur zurücksetzen, wenn die Pille überhaupt aktiv auf einem Element liegt.
		if (!pill || !currentRef.current) return;
		pill.style.background = PILL_BG;
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
			if (el && !clickableIn(el)) hide();
		});
		obs.observe(wrap, {
			subtree: true,
			attributes: true,
			attributeFilter: ["data-pill-suppress", "disabled", "aria-disabled"],
		});
		return () => obs.disconnect();
		// clickableIn/hide lesen nur Refs/DOM (kein reaktiver State) → stabil.
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			className={`${styles.wrapper} ${className ?? ""}`}>
			<span
				ref={pillRef}
				aria-hidden
				className={styles.pill}
				style={{
					background: PILL_BG,
					transition: FULL_TRANSITION,
				}}
			/>
			{children}
		</div>
	);
};

export default ActionWrapper;

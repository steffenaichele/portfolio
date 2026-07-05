"use client";

import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { prefersReduced } from "../hooks/usePrefersReducedMotion";
import { computeFlipTransform, readInlineBounds, type Bounds } from "../lib/motion";
import styles from "./ToggleButton.module.scss";

/**
 * ToggleButton — Segmented-Control mit einer einzigen, persistenten Pille, die
 * das aktive Segment hervorhebt und bei Wechsel dorthin gleitet (FLIP). Keine
 * Hover-/Press-Pille wie im ActionWrapper — der Toggle zeigt nur den Auswahl-
 * zustand. Genutzt im Header (Home/Work) und im Footer (Sprachumschalter).
 *
 * Segmente sind Links (href) oder Buttons (onClick). Sie tragen im Ruhezustand
 * keine eigene Rundung/Hintergrund — beides liegt auf der Pille.
 *
 * Props:
 *   options    (required)  — Segmente mit eindeutigem key
 *   activeKey  (required)  — key des aktiven Segments
 *   size       (optional)  — "md" (Nav) | "sm" (Sprache), default "md"
 */

interface ToggleOption {
	key: string;
	label: ReactNode;
	href?: string;
	onClick?: () => void;
	ariaLabel?: string;
}

interface ToggleButtonProps {
	options: ToggleOption[];
	activeKey: string;
	size?: "md" | "sm";
	className?: string;
	"aria-label"?: string;
}

// Pille gleitet nur (Compositor-Transform); Geometrie wird per FLIP gesetzt.
const TRANSITION = "transform var(--duration-move) var(--easing-ui)";

const sizeClasses: Record<"md" | "sm", string> = {
	md: styles.md,
	sm: styles.sm,
};

export default function ToggleButton({
	options,
	activeKey,
	size = "md",
	className,
	"aria-label": ariaLabel,
}: ToggleButtonProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);
	const activeIndex = options.findIndex((o) => o.key === activeKey);

	// Pille auf das aktive Segment legen. animate=true → FLIP-Gleiten von der
	// alten Position; sonst Snap (Erstplatzierung, Resize, reduced motion).
	useEffect(() => {
		const slide = (animate: boolean) => {
			const pill = pillRef.current;
			const wrap = wrapperRef.current;
			if (!pill || !wrap) return;
			const els = wrap.querySelectorAll<HTMLElement>("a, button");
			const el = els[activeIndex];
			if (!el) {
				pill.style.opacity = "0";
				return;
			}
			const w = wrap.getBoundingClientRect();
			const r = el.getBoundingClientRect();
			const previousBounds = readInlineBounds(pill);
			const targetBounds: Bounds = {
				left: r.left - w.left,
				top: r.top - w.top,
				width: r.width,
				height: r.height,
			};
			const shown = pill.style.opacity === "1";

			pill.style.transition = "none";
			pill.style.left = `${targetBounds.left}px`;
			pill.style.top = `${targetBounds.top}px`;
			pill.style.width = `${targetBounds.width}px`;
			pill.style.height = `${targetBounds.height}px`;
			pill.style.opacity = "1";

			if (!animate || !shown || !previousBounds.width || prefersReduced()) {
				pill.getBoundingClientRect();
				pill.style.transition = TRANSITION;
				return;
			}
			// Inverse Transform: Pille visuell am alten Ort erscheinen lassen, dann
			// zur Identität animieren (reiner Compositor-Pfad).
			pill.style.transform = computeFlipTransform(previousBounds, targetBounds);
			pill.getBoundingClientRect(); // Reflow erzwingen
			pill.style.transition = TRANSITION;
			pill.style.transform = "translate(0, 0)";
		};

		slide(true);

		// Segmentbreiten ändern sich am responsiven Typo-Breakpoint → neu setzen
		// (Snap). Erster (Initial-)Callback übersprungen, slide(true) hat platziert.
		const wrap = wrapperRef.current;
		if (!wrap) return;
		let first = true;
		const obs = new ResizeObserver(() => {
			if (first) {
				first = false;
				return;
			}
			slide(false);
		});
		obs.observe(wrap);
		return () => obs.disconnect();
	}, [activeIndex]);

	// Aktives Segment = text-primary, übrige tertiär (heben sich bei Hover).
	const segmentClass = (active: boolean) =>
		`${styles.segment} ${sizeClasses[size]} ${active ? styles.active : styles.inactive}`;

	return (
		<div
			ref={wrapperRef}
			aria-label={ariaLabel}
			className={`${styles.wrapper} ${className ?? ""}`}>
			<span
				ref={pillRef}
				aria-hidden
				className={styles.pill}
				style={{
					background: "var(--color-interactive-pill-selected)",
					transition: TRANSITION,
				}}
			/>
			{options.map((o) => {
				const active = o.key === activeKey;
				return o.href ? (
					<Link
						key={o.key}
						href={o.href}
						onClick={o.onClick}
						aria-label={o.ariaLabel}
						aria-current={active ? "page" : undefined}
						className={segmentClass(active)}>
						{o.label}
					</Link>
				) : (
					<button
						key={o.key}
						type="button"
						onClick={o.onClick}
						aria-label={o.ariaLabel}
						aria-pressed={active}
						className={segmentClass(active)}>
						{o.label}
					</button>
				);
			})}
		</div>
	);
}

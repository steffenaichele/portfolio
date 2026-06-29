"use client";

import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

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

export interface ToggleOption {
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
const TRANSITION = "transform 300ms var(--ease-out)";

let reducedMotionQuery: MediaQueryList | undefined;
const prefersReduced = () => {
	if (typeof window === "undefined") return false;
	reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
	return reducedMotionQuery.matches;
};

const sizeClasses: Record<"md" | "sm", string> = {
	md: "h-9 px-4 text-lg",
	sm: "h-7 px-2.5 text-sm",
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
			const newLeft = r.left - w.left;
			const newTop = r.top - w.top;
			const oldLeft = parseFloat(pill.style.left) || 0;
			const oldTop = parseFloat(pill.style.top) || 0;
			const oldWidth = parseFloat(pill.style.width) || 0;
			const oldHeight = parseFloat(pill.style.height) || 0;
			const shown = pill.style.opacity === "1";

			pill.style.transition = "none";
			pill.style.left = `${newLeft}px`;
			pill.style.top = `${newTop}px`;
			pill.style.width = `${r.width}px`;
			pill.style.height = `${r.height}px`;
			pill.style.opacity = "1";

			if (!animate || !shown || !oldWidth || prefersReduced()) {
				pill.getBoundingClientRect();
				pill.style.transition = TRANSITION;
				return;
			}
			// Inverse Transform: Pille visuell am alten Ort erscheinen lassen, dann
			// zur Identität animieren (reiner Compositor-Pfad).
			const tx = oldLeft + oldWidth / 2 - (newLeft + r.width / 2);
			const ty = oldTop + oldHeight / 2 - (newTop + r.height / 2);
			const sx = oldWidth / r.width;
			const sy = oldHeight / r.height;
			pill.style.transform = `translate(${tx}px, ${ty}px) scaleX(${sx}) scaleY(${sy})`;
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
		clsx(
			"relative inline-flex items-center justify-center font-medium select-none cursor-pointer transition-colors duration-150 [transition-timing-function:var(--ease-out)] focus-visible:outline-1 focus-visible:outline-orange-300",
			sizeClasses[size],
			active
				? "text-(--color-text-primary)"
				: "text-(--color-text-tertiary) hover:text-(--color-text-secondary)",
		);

	return (
		<div
			ref={wrapperRef}
			aria-label={ariaLabel}
			className={clsx("relative inline-flex flex-row", className)}>
			<span
				ref={pillRef}
				aria-hidden
				className="absolute left-0 top-0 size-0 opacity-0 pointer-events-none rounded-2xl"
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

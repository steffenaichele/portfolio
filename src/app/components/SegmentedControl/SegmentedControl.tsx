"use client";

import {
	AriaAttributes,
	Children,
	HTMLAttributes,
	isValidElement,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import {
	computeFlipTransform,
	prefersReducedMotion,
	readInlineBounds,
} from "../../lib/motion";
import styles from "./SegmentedControl.module.scss";

/**
 * SegmentedControl — Toggle-Gruppe mit Auswahl-Pille (CV-Tabs, LanguageToggle).
 *
 * Die Pille liegt unter dem aktiven Segment und bewegt sich AUSSCHLIESSLICH bei
 * Auswahlwechsel (Klick auf das inaktive Segment) per FLIP dorthin — kein
 * Cursor-Following. Hover/Active tragen die Segmente selbst als CSS-States.
 *
 * Vollständig controlled: der Consumer hält den Auswahl-State und markiert das
 * aktive Segment über `active`; die Pille folgt dem daraus abgeleiteten
 * activeIndex (useLayoutEffect). Erstplatzierung und Resize snappen ohne
 * Animation, prefers-reduced-motion snappt auch beim Wechsel.
 *
 * Nur ein Format: XS-Textsegmente (24px Höhe, 8px Padding, font-weight 600).
 * Kein size/content — SegmentedControl trägt ausschließlich Text-Segmente.
 *
 * Segment-Zustände: default (transparent) / hover / active (Press-Scale) trägt
 * jedes Segment selbst als CSS-State; selected (gewähltes Segment) zeigt die
 * gleitende Pille darunter. Alle vier Zustände lesen ihre Hintergrundfarbe aus
 * den --color-item-{variant}-* Tokens (styles/_tokens.scss).
 *
 * Props (zusätzlich zu div-Attributen wie role/aria-label):
 *   variant  (optional)  — "primary" (hoher Kontrast) | "secondary" | "ghost", default primary
 *
 * Segment-Props: active (required), onClick, role/aria-* durchgereicht;
 * Textfarbe aktiv/inaktiv setzt der Consumer über className (wie bisher).
 *
 * Example:
 *   <SegmentedControl role="tablist" variant="primary">
 *     <SegmentedControl.Segment role="tab" active={active === "a"} aria-selected={active === "a"} onClick={…}>
 *       <span>Tab A</span>
 *     </SegmentedControl.Segment>
 *     …
 *   </SegmentedControl>
 */

type Variant = "primary" | "secondary" | "ghost";

interface SegmentProps extends AriaAttributes {
	active: boolean;
	onClick?: () => void;
	children: ReactNode;
	className?: string;
	role?: string;
}

const Segment = ({
	active,
	onClick,
	children,
	className,
	role,
	...ariaProps
}: SegmentProps) => (
	<button
		type="button"
		onClick={onClick}
		role={role}
		{...ariaProps}
		data-segment-active={active ? "true" : undefined}
		className={`${styles.segment} ${className ?? ""}`}>
		{children}
	</button>
);

interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
	variant?: Variant;
	children: ReactNode;
}

const SegmentedControl = ({
	variant = "primary",
	children,
	className,
	...rest
}: SegmentedControlProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);
	// Nach der Erstplatzierung true — ab dann animieren Auswahlwechsel.
	const placedRef = useRef(false);

	// Auswahlwechsel aus den Children ableiten: der Platzierungs-Effekt läuft
	// nur, wenn ein ANDERES Segment aktiv wird (nicht bei jedem Re-Render).
	const activeIndex = Children.toArray(children).findIndex(
		(child) => isValidElement(child) && (child.props as SegmentProps).active,
	);

	// Pille deckungsgleich unter das aktive Segment legen. animate=true →
	// FLIP-Gleiten vom alten Ort (nur Compositor-Transform), sonst Snap.
	const place = (animate: boolean) => {
		const pill = pillRef.current;
		const wrap = wrapperRef.current;
		const target = wrap?.querySelector<HTMLElement>(
			'[data-segment-active="true"]',
		);
		if (!pill || !wrap || !target) return;
		const previousBounds = readInlineBounds(pill);
		const r = target.getBoundingClientRect();
		const w = wrap.getBoundingClientRect();
		pill.style.transition = "none";
		pill.style.left = `${r.left - w.left}px`;
		pill.style.top = `${r.top - w.top}px`;
		pill.style.width = `${r.width}px`;
		pill.style.height = `${r.height}px`;
		pill.style.opacity = "1";
		if (animate && previousBounds.width && !prefersReducedMotion()) {
			pill.style.transform = computeFlipTransform(
				previousBounds,
				readInlineBounds(pill),
			);
			pill.getBoundingClientRect(); // Reflow: Start-Transform committen
			pill.style.transition =
				"transform var(--duration-move) var(--easing-ui)";
		}
		pill.style.transform = "translate(0, 0)";
	};

	useLayoutEffect(() => {
		place(placedRef.current);
		placedRef.current = true;
		// place liest nur DOM/Refs; activeIndex ist der relevante Trigger.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex]);

	// Segmentbreiten ändern sich am responsiven Typo-Breakpoint → Pille neu
	// platzieren (Snap). Erster (Initial-)Callback übersprungen.
	useEffect(() => {
		const wrap = wrapperRef.current;
		if (!wrap) return;
		let first = true;
		const ro = new ResizeObserver(() => {
			if (first) {
				first = false;
				return;
			}
			place(false);
		});
		ro.observe(wrap);
		return () => ro.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={wrapperRef}
			{...rest}
			className={`${styles.wrapper} ${styles[variant]} ${className ?? ""}`}>
			<span ref={pillRef} aria-hidden className={styles.pill} />
			{children}
		</div>
	);
};

SegmentedControl.Segment = Segment;

export default SegmentedControl;

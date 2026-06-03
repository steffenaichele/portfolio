"use client";

import {
	Children,
	isValidElement,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

/* ============================================================================
 * CONFIG — alle Effekt-Parameter. Kommentar sagt was + in welche Richtung drehen.
 * ==========================================================================*/

// Akkumuliertes Eingabe-Delta (px) für Fortschritt 0 -> 1.
// GRÖSSER = Phase 1 langsamer / mehr scrollen nötig. KLEINER = schneller.
const SCROLL_DISTANCE = 900;

// Obergrenze pro Eingabe-Event (px). Normalisiert Trackpad-/Wheel-Sprünge.
// KLEINER = ruhiger, gleichmäßiger. GRÖSSER = reaktiver, aber sprunghafter.
const MAX_STEP = 90;

// Multiplikator für rohe Touch-Deltas, um Touch-Tempo an Wheel anzugleichen.
// 1.0 = neutral. <1 = Touch träger. >1 = Touch flinker.
const TOUCH_SENSITIVITY = 0.9;

// Abstand zwischen den Cards im AUFGEFÄCHERTEN Zustand (px).
// GRÖSSER = luftigere Liste. KLEINER = kompakter.
const GAP = 12;

// Wie weit hintere Cards im STACK unten als Streifen rausschauen (px).
// GRÖSSER = mehr "Notification-Stack"-Tiefe. KLEINER = enger gestapelt.
const STACK_PEEK = 14;

// Skalierungsabnahme pro Card nach hinten (z.B. 0.06 = 6% kleiner je Card).
// GRÖSSER = stärkere Verjüngung. 0 = alle gleich groß.
const STACK_SCALE = 0.05;

// Wie weit der gesamte Stack bei Fortschritt 0 unter dem Viewport sitzt (px).
// Muss > höchste Card sein, damit bei 0 nichts rausschaut.
// GRÖSSER = startet weiter unten / längerer Einfahrweg.
const SLIDE_DISTANCE = 700;

// Bodenabstand der vordersten Card im Endzustand (px).
const BOTTOM_GAP = 16;

// Fortschritt (0..1), ab dem das Auffächern (Phase 2) auslöst.
// HÖHER = Stack muss fast voll eingefahren sein. NIEDRIGER = fächert früher auf.
const FAN_THRESHOLD = 0.92;

// Dauer der Auffächer-/Einklapp-Transition (ms).
const FAN_DURATION = 620;

// CSS-Easing fürs Auffächern — federnd, iOS-artig (leichtes Überschwingen).
const FAN_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// Verzögerung zwischen den Cards beim Auffächern (ms) — Stagger.
// GRÖSSER = stärker gestaffelt. 0 = alle gleichzeitig.
const FAN_STAGGER = 55;

/* ==========================================================================*/

type Props = {
	children: ReactNode;
	/** Optionale max. Breite der Cards (Tailwind/CSS-Wert). */
	className?: string;
};

const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v));

const NotificationStackFooter = ({ children, className }: Props) => {
	// Jedes direkte Child wird zu einer Card. Erstes Child = oberste/vorderste.
	const items = Children.toArray(children).filter(isValidElement);
	const count = items.length;

	// --- State, der das Rendering treibt -------------------------------------
	const [progress, setProgress] = useState(0); // Phase-1-Fortschritt 0..1
	const [fanned, setFanned] = useState(false); // Phase 2 aktiv?
	const [animating, setAnimating] = useState(false); // CSS-Transition aktiv?
	const [heights, setHeights] = useState<number[]>([]); // gemessene Card-Höhen
	const [reduced, setReduced] = useState(false); // prefers-reduced-motion

	// --- Refs: Quelle der Wahrheit für die (passiven) Event-Handler ----------
	const progressRef = useRef(0);
	const fannedRef = useRef(false);
	const reducedRef = useRef(false);
	const lastTouchY = useRef(0);
	const hijackingRef = useRef(false); // wird gerade gescrubbed?
	const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	/* --- prefers-reduced-motion -------------------------------------------- */
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => {
			setReduced(mq.matches);
			reducedRef.current = mq.matches;
		};
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	/* --- Höhenmessung der gerenderten Cards (Mount + Resize) ---------------- */
	useEffect(() => {
		const measure = () => {
			setHeights(
				cardRefs.current.map((el) => (el ? el.offsetHeight : 0)),
			);
		};
		measure();
		const observer = new ResizeObserver(measure);
		cardRefs.current.forEach((el) => el && observer.observe(el));
		window.addEventListener("resize", measure);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [count]);

	/* --- Phase-1/2-Kernlogik: ein gemeinsamer Delta-Pfad -------------------- */
	useEffect(() => {
		if (reduced) return; // kein Hijacking bei reduced motion

		// overscroll-behavior sperren, solange wir hijacken (kein Pull-to-Refresh
		// / Rubber-Band auf Mobil). Wird bei Freigabe/Unmount zurückgesetzt.
		const lockOverscroll = (lock: boolean) => {
			document.body.style.overscrollBehavior = lock ? "none" : "";
		};

		const atPageBottom = () =>
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 1;

		// Setzt Fortschritt, erkennt Threshold-Übergänge -> startet Phase-2-Transition.
		const applyDelta = (delta: number) => {
			const prev = progressRef.current;
			const next = clamp(prev + delta / SCROLL_DISTANCE, 0, 1);
			if (next === prev) return;

			const wasFanned = prev >= FAN_THRESHOLD;
			const isFanned = next >= FAN_THRESHOLD;

			progressRef.current = next;
			setProgress(next);

			// Threshold gekreuzt (hoch ODER runter) -> EINMALIG Transition fahren.
			if (isFanned !== wasFanned) {
				fannedRef.current = isFanned;
				setFanned(isFanned);
				setAnimating(true);
				if (animTimer.current) clearTimeout(animTimer.current);
				animTimer.current = setTimeout(
					() => setAnimating(false),
					FAN_DURATION + FAN_STAGGER * count,
				);
			}
		};

		// Gemeinsame Engage-/Release-Logik für Wheel + Touch.
		// delta > 0 = Fortschritt erhöhen (Stack fährt rein).
		// Rückgabe true = Event wurde gehijacked (Aufrufer ruft preventDefault).
		const handleInput = (delta: number): boolean => {
			const engaged = hijackingRef.current;

			// Nicht aktiv & nicht am Seitenende & noch nichts eingefahren -> normal scrollen.
			if (!engaged && progressRef.current === 0 && !atPageBottom())
				return false;

			// An Untergrenze (0) und weiter nach unten -> Hijack beenden, normal scrollen.
			if (progressRef.current === 0 && delta < 0) {
				if (engaged) {
					hijackingRef.current = false;
					lockOverscroll(false);
				}
				return false;
			}

			// Engage starten (am Seitenende, erstes Delta nach oben).
			if (!engaged) {
				hijackingRef.current = true;
				lockOverscroll(true);
			}

			applyDelta(delta);
			return true;
		};

		const onWheel = (e: WheelEvent) => {
			const delta = clamp(e.deltaY, -MAX_STEP, MAX_STEP);
			if (handleInput(delta)) e.preventDefault();
		};

		const onTouchStart = (e: TouchEvent) => {
			lastTouchY.current = e.touches[0].clientY;
		};

		const onTouchMove = (e: TouchEvent) => {
			const y = e.touches[0].clientY;
			// Nach oben wischen (y sinkt) -> positives Delta, analog zu Wheel runter.
			const raw = (lastTouchY.current - y) * TOUCH_SENSITIVITY;
			lastTouchY.current = y;
			const delta = clamp(raw, -MAX_STEP, MAX_STEP);
			if (handleInput(delta)) e.preventDefault();
		};

		// passive:false, weil wir preventDefault aufrufen (Reacts on*-Props sind passiv).
		window.addEventListener("wheel", onWheel, { passive: false });
		window.addEventListener("touchstart", onTouchStart, { passive: false });
		window.addEventListener("touchmove", onTouchMove, { passive: false });

		return () => {
			window.removeEventListener("wheel", onWheel);
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchmove", onTouchMove);
			if (animTimer.current) clearTimeout(animTimer.current);
			lockOverscroll(false);
		};
	}, [reduced, count]);

	/* --- Transform-Berechnung pro Card ------------------------------------- */
	// Endzustand (Phase 2 / reduced): aufgefächerte Liste, am Boden verankert.
	// Card i wird um die Summe der Höhen + GAPs der darunterliegenden Cards
	// nach oben geschoben. Letztes Child sitzt unten.
	const finalTranslateY = (i: number) => {
		let offset = BOTTOM_GAP;
		for (let j = i + 1; j < count; j++) {
			offset += (heights[j] ?? 0) + GAP;
		}
		return -offset;
	};

	const cardStyle = (i: number): React.CSSProperties => {
		const zIndex = count - i; // erstes Child oben drauf
		const base: React.CSSProperties = {
			position: "fixed",
			left: 0,
			right: 0,
			bottom: 0,
			margin: "0 auto",
			transformOrigin: "center bottom",
			zIndex,
			willChange: "transform",
			touchAction: "none", // mobiles Overscroll fern halten
		};

		// Longhand statt `transition`-Shorthand: React warnt sonst beim Mischen
		// von Shorthand + transitionDelay.
		const transitionProps: React.CSSProperties = animating
			? {
					transitionProperty: "transform",
					transitionDuration: `${FAN_DURATION}ms`,
					transitionTimingFunction: FAN_EASING,
					transitionDelay: `${i * FAN_STAGGER}ms`,
			  }
			: {
					transitionProperty: "none",
					transitionDelay: "0ms",
			  };

		if (reduced || fanned) {
			// Aufgefächert / direkt final.
			return {
				...base,
				...transitionProps,
				transform: `translateY(${finalTranslateY(i)}px) scale(1)`,
				pointerEvents: "auto",
			};
		}

		// Phase 1: Stack scrubben (direkt, ohne Transition außer beim Einklappen).
		const slide = (1 - progress) * SLIDE_DISTANCE; // 0 -> ganz unten raus
		const ty = slide + BOTTOM_GAP + i * STACK_PEEK; // hintere Cards tiefer
		const scale = Math.max(0.5, 1 - i * STACK_SCALE);
		// Beim Einklappen (animating) federnd zurück, sonst direktes Scrubben.
		return {
			...base,
			...transitionProps,
			transform: `translateY(${ty}px) scale(${scale})`,
			pointerEvents: progress > 0 ? "auto" : "none",
		};
	};

	return (
		<>
			{items.map((child, i) => (
				<div
					key={(isValidElement(child) && child.key) || i}
					ref={(el) => {
						cardRefs.current[i] = el;
					}}
					style={cardStyle(i)}
					className={
						"w-full max-w-[640px] px-2 " + (className ?? "")
					}>
					{child}
				</div>
			))}
		</>
	);
};

export default NotificationStackFooter;

"use client";

import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// Tab-State + orchestrierte, UNTERBRECHBARE Transition auf EINER Seite (kein Routing).
// Sequenz beim View-Wechsel:
//   exit  -> aktuelle main-Items staffeln raus
//   hold  -> Panel getauscht aber versteckt, body max-width animiert (2s)
//   enter -> neue main-Items staffeln rein
// Klick auf den anderen Tab mitten in der Animation bricht ab und startet die
// Sequenz zum neuen Ziel neu (Ziel in targetRef, Timer lesen immer den Live-Wert).
// Phasen liegen auf body[data-phase] (Stagger), aktive View auf body[data-view]
// (treibt die max-width-Transition der Card, gestylt in layout.tsx).

type View = "home" | "work";
type Phase = "idle" | "exit" | "hold" | "enter";

// Synchron mit --pt-dur / --pt-stagger in globals.css.
const DUR = 150;
const STAGGER = 75;
const STAGGER_SELECTOR = "main [data-stagger-group] > *";

const itemCount = () =>
	typeof document === "undefined"
		? 0
		: document.querySelectorAll(STAGGER_SELECTOR).length;

const sequenceMs = (count: number) =>
	DUR + STAGGER * Math.max(0, count - 1) + 20;

// MediaQueryList einmal cachen (wie ToggleButton), nicht pro Klick neu erzeugen.
let reducedMotionQuery: MediaQueryList | undefined;
const prefersReduced = () => {
	if (typeof window === "undefined") return false;
	reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
	return reducedMotionQuery.matches;
};

const setPhaseAttr = (p: Phase) => {
	if (p === "idle") delete document.body.dataset.phase;
	else document.body.dataset.phase = p;
};

type Ctx = { view: View; requestView: (v: View) => void };

const ViewContext = createContext<Ctx>({ view: "home", requestView: () => {} });

export const useView = () => useContext(ViewContext);

export default function ViewProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const [view, setView] = useState<View>("home");
	const [phase, setPhase] = useState<Phase>("idle");
	// Live-Ziel + ob beim nächsten Swap die Breite wechselt (für hold).
	const targetRef = useRef<View>("home");
	const widthChangesRef = useRef(false);

	// body[data-view] spiegelt die aktive View -> treibt die max-width-Transition.
	useEffect(() => {
		document.body.dataset.view = view;
	}, [view]);

	const requestView = (target: View) => {
		// Schon dort bzw. läuft bereits dorthin (Invariante: idle => targetRef === view).
		if (target === targetRef.current) return;
		// Nicht auf der Hauptseite (z.B. /imprint): zurück nach "/" und direkt setzen.
		if (pathname !== "/") {
			targetRef.current = target;
			setView(target);
			router.push("/");
			return;
		}
		if (prefersReduced()) {
			targetRef.current = target;
			setView(target);
			return;
		}
		// Sequenz (neu) starten: aktuelles Panel raus.
		targetRef.current = target;
		setPhaseAttr("exit");
		setPhase("exit");
	};

	// exit -> Items raus, danach Panel auf Live-Ziel tauschen (versteckt) = hold.
	useEffect(() => {
		if (phase !== "exit") return;
		const id = setTimeout(() => {
			const next = targetRef.current;
			widthChangesRef.current = next !== view;
			setView(next);
			setPhaseAttr("hold");
			setPhase("hold");
		}, sequenceMs(itemCount()));
		return () => clearTimeout(id);
	}, [phase, view]);

	// hold -> auf Ende der max-width-Transition warten, dann enter.
	// Keine Breitenänderung (reverser Interrupt) -> direkt enter, kein Stall.
	useEffect(() => {
		if (phase !== "hold") return;
		if (!widthChangesRef.current) {
			setPhaseAttr("enter");
			setPhase("enter");
			return;
		}
		const body = document.body;
		let done = false;
		const go = () => {
			done = true;
			setPhaseAttr("enter");
			setPhase("enter");
		};
		const onEnd = (e: TransitionEvent) => {
			if (e.target === body && e.propertyName === "max-width") go();
		};
		body.addEventListener("transitionend", onEnd);
		const fallback = setTimeout(() => {
			if (!done) go();
		}, 2400);
		return () => {
			body.removeEventListener("transitionend", onEnd);
			clearTimeout(fallback);
		};
	}, [phase]);

	// enter -> Items rein. Hat sich das Ziel inzwischen geändert -> neu exiten.
	useEffect(() => {
		if (phase !== "enter") return;
		const id = setTimeout(() => {
			if (targetRef.current !== view) {
				setPhaseAttr("exit");
				setPhase("exit");
			} else {
				setPhaseAttr("idle");
				setPhase("idle");
			}
		}, sequenceMs(itemCount()));
		return () => clearTimeout(id);
	}, [phase, view]);

	return (
		<ViewContext.Provider value={{ view, requestView }}>
			{children}
		</ViewContext.Provider>
	);
}

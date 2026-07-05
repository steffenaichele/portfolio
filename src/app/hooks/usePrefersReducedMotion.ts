// Nicht-reaktive Abfrage von prefers-reduced-motion für imperative FLIP-
// Animationen (ActionWrapper, ToggleButton). MediaQueryList wird lazy einmal
// angelegt (Browser-only) statt pro Pointer-Event — das Objekt hält .matches
// selbst aktuell.
let reducedMotionQuery: MediaQueryList | undefined;

export function prefersReduced(): boolean {
	if (typeof window === "undefined") return false;
	reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
	return reducedMotionQuery.matches;
}

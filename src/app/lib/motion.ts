// Geteilte Motion-Primitive für JS-getriebene Animationen. CSS liest Dauern/
// Easing aus den Tokens in styles/_tokens.scss; die wenigen JS-Pfade, die ohne
// CSS auskommen müssen (motion/react-Bezier, FLIP-Mathe), teilen sich hier eine
// einzige Quelle statt jeweils eigene Kopien.

// Spiegelt --easing-ui aus _tokens.scss als numerisches Bezier-Array — motion/
// react akzeptiert keine CSS-cubic-bezier()-Strings, braucht die vier Zahlen.
// Diese eine bewusste Duplizierung hält CVItem visuell in Linie mit dem Rest.
export const EASING_UI: [number, number, number, number] = [0.23, 1, 0.32, 1];

// Geometrie eines Elements (relativ zum Wrapper), wie sie die Pillen-FLIPs in
// Inline-Styles ablegen.
export type Bounds = { left: number; top: number; width: number; height: number };

// Inline-Styles (left/top/width/height) eines Elements als Bounds lesen. Fehlt
// ein Wert (noch nie platziert), wird 0 angenommen.
export function readInlineBounds(element: HTMLElement): Bounds {
	return {
		left: parseFloat(element.style.left) || 0,
		top: parseFloat(element.style.top) || 0,
		width: parseFloat(element.style.width) || 0,
		height: parseFloat(element.style.height) || 0,
	};
}

// Inverse FLIP-Transform: lässt ein bereits an targetBounds platziertes Element
// visuell noch an previousBounds erscheinen. Anschließend auf Identität animieren
// ergibt das Gleiten (center-basiert, reiner Compositor-Pfad).
export function computeFlipTransform(
	previousBounds: Bounds,
	targetBounds: Bounds,
): string {
	const deltaX =
		previousBounds.left +
		previousBounds.width / 2 -
		(targetBounds.left + targetBounds.width / 2);
	const deltaY =
		previousBounds.top +
		previousBounds.height / 2 -
		(targetBounds.top + targetBounds.height / 2);
	const scaleX = targetBounds.width
		? previousBounds.width / targetBounds.width
		: 1;
	const scaleY = targetBounds.height
		? previousBounds.height / targetBounds.height
		: 1;
	return `translate(${deltaX}px, ${deltaY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
}

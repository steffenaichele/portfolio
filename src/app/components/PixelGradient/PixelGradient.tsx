"use client";

import { useEffect, useRef } from "react";

import styles from "./PixelGradient.module.scss";

// Auflösung des Rasters. Das Canvas ist wirklich nur COLS × ROWS Pixel groß —
// CSS zieht es auf volle Breite, `image-rendering: pixelated` schaltet dabei
// auf Nearest-Neighbour. Genau daher kommt der Blockeffekt.
const COLS = 18;
const ROWS = 10;

// Ab welcher Zeile (relativ) der Verlauf in den Hintergrund kippt.
const FADE_START = 0.3;

// Stärke des Zellversatzes, relativ zur Verlaufsachse.
const JITTER = 0.4;

type RGB = [number, number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Deterministischer Pseudo-Zufall pro Zelle (klassischer sin-fract-Hash).
function hash(x: number, y: number) {
	const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
	return n - Math.floor(n);
}

function readColor(root: CSSStyleDeclaration, name: string): RGB {
	const hex = root.getPropertyValue(name).trim().replace("#", "");
	const full = hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex;
	const int = parseInt(full, 16);
	return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function mix(a: RGB, b: RGB, t: number): RGB {
	return [
		a[0] + (b[0] - a[0]) * t,
		a[1] + (b[1] - a[1]) * t,
		a[2] + (b[2] - a[2]) * t,
	];
}

export default function PixelGradient() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const root = getComputedStyle(document.documentElement);
		const topLeft = readColor(root, "--color-gradient-blue");
		const topRight = readColor(root, "--color-gradient-peach");
		const bottomLeft = readColor(root, "--color-gradient-purple");
		const bottomRight = readColor(root, "--color-gradient-pink");
		const bg = readColor(root, "--color-bg");

		for (let y = 0; y < ROWS; y++) {
			for (let x = 0; x < COLS; x++) {
				// Deterministischer Versatz — sonst wirkt das Raster wie ein
				// hochskalierter Verlauf statt wie gesetzte Pixel. Kein
				// Math.random(), das würde bei jedem Mount anders aussehen.
				// u und v bekommen getrennte Seeds, sonst legt sich der Versatz
				// diagonal an und man sieht ein Karomuster.
				const u = clamp01(x / (COLS - 1) + (hash(x, y) - 0.5) * JITTER);
				const v = clamp01(y / (ROWS - 1) + (hash(x + 37, y + 91) - 0.5) * JITTER);

				// Bilinear zwischen den vier Eckfarben.
				const color = mix(
					mix(topLeft, topRight, u),
					mix(bottomLeft, bottomRight, u),
					v,
				);

				// Übergang in den Hintergrund: deckendes Grau als Zielfarbe,
				// damit der Fade im selben Pixelraster liegt wie die Farbe.
				const fade = clamp01(
					(y / (ROWS - 1) - FADE_START) / (1 - FADE_START),
				);
				const [r, g, b] = mix(color, bg, fade * fade);

				ctx.fillStyle = `rgb(${r} ${g} ${b})`;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}, []);

	return (
		<canvas
			ref={ref}
			width={COLS}
			height={ROWS}
			aria-hidden="true"
			className={styles.canvas}
		/>
	);
}

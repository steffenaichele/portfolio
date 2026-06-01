"use client";

/**
 * Maus-Trail aus blockigen Pixeln.
 *
 * Technik: Kleines internes Canvas (1/scale der Viewport-Größe), per CSS auf
 * Vollbild gestreckt mit `image-rendering: pixelated` → scharfe Pixel ohne
 * Weichzeichnung.
 *
 * Pro Frame: (1) Alpha aller Pixel linear zeitbasiert reduzieren (jedes Pixel
 * erreicht nach lifetimeMs Deckkraft 0), (2) nur bei echter Mausbewegung neue
 * Pixel in Vollpixel setzen (Bresenham zwischen alter/neuer Position).
 */

import { useEffect, useRef, useSyncExternalStore } from "react";

interface PixelTrailProps {
	/** CSS-Pixel pro internem Canvas-Pixel (8 = Canvas ist 1/8 der Viewport-Größe). */
	scale?: number;
	/** Zeit in ms, bis ein gesetzter Pixel linear von voller auf keine Deckkraft verblasst. */
	lifetimeMs?: number;
	/** 1 = 1×1 Pixel, 2 = 3×3, usw. */
	brush?: number;
	color?: string;
	zIndex?: number;
}

type PointerState = { x: number; y: number; prevX: number; prevY: number };

/** Canvas kann keine CSS-Variablen — Wert von :root auslesen. */
function resolveColor(value: string): string {
	const match = value.match(/var\(\s*(--[^,)]+)/);
	if (!match) return value;
	return (
		getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim() ||
		value
	);
}

/** Kein Trail auf Touch-Geräten (hover: none). */
function subscribeHoverCapable(onChange: () => void) {
	const mq = window.matchMedia("(hover: none)");
	mq.addEventListener("change", onChange);
	return () => mq.removeEventListener("change", onChange);
}

const getHoverCapable = () => !window.matchMedia("(hover: none)").matches;
const getHoverCapableServer = () => false;

/** Lückenlose Linie zwischen zwei Rasterpunkten (schnelle Mausbewegung). */
function drawBresenhamLine(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	plot: (x: number, y: number) => void,
) {
	let x = x0;
	let y = y0;
	const dx = Math.abs(x1 - x0);
	const dy = Math.abs(y1 - y0);
	const sx = x0 < x1 ? 1 : -1;
	const sy = y0 < y1 ? 1 : -1;
	let err = dx - dy;

	for (;;) {
		plot(x, y);
		if (x === x1 && y === y1) break;
		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x += sx;
		}
		if (e2 < dx) {
			err += dx;
			y += sy;
		}
	}
}

export default function PixelTrail({
	scale = 8,
	lifetimeMs = 2000,
	brush = 1,
	color = "var(--color-primary)",
	zIndex = 0,
}: PixelTrailProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pointerRef = useRef<PointerState>({ x: -1, y: -1, prevX: -1, prevY: -1 });
	const rafRef = useRef(0);
	const colorRef = useRef(color);

	const isPointerDevice = useSyncExternalStore(
		subscribeHoverCapable,
		getHoverCapable,
		getHoverCapableServer,
	);

	useEffect(() => {
		colorRef.current = color;
		if (!isPointerDevice) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let lastFrameTime = performance.now();

		const resizeCanvas = () => {
			canvas.width = Math.ceil(window.innerWidth / scale);
			canvas.height = Math.ceil(window.innerHeight / scale);
			pointerRef.current = { x: -1, y: -1, prevX: -1, prevY: -1 };
			lastFrameTime = performance.now();
		};

		resizeCanvas();

		/** Linear: Alpha pro Pixel um (255 × Δt / lifetimeMs) senken — framerate-unabhängig. */
		const fadePixelsLinear = (now: number) => {
			const deltaMs = now - lastFrameTime;
			lastFrameTime = now;
			if (deltaMs <= 0) return;

			const fadeStep = (255 * deltaMs) / lifetimeMs;
			if (fadeStep <= 0) return;

			const { width, height } = canvas;
			const imageData = ctx.getImageData(0, 0, width, height);
			const data = imageData.data;

			for (let i = 3; i < data.length; i += 4) {
				const alpha = data[i];
				if (alpha === 0) continue;

				const nextAlpha = alpha - fadeStep;
				if (nextAlpha <= 0) {
					data[i - 3] = 0;
					data[i - 2] = 0;
					data[i - 1] = 0;
					data[i] = 0;
				} else {
					data[i] = nextAlpha;
				}
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const plotBrush = (px: number, py: number) => {
			if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) return;

			ctx.globalCompositeOperation = "source-over";
			ctx.fillStyle = resolveColor(colorRef.current);

			const radius = Math.max(0, brush - 1);
			for (let dy = -radius; dy <= radius; dy++) {
				for (let dx = -radius; dx <= radius; dx++) {
					const x = px + dx;
					const y = py + dy;
					if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height) {
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}
		};

		const draw = (now: number) => {
			fadePixelsLinear(now);

			const { x, y, prevX, prevY } = pointerRef.current;
			const moved = x >= 0 && (x !== prevX || y !== prevY);

			if (moved) {
				if (prevX >= 0) {
					drawBresenhamLine(prevX, prevY, x, y, plotBrush);
				} else {
					plotBrush(x, y);
				}
				pointerRef.current.prevX = x;
				pointerRef.current.prevY = y;
			}

			rafRef.current = requestAnimationFrame(draw);
		};

		const onPointerMove = (event: PointerEvent) => {
			pointerRef.current.x = Math.floor(event.clientX / scale);
			pointerRef.current.y = Math.floor(event.clientY / scale);
		};

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("resize", resizeCanvas);
		rafRef.current = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [isPointerDevice, scale, lifetimeMs, brush, color]);

	if (!isPointerDevice) return null;

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 h-screen w-screen"
			style={{ imageRendering: "pixelated", zIndex }}
			aria-hidden="true"
		/>
	);
}

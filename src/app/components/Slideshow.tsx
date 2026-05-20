"use client";

import { useEffect, useReducer, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

interface Slide {
	src: string;
	alt: string;
}

interface SlideshowProps {
	slides: Slide[];
	interval?: number;
	ariaLabel?: string;
}

type State = { current: number; visible: boolean };
type Action = { type: "fade_out" } | { type: "advance"; total: number };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "fade_out": return { ...state, visible: false };
		case "advance": return { current: (state.current + 1) % action.total, visible: true };
	}
}

const Slideshow = ({ slides, interval = 8000, ariaLabel = "Slideshow" }: SlideshowProps) => {
	const [{ current, visible }, dispatch] = useReducer(reducer, { current: 0, visible: true });
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		let isVisible = true;

		const observer = new IntersectionObserver(
			([entry]) => { isVisible = entry.isIntersecting; },
			{ threshold: 0.1 }
		);

		if (containerRef.current) observer.observe(containerRef.current);

		const timer = setInterval(() => {
			if (!isVisible) return;
			dispatch({ type: "fade_out" });
			setTimeout(() => {
				dispatch({ type: "advance", total: slides.length });
			}, 300);
		}, interval);

		return () => {
			clearInterval(timer);
			observer.disconnect();
		};
	}, [slides.length, interval]);

	return (
		<div
			ref={containerRef}
			role="region"
			aria-label={ariaLabel}
			className="relative w-full aspect-square overflow-hidden bg-(--color-surface-bg) border-surface-stroke rounded-(--radius-surface) corner-squircle border shadow-[var(--shadow-soft)]">
			<span className="sr-only" aria-live="polite" aria-atomic="true">
				{slides[current].alt}
			</span>
			<Image
				src={slides[current].src}
				alt={slides[current].alt}
				width={800}
				height={800}
				className={clsx(
					"w-full h-full object-cover transition-opacity duration-300",
					visible ? "opacity-100" : "opacity-0"
				)}
			/>
		</div>
	);
};

export default Slideshow;

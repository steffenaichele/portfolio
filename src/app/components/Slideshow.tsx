"use client";

import { useEffect, useState } from "react";

interface Slide {
	src: string;
	alt: string;
}

interface SlideshowProps {
	slides: Slide[];
	interval?: number;
}

const Slideshow = ({ slides, interval = 8000 }: SlideshowProps) => {
	const [current, setCurrent] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		// Respect prefers-reduced-motion
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			// Still auto-advance but without fade transition
			const timer = setInterval(() => {
				setCurrent((i) => (i + 1) % slides.length);
			}, interval);
			return () => clearInterval(timer);
		}

		// Normal animation with fade
		const timer = setInterval(() => {
			setVisible(false);
			setTimeout(() => {
				setCurrent((i) => (i + 1) % slides.length);
				setVisible(true);
			}, 300);
		}, interval);

		return () => clearInterval(timer);
	}, [slides.length, interval]);

	return (
		<div className="relative w-full aspect-square overflow-hidden bg-(--color-surface-bg) border-surface-stroke rounded-(--radius-surface) corner-squircle border shadow-(--shadow-soft)">
			<img
				src={slides[current].src}
				alt={slides[current].alt}
				width={800}
				height={800}
				className={`w-full h-full object-cover transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
			/>
		</div>
	);
};

export default Slideshow;

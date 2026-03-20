"use client";

import { useEffect, useState } from "react";
interface SlideshowProps {
	slides: string[];
	interval?: number;
}

const Slideshow = ({ slides, interval = 8000 }: SlideshowProps) => {
	const [current, setCurrent] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
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
		<div className="relative w-full aspect-square overflow-hidden bg-neutral-100 rounded-2xl corner-squircle border border-neutral-300">
			<img
				src={slides[current]}
				alt=""
				className={`w-full h-full object-cover transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
			/>
		</div>
	);
};

export default Slideshow;

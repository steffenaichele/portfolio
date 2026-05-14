"use client";

import { useEffect, useRef } from "react";

const BGGrid = () => {
	const padding = useRef(0);

	useEffect(() => {
		const readPadding = () => {
			const value = getComputedStyle(document.documentElement)
				.getPropertyValue("--padding")
				.trim();
			padding.current = parseInt(value);
		};

		readPadding();
		window.addEventListener("resize", readPadding);
		return () => window.removeEventListener("resize", readPadding);
	}, []);

	return <div></div>;
};

export default BGGrid;

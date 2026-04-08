"use client";

import { useEffect, useState } from "react";

const BGGrid = () => {
	const [padding, setPadding] = useState(0);

	useEffect(() => {
		const readPadding = () => {
			const value = getComputedStyle(document.documentElement)
				.getPropertyValue("--padding")
				.trim();
			setPadding(parseInt(value));
		};

		readPadding();
		window.addEventListener("resize", readPadding);
		return () => window.removeEventListener("resize", readPadding);
	}, []);

	console.log("Padding:", padding);

	return <div></div>;
};

export default BGGrid;

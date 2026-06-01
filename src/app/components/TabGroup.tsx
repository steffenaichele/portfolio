"use client";

import { motion } from "motion/react";

import { useState } from "react";
import clsx from "clsx";
import Tab from "./Tab";

interface TabItem {
	label: string;
	content: React.ReactNode;
}

interface TabGroupProps {
	tabs: TabItem[];
	className?: string;
}

export default function TabGroup({ tabs, className }: TabGroupProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className={clsx("flex flex-col gap-10", className)}>
			<div role="tablist" className="flex flex-row -gap-2 px-1">
				{tabs.map((tab, i) => (
					<Tab
						key={tab.label}
						isActive={activeIndex === i}
						onClick={() => setActiveIndex(i)}>
						{tab.label}
					</Tab>
				))}
			</div>
			<div className="bg-red-500" role="tabpanel">{tabs[activeIndex].content} </div>
		</div>
	);
}

"use client";

import { useState } from "react";
import Tab from "./Tab";

interface TabItem {
	label: string;
	content: React.ReactNode;
}

interface TabGroupProps {
	tabs: TabItem[];
}

export default function TabGroup({ tabs }: TabGroupProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="flex flex-col gap-4">
			<div role="tablist" className="flex flex-row -gap-2">
				{tabs.map((tab, i) => (
					<Tab
						key={tab.label}
						isActive={activeIndex === i}
						onClick={() => setActiveIndex(i)}>
						{tab.label}
					</Tab>
				))}
			</div>
			<div role="tabpanel">{tabs[activeIndex].content}</div>
		</div>
	);
}

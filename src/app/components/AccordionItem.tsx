"use client";

import { ReactNode } from "react";
import styles from "./AccordionItem.module.scss";

/**

 *
 * Wichtig: Das Item wird direkt vom Inhalts-Renderer (CVItem) als dessen
 * Wrapper gerendert — nicht umgekehrt. So bleibt der Inhalt (inkl. motion)
 * im direkt gemappten CVItem und animiert zuverlässig.

 */

interface AccordionItemProps {
	isOpen: boolean;
	children: ReactNode;
}

export default function AccordionItem({ isOpen, children }: AccordionItemProps) {
	return (
		<li
			className={`${styles.item}`}
			data-open={isOpen || undefined}>
			{children}
		</li>
	);
}

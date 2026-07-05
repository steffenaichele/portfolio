"use client";

import { ReactNode } from "react";
import styles from "./AccordionItem.module.scss";

/**
 * AccordionItem — leere, wiederverwendbare Karten-Shell. Rendert nur das <li>
 * mit der Karten-Optik; sämtlicher Inhalt und dessen Animation kommen als
 * `children` (z.B. aus CVItem). Der Open-State kommt als `isOpen`-Prop und
 * steuert `data-open` für die Optik.
 *
 * Optik (Hintergrund, Block-Rundung, Gap, Hover) kommt komplett aus
 * `AccordionItem.module.scss`. Die Block-Rundung (nur Außenkanten + Kanten zu
 * offenen Nachbarn) löst dort ein `:has()`-Selektor — daher braucht das Item
 * keine Nachbar-/Positions-Props.
 *
 * Wichtig: Das Item wird direkt vom Inhalts-Renderer (CVItem) als dessen
 * Wrapper gerendert — nicht umgekehrt. So bleibt der Inhalt (inkl. motion)
 * im direkt gemappten CVItem und animiert zuverlässig.
 *
 * Die Klasse `group` bleibt (Tailwind-Marker, kein eigener Stil): CVItem.tsx
 * nutzt `group-hover:` auf diesem Vorfahren, solange CVItem noch nicht auf
 * SCSS migriert ist.
 */

interface AccordionItemProps {
	isOpen: boolean;
	children: ReactNode;
}

export default function AccordionItem({ isOpen, children }: AccordionItemProps) {
	return (
		<li
			className={`${styles.item} group`}
			data-open={isOpen || undefined}>
			{children}
		</li>
	);
}

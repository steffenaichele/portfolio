"use client";

import { ReactNode } from "react";

/**
 * AccordionItem — leere, wiederverwendbare Karten-Shell. Rendert nur das <li>
 * mit der Karten-Optik; sämtlicher Inhalt und dessen Animation kommen als
 * `children` (z.B. aus CVItem). Der Open-State kommt als `isOpen`-Prop und
 * steuert `data-open` für die Optik.
 *
 * Optik (Hintergrund, Block-Rundung, Gap, Hover) kommt komplett aus der CSS-
 * Klasse `.accordion-item` in globals.css. Die Block-Rundung (nur Außenkanten +
 * Kanten zu offenen Nachbarn) löst dort ein `:has()`-Selektor — daher braucht
 * das Item keine Nachbar-/Positions-Props.
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
			className="accordion-item group shadow-[var(--shadow)]"
			data-open={isOpen || undefined}>
			{children}
		</li>
	);
}

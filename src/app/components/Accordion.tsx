"use client";

import { createContext, ReactNode, useContext, useState } from "react";

/**
 * Accordion — hält den Open-State aller Items (Multi-open: jedes Item toggelt
 * unabhängig) und stellt ihn per Context an die AccordionItems bereit.
 * Rendert die Item-Liste als <ul>.
 *
 * Beispiel:
 *   <Accordion>
 *     <AccordionItem id="a" summary={…}>…</AccordionItem>
 *     <AccordionItem id="b" summary={…}>…</AccordionItem>
 *   </Accordion>
 */

interface AccordionContextValue {
	openIds: Set<string>;
	toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordion(): AccordionContextValue {
	const ctx = useContext(AccordionContext);
	if (!ctx)
		throw new Error("AccordionItem must be used within an <Accordion>");
	return ctx;
}

interface AccordionProps {
	children: ReactNode;
	className?: string;
}

export default function Accordion({ children, className }: AccordionProps) {
	const [openIds, setOpenIds] = useState<Set<string>>(new Set());

	const toggle = (id: string) =>
		setOpenIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});

	return (
		<AccordionContext.Provider value={{ openIds, toggle }}>
			<ul className={`flex flex-col ${className ?? ""}`}>{children}</ul>
		</AccordionContext.Provider>
	);
}

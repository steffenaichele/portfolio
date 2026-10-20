// Case Studies der Arbeiten. Eine Datei pro Case Study, hier nur der Typ.
// Englisch inline, weil der Launch EN-only ist.
export type CaseStudy = {
	id: string;
	title: string;
	timeframe?: string;

	// Felder der Homepage-Karte (CaseStudyFolder). Alles außer headline ist
	// optional: fehlt der Detail-Inhalt, bleibt die Karte eine reine Slab.
	/** Editoriale Zeile — bewusst NICHT der Projekttitel. */
	headline: string;
	subline?: string;
	tags?: string[];
	/** Ein bis zwei Sätze zu Rolle und Ergebnis. */
	context?: string;
	/** Interne Route — nur gesetzt, wenn die Case Study auch existiert. */
	caseHref?: string;
	/** Produktshots; src liegt unter public/case-studies/<id>/. */
	shots?: { src: string; alt: string }[];
};

// Case Studies der Arbeiten. Noch reine Stubs: Struktur steht, Inhalte
// (body, role, timeframe) werden beim Content-Neuaufbau gefüllt — TODO unten.
// Englisch inline, weil der Launch EN-only ist.
export type CaseStudy = {
	id: string;
	title: string;
	role: string;
	body: string;
	link?: string;
	timeframe?: string;

	// Felder der Homepage-Karte (CaseStudySection). Alles außer headline ist
	// optional: fehlt der Detail-Inhalt, bleibt die Karte eine reine Slab und
	// wird gar nicht erst aufklappbar.
	/** Editoriale Zeile — bewusst NICHT der Projekttitel. */
	headline: string;
	subline?: string;
	tags?: string[];
	/** Ein bis zwei Sätze zu Rolle und Ergebnis, sichtbar im offenen Zustand. */
	context?: string;
	/** Interne Route — nur gesetzt, wenn die Case Study auch existiert. */
	caseHref?: string;
	/** Beschriftungen der Produktshots; noch ohne Assets → Platzhalterkacheln. */
	shots?: string[];
};

export const caseStudies: CaseStudy[] = [
	{
		id: "nextmuseum",
		title: "Nextmuseum.io",
		role: "", // TODO
		body: "", // TODO
		link: "https://nextmuseum.io/",
		// Tags und Zeitraum stehen so auch in data/caseStudies/nextmuseum.ts
		// (intro.tags / intro.duration) — das ist die Quelle, wenn sich etwas
		// ändert. Bewusst dupliziert statt importiert: diese Datei landet über
		// CaseStudySection im Client-Bundle, die Case-Study-Inhalte sollen nicht
		// mit.
		timeframe: "2023 – 2024",
		headline: "Strengthen a community by giving it more control",
		subline:
			"Redesign of the art curation platform nextmuseum.io for Future Forms",
		tags: ["Shipped Product", "UX", "UI", "Design System"],
		context:
			"Sole designer. Rebuilt the information architecture around the life cycle of an open call and shipped a design system still in use today.",
		caseHref: "/case-studies/nextmuseum",
		shots: ["curation vote", "open call dashboard", "submission card"],
	},
	{
		id: "museum-exhibit",
		title: "Museum Exhibit",
		role: "UX/UI Designer & Fullstack Developer",
		body: "", // TODO
		headline: "Museum Exhibit", // TODO: editoriale Headline
		// TODO: subline, tags, context, shots — Karte bleibt bis dahin zu.
	},
	{
		id: "habit-app",
		title: "Habit App",
		role: "", // TODO
		body: "", // TODO
		headline: "Habit App", // TODO: editoriale Headline
		// TODO: subline, tags, context, shots — Karte bleibt bis dahin zu.
	},
];

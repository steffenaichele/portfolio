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
};

export const caseStudies: CaseStudy[] = [
	{
		id: "nextmuseum",
		title: "Nextmuseum.io",
		role: "", // TODO
		body: "", // TODO
		link: "https://nextmuseum.io/",
	},
	{
		id: "museum-exhibit",
		title: "Museum Exhibit",
		role: "UX/UI Designer & Fullstack Developer",
		body: "", // TODO
	},
	{
		id: "habit-app",
		title: "Habit App",
		role: "", // TODO
		body: "", // TODO
	},
];

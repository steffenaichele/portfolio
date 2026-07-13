// Projekte sind die Kontext-Quelle für Impressions. Eine Impression-ID kodiert
// ihr Projekt: "1_1" → Projekt "1". Eine Impression zieht sich Titel, Laufzeit
// und Link vom zugehörigen Projekt.
//
// Übersetzbare Texte (title, timeframe) liegen als einzige Quelle in
// messages/{de,en}.json unter projects.items[id]. Hier nur Sprachneutrales.
export type Project = {
	id: string;
	link?: string;
};

export const projects: Project[] = [
	{ id: "1", link: "https://nextmuseum.io/" },
	{ id: "2" },
];

// Projekt-ID aus einer Impression-ID ableiten ("1_1" → "1").
export const projectIdOf = (impressionId: string): string =>
	impressionId.split("_")[0];

export const getProject = (id: string): Project | undefined =>
	projects.find((p) => p.id === id);

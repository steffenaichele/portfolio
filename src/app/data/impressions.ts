// Impressions der Work-Seite. Bild, Beschriftung und Projekt-Kontext liegen
// zusammen in einem typisierten Eintrag — vorher verteilt auf messages
// (label/alt, projects.items) und data/projects.ts (link).
//
// aspect beschreibt das Format der Karte; das Layout selbst kommt weiterhin
// aus der jeweiligen Komposition in work/items/*.
export type Impression = {
	id: string;
	label: string;
	alt: string;
	src: string;
	aspect: "wide" | "square";
	projectTitle: string;
	projectTimeframe?: string;
	projectLink?: string;
};

export const impressions: Impression[] = [
	{
		id: "1_1",
		label: "Open Call",
		alt: "Open Call page on nextmuseum.io",
		src: "/impressions/nextmuseum_opencall.png",
		aspect: "wide",
		projectTitle: "Future Forms",
		projectLink: "https://nextmuseum.io/",
	},
	{
		id: "2_1",
		label: "Festival Onboarding",
		alt: "Dashboard",
		src: "/impressions/upnext_dashboard.png",
		aspect: "square",
		projectTitle: "HfG Schwäbisch Gmünd",
	},
];

export const getImpression = (id: string): Impression => {
	const impression = impressions.find((entry) => entry.id === id);
	if (!impression) throw new Error(`Unbekannte Impression: ${id}`);
	return impression;
};

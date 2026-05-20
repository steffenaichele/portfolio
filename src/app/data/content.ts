export type Project = {
	public: boolean;
	slug: string;
	title: string;
	description: string;
	coverImage: string;
	year: number;
};

export type Impression = {
	id: string;
	src: string;
	alt: string;
	square: boolean;
	label: string;
	context: string;
	link?: string;
	projectSlug?: string;
};

export const projects: Project[] = [
	{
		public: true,
		slug: "inkcal",
		title: "Tattoo Artist Calender",
		description:
			"React Webapp zur Verwaltung von Terminen, Kunden und Designs für Tattoo Artists.",
		coverImage: "/images/museum-exhibit.jpg",
		year: 2026,
	},
	{
		public: true,
		slug: "museum-exhibit",
		title: "Interaktives Museum Exhibit",
		description:
			"React/Electron App als Ersatz für eine Legacy Flash-Anwendung.",
		coverImage: "/images/museum-exhibit.jpg",
		year: 2025,
	},
	{
		public: true,
		slug: "gewohnheiten",
		title: "Digitale Gewohnheitsentwicklungshilfe",
		description:
			"React/Electron App als Ersatz für eine Legacy Flash-Anwendung.",
		coverImage: "/images/museum-exhibit.jpg",
		year: 2024,
	},
];

export const impressions: Impression[] = [
	{
		id: "01",
		src: "nextmuseum_opencall.png",
		alt: "Open Call Seite von nextmuseum.io",
		square: false,
		label: "Open Call",
		context: "Future Forms",
		link: "https://nextmuseum.io/",
	},
	{
		id: "02",
		src: "upnext_dashbaord.png",
		alt: "Dashboard",
		square: true,
		label: "Festival Onbaording",
		context: "HfG Schwäbisch Gmünd",
	},
	{
		id: "03",
		src: "placeholder-3.jpg",
		alt: "Dashboard",
		square: true,
		label: "Dashboard",
		context: "Freelance",
	},
	{
		id: "04",
		src: "placeholder-4.jpg",
		alt: "Branding",
		square: true,
		label: "Branding",
		context: "HfG Schwäbisch Gmünd",
	},
	{
		id: "05",
		src: "placeholder-5.jpg",
		alt: "Landingpage",
		square: false,
		label: "Landingpage",
		context: "Freelance",
	},
];

export function getPublicProjects(): Project[] {
	return projects.filter((p) => p.public);
}

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getImpressionsByProject(slug: string): Impression[] {
	return impressions.filter((i) => i.projectSlug === slug);
}

export function getProjectForImpression(impression: Impression): Project | undefined {
	if (!impression.projectSlug) return undefined;
	return projects.find((p) => p.slug === impression.projectSlug);
}

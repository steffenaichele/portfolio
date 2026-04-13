export type Project = {
	public: boolean;
	slug: string;
	title: string;
	description: string;
	coverImage: string;
	year: number;
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
	}
];

export function getPublicProjects(): Project[] {
	return projects.filter((p) => p.public);
}

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
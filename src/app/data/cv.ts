export type CVRole = {
	title: string;
	startMonth: string;
	startYear: number;
	endMonth: string;
	endYear: number;
};

export type CVEntry = {
	organization: string;
	organizationShort: string;
	location: string;
	roles: CVRole[];
	description?: string[];
	descriptionShort?: string;
};

export const skills = ['Design Thinking','Wireframing','Prototyping','Visual Design','Design Token', 'SCSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Express.js', 'MongoDB','Prompt Engineering'];

// Utility function to get the overall year range for a CV entry, based on its roles
export function getYearRange(entry: CVEntry) {
  const startYears = entry.roles.map((r) => r.startYear);
  const endYears = entry.roles.map((r) => r.endYear);
  return {
    startYear: Math.min(...startYears),
    endYear: Math.max(...endYears),
  };
}

export const experience: CVEntry[] = [
	{
		organization: "MuSeele e.V. / Klinikum Christophsbad",
		organizationShort: "Freelance",
		location: "Göppingen",
		roles: [
			{
				title: "Freelance Developer",
				startMonth: "Mar",
				startYear: 2025,
				endMonth: "Dez",
				endYear: 2025,
			},
		],
		description: [
			"Eigenständige Neukonzeption und Entwicklung eines interaktiven Museumsexponats als Ablösung einer veralteten Adobe Flash Anwendung, um die Besucherinteraktion zu verbessern und die Wartbarkeit zu erhöhen.",
			"Gestaltung und Umsetzung einer interaktiven Zeitreise durch die Geschichte der Psychologie, dargestellt über Beamer und bedienbar per Maus für Museumsbesucher",
			"Entwicklung einer separaten Admin-Anwendung zur Verwaltung der Exponat-Inhalte (Erstellen, Bearbeiten, Löschen)",
			"Technische Umsetzung als Offline-fähige Desktop-App mit React, Tailwind CSS und Electron, lauffähig unter Windows direkt vom USB-Stick",
			"Vollständige Verantwortung über den gesamten Produktentwicklungsprozess: von Konzeption und UX/UI Design bis zur technischen Umsetzung",
		],
		descriptionShort:
			"Entwicklung eines interaktiven Museumsexponats mit React, Tailwind CSS und Electron. Gestaltung des gesamten Produktentwicklungsprozesses von UX/UI-Design bis zur technischen Implementierung.",
	},
	{
		organization: "Future Forms GmbH",
		organizationShort: "Future Forms",
		location: "Stuttgart",
		roles: [
			{
				title: "Werkstudent Design & Engineering",
				startMonth: "Sep",
				startYear: 2023,
				endMonth: "Jun",
				endYear: 2024,
			},
			{
				title: "Senior Intern Design & Engineering",
				startMonth: "Apr",
				startYear: 2023,
				endMonth: "Sep",
				endYear: 2023,
			},
			{
				title: "Intern Design & Engineering",
				startMonth: "Mar",
				startYear: 2023,
				endMonth: "Apr",
				endYear: 2023,
			},
		],
		description: [
			"Entwicklung digitaler Produkte und Erlebnisse mit Fokus auf User Interfaces.",
			"Eigenständige Organisation und Durchführung eines Kundenprojekts. Dazu gehörten das Erarbeiten, die Führung und die Auswertung von Workshops, Research, Wireframing, Testing, Erstellen eines neuen Design Systems und das Präsentieren der Arbeitsergebnisse vor den Kunden.",
			"Entwicklung einer separaten Admin-Anwendung zur Verwaltung der Exponat-Inhalte (Erstellen, Bearbeiten, Löschen)",
			"Erstellen einer eigenen UI-Library für die Erstellung von Wireframes in Figma, um die Effizienz bei der Erstellung von Prototypen zu steigern und die Konsistenz im Design zu gewährleisten",
			"Brand-Development, Testen von neuen Technologien und Tools und Prozess-Optimierung",
		],
		descriptionShort:
			"Entwicklung digitaler Produkte und Benutzeroberflächen. Projektleitung bei Kundenaufträgen – von Research über Wireframing bis Testing und Design-System-Erstellung.",
	},
	{
		organization: "halbautomaten Kommunikationsdesign GmbH",
		organizationShort: "halbautomaten",
		location: "Stuttgart",
		roles: [
			{
				title: "Kommunikationsdesigner",
				startMonth: "Mar",
				startYear: 2022,
				endMonth: "Feb",
				endYear: 2023,
			},
		],
		description: [
			"Mitarbeit bei diversen Projekten von verschiedenen Kunden, hauptsächlich im Bereich Corporate Design, Webdesign und Printmedien.",
			"Erstellung von Vorlagen für digitale Varianten von Printmedien, wie beispielsweise Produktkataloge, um für eine effizientere und konsistentere Erstellung von Marketingmaterialien zu sorgen.",
			"Design und Entwicklung der neuen Website der Agentur in SquareSpace, um die Online-Präsenz der Agentur zu verbessern.",
		],
		descriptionShort:
			"Mitarbeit bei Projekten im Bereich Corporate Design, Webdesign und Printmedien. Entwicklung von Vorlagen für digitale Varianten von Printmedien und der neuen Website der Agentur.",
	},
	{
		organization: "amplify design GmbH",
		organizationShort: "amplify design",
		location: "Stuttgart",
		roles: [
			{
				title: "Werkstudent Digital Design",
				startMonth: "Jul",
				startYear: 2021,
				endMonth: "Sep",
				endYear: 2021,
			},
			{
				title: "Digital Designer",
				startMonth: "Jan",
				startYear: 2020,
				endMonth: "Mar",
				endYear: 2021,
			},
			{
				title: "Ausbildung zum Mediengestalter Digital & Print (Visualisierung & Konzeption)",
				startMonth: "Okt",
				startYear: 2018,
				endMonth: "Jan",
				endYear: 2020,
			},
		],
		description: [
			"Überarbeitung von User Flows, Erstellung von Wireframes und Visual Design Vorschlägen für das Redesign einer Software für Schichtdickenmessung und Materialanalyse",
			"Mitarbeit bei der Entwicklung eines Design Systems sowie die Erstellung eines interaktiven Style Guides und einer UI Library",
			"Erstellung und Optimierung von 3D Modellen in Cinema 4D für die Nutzung in diversen Kundenprojekten",
			"Betreuung von Praktikant*innen und Werkstudent*innen",
		],
		descriptionShort:
			"Überarbeitung von User Flows, Erstellung von Wireframes und Visual Design Vorschlägen für das Redesign einer Software. Mitarbeit bei der Entwicklung eines Design Systems sowie die Erstellung eines interaktiven Style Guides und einer UI Library. Erstellung und Optimierung von 3D-Modellen in Cinema 4D für Kundenprojekte. Mentoring von Praktikanten.",
	},
	{
		organization: "Paperdice Solutions GmbH",
		organizationShort: "Paperdice Solutions",
		location: "Stuttgart",
		roles: [
			{
				title: "Ausbildung zum Mediengestalter Digital & Print (Gestaltung und Technik)",
				startMonth: "Aug",
				startYear: 2017,
				endMonth: "Sep",
				endYear: 2018,
			},
		],
		description: [
			"Entwurf, Vereinheitlichung und Überarbeitung diverser Printprodukte für mehrere Marken und Standorte.",
			"Mitentwicklung der Markenidentität sowie Entwicklung eines ausführlichen Style Guides",
			"Erstellung von Requisiten und Kulissen für Escape Rooms und deren Spielstätten.",
		],
		descriptionShort:
			"Entwurf, Vereinheitlichung und Überarbeitung diverser Printprodukte für mehrere Marken und Standorte. Mitentwicklung der Markenidentität sowie Entwicklung eines ausführlichen Style Guides. Erstellung von Requisiten und Kulissen für Escape Rooms und deren Spielstätten.",
	},
];

export const education: CVEntry[] = [
	{
		organization: "WBS Coding School",
		organizationShort: "WBS Coding School",
		location: "Berlin",
		roles: [
			{
				title: "Web & App Development Bootcamp",
				startMonth: "Sep",
				startYear: 2025,
				endMonth: "Jan",
				endYear: 2026,
			},
		],
		description: [
			"Full-Stack-Webentwicklung mit JavaScript, TypeScript, React, Node.js, Express.js und MongoDB.",
			"Entwicklung moderner, komponentenbasierter UIs mit React, inklusive State Management, Routing und Deployment.",
			"Backend-Entwicklung mit Node.js und Express.js, inklusive RESTful API-Design, Validierung(Zod), Middleware und Datenbankintegration mit MongoDB.",
			"Integration von generativer KI in Webanwendungen: Prompt Engineering, LLM-APIs und KI-gestützte Features.",
			"Agile Entwicklungsmethoden, Teamarbeit und Projektmanagement in der Softwareentwicklung.",
			"Abschlussprojekt: Full-Stack-Planungstool für Tattoo-Artists, eigenständig konzipiert und entwickelt mit React, TypeScript, Express.js und MongoDB (Kalender, Arbeitszeitenverwaltung, Dashboard mit Metriken).",
		],
	},
	{
		organization: "Hochschule für Gestaltung",
		organizationShort: "HfG Schwäbisch Gmünd",
		location: "Schwäbisch Gmünd",
		roles: [
			{
				title: "Interaktionsgestaltung Bachelor of Arts",
				startMonth: "Mar",
				startYear: 2021,
				endMonth: "Jul",
				endYear: 2024,
			},
		],
		description: [
			"Nutzerzentrierte Konzeption und Gestaltung digitaler Produkte von der Recherche über Prototyping bis zum finalen UI Design.",
			"Projektbasiertes Arbeiten in interdisziplinären Teams mit methodischem, research-basiertem Designprozess.",
			"Schwerpunkte in Application Design und Interface Design: Konzeption, Usability und Visual Design von Software und Hardware-Produkten.",
			"Grundlagen in Programmierung und digitaler Technik als Brücke zwischen Design und Entwicklung.",
		],
	},
	{
		organization: "Johannes-Gutenberg-Schule",
		organizationShort: "Johannes-Gutenberg-Schule",
		location: "Stuttgart",
		roles: [
			{
				title: "Mediengestalter Digital & Print",
				startMonth: "Aug",
				startYear: 2017,
				endMonth: "Jan",
				endYear: 2020,
			},
		],
	},
	{
		organization: "Gewerbliche Schule Schwäbisch Gmünd",
		organizationShort: "Gewerbliche Schule GD",
		location: "Schwäbisch Gmünd",
		roles: [
			{
				title: "Allgemeine Hochschulreife (Gestaltungs- und Medientechnik)",
				startMonth: "Sep",
				startYear: 2012,
				endMonth: "Jul",
				endYear: 2016,
			},
		],
	},
];
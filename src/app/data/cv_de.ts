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

export const skills = [
	// Frontend
	'JavaScript',
	'TypeScript',
	'React',
	'Next.js',
	'Tailwind CSS',
	'SCSS',
	'Design Token',
	// Backend
	'Node.js',
	'Express.js',
	'MongoDB',
	'REST APIs',
	'JWT',
	// Design
	'Figma',
	'Design Systems',
	'UI Libraries',
	'Wireframing',
	'Prototyping',
	'Visual Design',
	'Usability Testing',
	// Tooling
	'Electron',
	'Git',
	'CI/CD',
	'Vercel',
	// AI
	'Prompt Engineering',
];

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
				title: "Freelance Design Engineer",
				startMonth: "Mar",
				startYear: 2025,
				endMonth: "Dez",
				endYear: 2025,
			},
		],
		description: [
			"Solo-Projekt: Eigenständige Ablösung eines veralteten Adobe Flash Museumsexponats durch eine moderne, wartbare Desktop-Anwendung — vollständige Verantwortung von Konzeption bis Deployment.",
			"Konzeption und Umsetzung einer interaktiven Zeitreise durch die Geschichte der Psychologie — Beamer-Präsentation im Museum, bedienbar per Maus durch Besucher.",
			"Entwicklung einer separaten Admin-Anwendung zur Inhaltsverwaltung mit CRUD-Operationen (Erstellen, Bearbeiten, Löschen von Exponat-Inhalten).",
			"Umsetzung als offline-fähige Desktop-App mit React, TypeScript, Tailwind CSS und Electron — läuft direkt vom USB-Stick unter Windows ohne Internetverbindung.",
			"Vollständige Verantwortung für UX Research, UI Design, Frontend-Entwicklung, Datenpersistenz und Auslieferung an den Kunden.",
		],
		descriptionShort:
			"Solo-Projekt: Ablösung eines Adobe-Flash-Exponats durch eine offline-fähige Electron-Desktop-App mit React, TypeScript und Tailwind CSS. End-to-End-Verantwortung von UX/UI-Konzept bis Deployment.",
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
				title: "Senior Interaction Design Intern",
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
			"Digitales Produkt- und Interaction-Design-Studio mit Fokus auf herausragende User Interfaces.",
			"Eigenständige Leitung eines Kundenprojekts über mehrere Monate im Team von 2–3 Personen: Workshop-Planung und -Moderation, User Research, Wireframing, Usability Testing, Aufbau eines Design Systems und Kundenpräsentationen.",
			"Aufbau einer internen Wireframe UI-Library in Figma mit 20–40 wiederverwendbaren Komponenten — team-weit zur Beschleunigung des Wireframing-Prozesses eingesetzt.",
			"Brand Development, Prozessoptimierung und Evaluation neuer Tools und Technologien.",
			"Aktive Zusammenarbeit mit Designern und Entwicklern in einem interdisziplinären Umfeld.",
		],
		descriptionShort:
			"Eigenständige Leitung von Kundenprojekten von Research und Wireframing über Usability Testing bis zum Aufbau eines Design Systems. Entwicklung einer internen Figma-UI-Library mit 20–40 wiederverwendbaren Komponenten.",
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
			"Mitarbeit an diversen Kundenprojekten über Print und Digital hinweg, hauptsächlich Corporate Design, Webdesign und Printmedien.",
			"Design und Entwicklung der neuen Agenturwebsite (Konzept, UI Design, Umsetzung in SquareSpace) zur Verbesserung der Online-Präsenz.",
			"Erstellung von Templates für digitale Varianten von Printmedien wie Produktkataloge — für effizientere und konsistentere Marketingmaterialien.",
		],
		descriptionShort:
			"Mitarbeit an Kundenprojekten in Corporate Design, Webdesign und Printmedien. Design und Umsetzung der neuen Agenturwebsite sowie Templates für digitale Varianten von Printmedien.",
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
			"Redesign einer B2B-Software für Schichtdickenmessung und Materialanalyse: User Flow Analyse, Wireframes und Visual Design Vorschläge.",
			"Mitarbeit am Aufbau eines Design Systems inklusive interaktivem Style Guide und UI Library.",
			"3D-Modellierung in Cinema 4D für diverse Kundenprojekte.",
			"Betreuung und Mentoring von Praktikant:innen und Werkstudent:innen.",
		],
		descriptionShort:
			"Redesign einer B2B-Software (User Flows, Wireframes, Visual Design). Mitarbeit am Aufbau eines Design Systems mit interaktivem Style Guide und UI Library. 3D-Modellierung in Cinema 4D und Mentoring von Praktikant:innen.",
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
			"Mitentwicklung einer Markenidentität sowie Erstellung eines ausführlichen Style Guides.",
			"Erstellung von Requisiten und Kulissen für Escape Rooms und deren Spielstätten.",
		],
		descriptionShort:
			"Entwurf und Überarbeitung von Printprodukten für mehrere Marken und Standorte. Mitentwicklung einer Markenidentität und Erstellung eines ausführlichen Style Guides.",
	},
];

export const education: CVEntry[] = [
	{
		organization: "WBS Coding School",
		organizationShort: "WBS Coding School",
		location: "Berlin",
		roles: [
			{
				title: "Full-Stack Web & App Development Bootcamp",
				startMonth: "Sep",
				startYear: 2025,
				endMonth: "Jan",
				endYear: 2026,
			},
		],
		description: [
			"Full-Stack-Webentwicklung mit JavaScript, TypeScript, React, Node.js, Express.js und MongoDB (637 Stunden in Vollzeit).",
			"Frontend: Komponentenbasierte UIs mit React, State Management, Routing und Deployment.",
			"Backend: REST APIs, Authentifizierung, Schema-Validierung mit Zod, Middleware und Datenbankintegration mit MongoDB/Mongoose.",
			"Integration generativer KI in Webanwendungen: Prompt Engineering, LLM-APIs und KI-gestützte Features.",
			"Unit Testing, Git/GitHub, agile Methoden und Teamarbeit in der Softwareentwicklung.",
			"Abschlussprojekt INKCAL: Full-Stack-Planungstool für Tattoo-Artists, eigenständig konzipiert und entwickelt — React 19, TypeScript, 17 REST-Endpunkte mit Express.js, MongoDB, JWT-Authentifizierung. Deployed auf Vercel und Railway mit CI/CD via GitHub Actions.",
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
			"Bachelor of Arts in Interaktionsgestaltung mit Gesamtnote 1,7 (gut) und 210 ECTS-Credits.",
			"Schwerpunkte: Application Design, Interface Design, User Experience Design, Usability, Visual Design und Prototyping.",
			"Nutzerzentrierte Konzeption und Gestaltung digitaler Produkte — von Research und Prototyping bis zum finalen UI Design.",
			"Projektbasiertes Arbeiten in interdisziplinären Teams mit methodischem, research-basiertem Designprozess.",
			"Grundlagen in Programmierung und digitaler Technik als Brücke zwischen Design und Entwicklung.",
			'Bachelorthesis: „Digitale Unterstützung zur Förderung positiver Verhaltensmuster".',
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

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
	'Design Tokens',
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
				endMonth: "Dec",
				endYear: 2025,
			},
		],
		description: [
			"Solo project: Independently replaced an outdated Adobe Flash museum exhibit with a modern, maintainable desktop application — full ownership from concept to deployment.",
			"Designed and built an interactive journey through the history of psychology — projected onto a beamer in the museum and operable via mouse for visitors.",
			"Developed a separate admin application for content management with full CRUD operations (creating, editing, deleting exhibit content).",
			"Implemented as an offline-capable desktop app using React, TypeScript, Tailwind CSS and Electron — runs directly from a USB stick on Windows without an internet connection.",
			"Full responsibility for UX research, UI design, frontend development, data persistence and final delivery to the client.",
		],
		descriptionShort:
			"Solo project: Replaced a legacy Adobe Flash exhibit with an offline-capable Electron desktop app built in React, TypeScript and Tailwind CSS. End-to-end ownership from UX/UI concept to deployment.",
	},
	{
		organization: "Future Forms GmbH",
		organizationShort: "Future Forms",
		location: "Stuttgart",
		roles: [
			{
				title: "Working Student — Design & Engineering",
				startMonth: "Sep",
				startYear: 2023,
				endMonth: "Jun",
				endYear: 2024,
			},
			{
				title: "Senior Intern — Design & Engineering",
				startMonth: "Apr",
				startYear: 2023,
				endMonth: "Sep",
				endYear: 2023,
			},
			{
				title: "Intern — Design & Engineering",
				startMonth: "Mar",
				startYear: 2023,
				endMonth: "Apr",
				endYear: 2023,
			},
		],
		description: [
			"Digital product and interaction design studio focused on outstanding user interfaces.",
			"Independently led a client project over several months in a team of 2–3: workshop planning and facilitation, user research, wireframing, usability testing, building a design system and presenting results to the client.",
			"Built an internal wireframe UI library in Figma with 20–40 reusable components — used team-wide to accelerate the wireframing process.",
			"Brand development, process optimization and evaluation of new tools and technologies.",
			"Active collaboration with designers and engineers in an interdisciplinary environment.",
		],
		descriptionShort:
			"Independently led client projects from research and wireframing through usability testing to building a design system. Created an internal Figma UI library with 20–40 reusable components.",
	},
	{
		organization: "halbautomaten Kommunikationsdesign GmbH",
		organizationShort: "halbautomaten",
		location: "Stuttgart",
		roles: [
			{
				title: "Communication Designer",
				startMonth: "Mar",
				startYear: 2022,
				endMonth: "Feb",
				endYear: 2023,
			},
		],
		description: [
			"Contributed to a range of client projects across print and digital, primarily corporate design, web design and print media.",
			"Designed and built the agency's new website (concept, UI design, implementation in SquareSpace) to strengthen its online presence.",
			"Created templates for digital versions of print media such as product catalogues — enabling more efficient and consistent marketing materials.",
		],
		descriptionShort:
			"Contributed to client projects in corporate design, web design and print media. Designed and built the agency's new website and templates for digital versions of print media.",
	},
	{
		organization: "amplify design GmbH",
		organizationShort: "amplify design",
		location: "Stuttgart",
		roles: [
			{
				title: "Working Student — Digital Design",
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
				title: "Apprenticeship — Media Designer Digital & Print (Visualization & Concept)",
				startMonth: "Oct",
				startYear: 2018,
				endMonth: "Jan",
				endYear: 2020,
			},
		],
		description: [
			"Redesign of a B2B software for coating thickness measurement and material analysis: user flow analysis, wireframes and visual design proposals.",
			"Contributed to building a design system, including an interactive style guide and UI library.",
			"3D modelling in Cinema 4D for various client projects.",
			"Mentored interns and working students.",
		],
		descriptionShort:
			"Redesign of a B2B software (user flows, wireframes, visual design). Contributed to a design system with interactive style guide and UI library. 3D modelling in Cinema 4D and mentoring of interns.",
	},
	{
		organization: "Paperdice Solutions GmbH",
		organizationShort: "Paperdice Solutions",
		location: "Stuttgart",
		roles: [
			{
				title: "Apprenticeship — Media Designer Digital & Print (Design and Technology)",
				startMonth: "Aug",
				startYear: 2017,
				endMonth: "Sep",
				endYear: 2018,
			},
		],
		description: [
			"Designed, unified and refined a range of print products for several brands and locations.",
			"Co-developed a brand identity and produced a comprehensive style guide.",
			"Created props and sets for escape rooms and their venues.",
		],
		descriptionShort:
			"Designed and refined print products for several brands and locations. Co-developed a brand identity and produced a comprehensive style guide.",
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
			"Full-stack web development with JavaScript, TypeScript, React, Node.js, Express.js and MongoDB (637 hours, full-time).",
			"Frontend: component-based UIs with React, state management, routing and deployment.",
			"Backend: REST APIs, authentication, schema validation with Zod, middleware and database integration with MongoDB/Mongoose.",
			"Integration of generative AI into web applications: prompt engineering, LLM APIs and AI-driven features.",
			"Unit testing, Git/GitHub, agile methods and teamwork in software development.",
			"Final project INKCAL: full-stack planning tool for tattoo artists, independently designed and built — React 19, TypeScript, 17 REST endpoints with Express.js, MongoDB and JWT authentication. Deployed on Vercel and Railway with CI/CD via GitHub Actions.",
		],
	},
	{
		organization: "Hochschule für Gestaltung",
		organizationShort: "HfG Schwäbisch Gmünd",
		location: "Schwäbisch Gmünd",
		roles: [
			{
				title: "Bachelor of Arts in Interaction Design",
				startMonth: "Mar",
				startYear: 2021,
				endMonth: "Jul",
				endYear: 2024,
			},
		],
		description: [
			"Bachelor of Arts in Interaction Design — final grade 1.7 on the German scale (1.0 best / 4.0 pass), equivalent to UK First or US GPA ~3.7. 210 ECTS credits.",
			"Focus areas: application design, interface design, user experience design, usability, visual design and prototyping.",
			"User-centred concept and design of digital products — from research and prototyping to final UI design.",
			"Project-based work in interdisciplinary teams using a methodical, research-driven design process.",
			"Foundations in programming and digital technology as a bridge between design and engineering.",
			"Bachelor thesis: \"Digital support for fostering positive behavioural patterns\".",
		],
	},
	{
		organization: "Johannes-Gutenberg-Schule",
		organizationShort: "Johannes-Gutenberg-Schule",
		location: "Stuttgart",
		roles: [
			{
				title: "Vocational School — Media Designer Digital & Print",
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
				title: "Abitur (German university entrance qualification) — Design and Media Technology",
				startMonth: "Sep",
				startYear: 2012,
				endMonth: "Jul",
				endYear: 2016,
			},
		],
	},
];

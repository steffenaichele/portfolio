// Inhalte der Case Study "Nextmuseum.io Redesign". Wortlaut 1:1 aus
// case-study-nextmuseum-redesign.md — hier wird nichts umformuliert.
//
// Alles ist reiner Text: kein JSX in der Datenschicht. Die Markdown-Muster
// "**Label:** Text" landen deshalb als { label, text }, das Markup entsteht
// erst in den Section-Komponenten.
//
// Hinweis: src/app/data/caseStudies.ts hält weiterhin die Stubs aller drei
// Arbeiten. Sobald Case Study 2 und 3 Inhalte bekommen, sollten beide Dateien
// zusammengeführt werden — bis dahin bleibt caseStudies.ts unangetastet.

export type LabeledItem = {
	label: string;
	text: string;
};

export type DisclosureBlock = {
	summary: string;
	body: string;
};

export type FigureSlot = {
	caption: string;
	/** CSS aspect-ratio, z. B. "16 / 9". */
	ratio: string;
	/** Rasterbreite: "full" = alle 8 Spuren, "half" = 4 Spuren (Paare). */
	span: "full" | "half";
	/** Noch kein Asset vorhanden → CaseFigure rendert einen Platzhalter. */
	src?: string;
	alt?: string;
};

export type Decision = {
	id: "structure" | "roles" | "empty" | "conversation";
	eyebrow: string;
	title: string;
	/** Blockquote im Markdown = Thesenzeile, KEIN Fremdzitat. */
	thesis: string;
	paragraphs: string[];
	figures: FigureSlot[];
};

export type CaseSection = {
	id: string;
	navLabel: string;
	heading: string;
};

// Einzige Quelle für Navigationsbeschriftung UND <h2>-Text: so können die
// beiden nicht auseinanderlaufen.
export const sections: CaseSection[] = [
	{ id: "intro", navLabel: "Intro", heading: "Nextmuseum.io Redesign" },
	{ id: "project", navLabel: "Project", heading: "Project" },
	{ id: "decisions", navLabel: "Decisions", heading: "Key Design Decisions" },
	{ id: "outcome", navLabel: "Outcome", heading: "Outcome" },
];

export const intro = {
	// Der Titel steht in sections[0].heading — hier nicht doppeln.
	tags: ["Shipped Product", "UX", "UI", "Design System"],
	durationLabel: "duration",
	duration: "2023 – 2024",
	overview: {
		label: "overview",
		before:
			"One person proposes a topic for an exhibition, artists submit their work for it, and the community decides together what ends up being shown.",
		disclosure: {
			summary: "The formal description",
			body: "nextmuseum.io is a community platform for swarm curation and co-creation of collaborative exhibition projects.",
		} satisfies DisclosureBlock,
		after:
			"Anyone can launch such an open call on the platform, and the entire community can join the discussion, contribute knowledge and influence the outcome.",
	},
	role: {
		label: "role",
		text: "As the sole designer for this project, I owned the design work end to end: the analysis of comparable platforms, the gathering and processing of user stories, planning the information architecture, creating wireframes and prototypes, reworking the existing visual design and developing a design system.",
	},
	context: {
		label: "context",
		paragraphs: [
			"I joined Future Forms as an intern shortly before the project started. The redesign was my main focus for 4 days per week during my full-time internship.",
			"I presented my work at bi-weekly check-ins to the project managers of the platform, and at milestone meetings to the wider team including the external backend developers. Toward the end I also took on parts of project planning. From October 2023 I continued as a part-time working student, supporting the in-house frontend team through implementation alongside other projects.",
		],
	},
	cover: {
		caption:
			"The open call overview at full width with real calls in all three states (active, in selection, closed) visible at once, so the state model reads immediately.",
		ratio: "16 / 9",
		span: "full",
	} satisfies FigureSlot,
};

export const project = {
	intro:
		"nextmuseum.io launched in July 2020. Three years of use exposed the limits of the original build, and the relaunch was set up to resolve them and strengthen what the platform already did well.",
	goalsLabel: "goals",
	goals: [
		{
			label: "Making the platform easier to use",
			text: "Revise the platform's structure to make it more accessible to all users",
		},
		{
			label: "Look mum, no hands!",
			text: "Reduce the manual work involved in the day-to-day running of the platform by the responsible staff",
		},
		{
			label: "Power to the user",
			text: "Put greater focus on the platform's members to encourage exploration and communication",
		},
		{
			label: "Let's talk about it",
			text: "Bring conversations back from the official Telegram group to nextmuseum.io and create new ways to interact",
		},
	] satisfies LabeledItem[],
	constraintsLabel: "constraints",
	constraints:
		"The look and feel of nextmuseum.io had to be preserved. The brand color palette was fixed, so every structural and visual change had to work inside the existing identity rather than replacing it.",
	// Die alte typbasierte Navigation neben der neuen zustandsbasierten Struktur.
	beforeAfter: [
		{
			caption: "Before — the old type-based navigation.",
			ratio: "4 / 3",
			span: "half",
		},
		{
			caption: "After — the new state-based structure.",
			ratio: "4 / 3",
			span: "half",
		},
	] satisfies FigureSlot[],
};

export const decisionsIntro =
	"These are, among others, the most significant decisions I made during the project that had the greatest impact on the platform.";

// Zusatzbausteine von Decision 1 (Disclosure + Zustandsliste). Stehen separat,
// weil nur diese eine Entscheidung sie hat — kein generisches Block-System.
export const openCall = {
	disclosure: {
		summary: "What is an open call?",
		body: "An open call is a request by a community member asking everyone to submit their artwork for a specific topic. Submissions are gathered for a set period, the host selects from them, and the result becomes an exhibition with an in-person event.",
	} satisfies DisclosureBlock,
	statesIntro: "Open calls are either:",
	states: [
		{
			label: "Active",
			text: "anyone has the option to make a submission.",
		},
		{
			label: "In selection",
			text: "submissions are no longer accepted and the host curates the entries.",
		},
		{
			label: "Closed",
			text: "the exhibits are selected and an upcoming in-person event gets published. The open call is archived and made digitally accessible to everyone.",
		},
	] satisfies LabeledItem[],
};

export const decisions: Decision[] = [
	{
		id: "structure",
		eyebrow: "Decision 1",
		title: "Restructuring based on the state of the content",
		thesis:
			"The site was sorted by type of content. I re-sorted it by where an open call stands in its life cycle.",
		paragraphs: [
			"The original site was organized by the type of content. A section for open calls, one for the community board, one for events, one for exhibitions. Seemed like the logical thing to do, but the user got lost.",
			"So I reworked the flow of the site based on the life cycle of the foundation of nextmuseum.io, the open call. Everything else, like events and exhibitions, relates back to one.",
		],
		figures: [
			{
				caption:
					"A lifecycle diagram of one open call moving from active to in selection to closed, with the related event and exhibition hanging off it.",
				ratio: "16 / 9",
				span: "full",
			},
		],
	},
	{
		id: "roles",
		eyebrow: "Decision 2",
		title: "Roles are things you do, not things you are",
		thesis:
			"Hosting, submitting and following are three things one account does at the same time, so none of them became a user type.",
		paragraphs: [
			"A big focus for the relaunch was the community and the capabilities of the individual users. There are three things a person can do with the same open call: run it, submit to it, or follow it. Nobody is permanently one of them, and the same account can host a call and submit to someone else's. So the architecture had to make all three available to everyone rather than sorting people into user types.",
			"Before the relaunch, users could only submit their own art. Now anyone can take on the curator role by creating an open call.",
			"You start out as a member of the community. As soon as you make a submission, you are listed as an artist and can view your submissions and drafts on your profile. The same applies to open calls: create one and you appear as a curator, managing planned, ongoing and completed calls from your profile.",
			"I mapped the three flows separately and rebuilt the information architecture around them. That is also what surfaced drafts for submissions: artists prepare entries over days, not in one sitting.",
			"Creation follows the same principle. Starting an open call, a submission or an event happens inside a modal dialog that opens from several locations on the platform. Creation is not a destination you navigate to. It sits wherever the context makes it relevant, and it never pulls you out of what you were looking at.",
		],
		figures: [
			{
				caption:
					"A profile page of one account that is simultaneously curator of one call and artist in another, with the drafts section visible.",
				ratio: "4 / 3",
				span: "half",
			},
			{
				caption:
					"A short screen recording of the creation modal opening from two different locations.",
				ratio: "4 / 3",
				span: "half",
			},
		],
	},
	{
		id: "empty",
		eyebrow: "Decision 3",
		title: "Design for an empty platform",
		thesis:
			"A community platform starts empty, so the design had to look deliberate with nothing in it.",
		paragraphs: [
			"A community platform is empty before the community fills it.",
			"Instead of using cleverly designed empty states to highlight that something is missing, empty areas are either hidden or filled with large call-to-action areas.",
			"The reasoning behind this is that not every visitor should feel the need to do something about the empty space. Those who are inspired by a particular topic should be addressed in the right places.",
		],
		figures: [
			{
				caption: "The same screen with content.",
				ratio: "4 / 3",
				span: "half",
			},
			{
				caption:
					"The pre-community version showing a call-to-action area instead of an empty-state illustration.",
				ratio: "4 / 3",
				span: "half",
			},
		],
	},
	{
		id: "conversation",
		eyebrow: "Decision 4",
		title: "Move the conversation back onto the platform",
		thesis:
			"Discussion lived in a Telegram group, detached from the work it was about. Comments and reactions brought it back onto the content.",
		paragraphs: [
			"Discussion between members happened in an official Telegram group run by the platform operators. It worked, but it lived outside the artworks and open calls it was about, and none of it was visible to anyone arriving on the site.",
			"So we brought feedback onto the content itself: a comment function, plus reactions in the form of emojis and single words. The catch? There is no limit. Post as many as you like. If some content sparks the desire to spam the 🔥 emoji or list every adjective that comes to mind, then go ahead. There are no limits in art, and there shouldn't be any if you want to express your feelings about art.",
		],
		figures: [
			{
				caption:
					"A comment thread with a visibly excessive stack of reactions on it.",
				ratio: "3 / 4",
				span: "half",
			},
		],
	},
];

export const outcome = {
	// Erster Satz getrennt gespeichert, damit die Domain ein echter Link werden
	// kann, ohne den Satz zur Laufzeit zu zerschneiden. Wortlaut bleibt gleich.
	launch: {
		before: "The redesigned platform launched in June 2024 and is live at ",
		linkLabel: "nextmuseum.io",
		href: "https://nextmuseum.io/",
		after: ".",
	},
	paragraphs: [
		"The design system I developed for the redesign has been in use since the relaunch. It covers semantic roles for the existing brand color palette, responsive typography for various devices, a layout grid, and a comprehensive set of components. Working inside the fixed palette meant the system carries the original identity while giving the frontend team a documented foundation to build on.",
		"The community has grown to more than 500 members. Over 40 open calls have been published in total, and around half of them were created after the relaunch, in a little over half the time the platform has existed. Open calls and events are now published and managed by the users themselves, which removed a large share of the manual work the staff previously handled by hand.",
	],
	// Zahlen als Ziffern für Überflieger. Die Werte stammen aus dem Absatz
	// oben, die Kurzlabels sind die einzigen selbst formulierten Wörter der Seite.
	stats: [
		{ value: "500+", label: "community members" },
		{ value: "40+", label: "open calls published" },
		{ value: "≈50%", label: "created after the relaunch" },
	],
	figures: [
		{
			caption: "Final design — open call detail with submissions.",
			ratio: "16 / 10",
			span: "full",
		},
		{
			caption: "Final design — the curation view the host uses during selection.",
			ratio: "4 / 3",
			span: "half",
		},
		{
			caption: "Final design — the archived exhibition view.",
			ratio: "4 / 3",
			span: "half",
		},
	] satisfies FigureSlot[],
};

// TODO: Aus dem Markdown, bewusst NICHT gerendert — solange die Zahlen fehlen,
// hat der Platzhalter auf einer öffentlichen Seite nichts zu suchen.
// "post-launch numbers once available — submissions per open call, share of
//  open calls created by community members vs. staff, time saved on admin"

// Impressionen im Work-Grid. Texte (label/context/alt) liegen als einzige
// Quelle in messages/{de,en}.json unter impressions.items[id].
export type Impression = {
	id: string;
	src: string;
	square: boolean;
	link?: string;
};

export const impressions: Impression[] = [
	{
		id: "01",
		src: "nextmuseum_opencall.png",
		square: false,
		link: "https://nextmuseum.io/",
	},
	{
		id: "02",
		src: "upnext_dashboard.png",
		square: true,
	},
];

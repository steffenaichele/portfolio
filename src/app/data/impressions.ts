export type Impression = {
	id: string;
	src: string;
	alt: string;
	square: boolean;
	label: string;
	context: string;
	link?: string; // optional, z.B. "https://..."
};

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

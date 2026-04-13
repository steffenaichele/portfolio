import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sileo";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BGGrid from "./components/BGGrid";

const instrumentSans = localFont({
	src: [
		{
			path: "../fonts/InstrumentSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/InstrumentSans-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../fonts/InstrumentSans-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/InstrumentSans-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../fonts/InstrumentSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
	title: "Steffen Aichele",
	description:
		"Portfolio von Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="de"
			className={`bg-(--color-black) overscroll-x-none overscroll-y-contain scroll-smooth ${instrumentSans.variable}`}>
			<body className=" text-(--color-text-primary) font-sans antialiased tracking-(--letter-spacing) w-full">
				<Header />
				<main className="bg-(--color-bg-elevated) bg-pattern flex flex-col gap-24 pb-24 rounded-bl-squircle-lg rounded-br-squircle-lg corner-squircle">
					<BGGrid />
					{children}
				</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
				<Toaster position="bottom-center" />
			</body>
		</html>
	);
}

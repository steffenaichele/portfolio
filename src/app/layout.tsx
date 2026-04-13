import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sileo";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import BGGrid from "./components/BGGrid";

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
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="de"
			data-scroll-behavior="smooth"
			className={`bg-bg overscroll-x-none overscroll-y-contain ${instrumentSans.variable}`}>
			<body className=" text-text-primary font-sans antialiased w-full">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-button-primary-bg) focus:text-(--color-button-primary-label) focus:rounded-(--radius-button)">
					Skip to main content
				</a>
				<Header />
				<main id="main-content" className="min-h-[95dvh] bg-main bg-pattern flex flex-col gap-24 pt-50 pb-24 rounded-bl-(--radius-main) rounded-br-(--radius-main) corner-squircle">
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

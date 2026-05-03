import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sileo";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import BGGrid from "./components/BGGrid";

const ppNeueMontreal = localFont({
	src: [
		{
			path: "../fonts/PPNeueMontreal-Hairline.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-HairlineItalic.woff2",
			weight: "100",
			style: "italic",
		},
		{
			path: "../fonts/PPNeueMontreal-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-LightItalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../fonts/PPNeueMontreal-Book.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-BookItalic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../fonts/PPNeueMontreal-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../fonts/PPNeueMontreal-Semibold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-SemiboldItalic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "../fonts/PPNeueMontreal-Black.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-BlackItalic.woff2",
			weight: "900",
			style: "italic",
		},
	],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Steffen Aichele",
	description:
		"Portfolio von Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
};

export const viewport = {
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
			style={{ colorScheme: "dark" }}
			className={`bg-bg overscroll-x-none overscroll-y-contain ${ppNeueMontreal.variable}`}>
			<body className=" bg-main bg-pattern text-text-primary font-sans antialiased w-full">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-button-primary-bg) focus:text-(--color-button-primary-label) focus:rounded-(--radius-button) ">
					Skip to main content
				</a>
				<Header />
				<main
					id="main-content"
					className="relative overflow-y-visible min-h-[95dvh] flex flex-col gap-24 px-5 pb-24">
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

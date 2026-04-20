import type { Metadata } from "next";
import "./styles/globals.css";
import { Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sileo";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import BGGrid from "./components/BGGrid";

const inter = Inter_Tight({
	subsets: ["latin"],
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
			className={`bg-bg overscroll-x-none overscroll-y-contain ${inter.variable}`}>
			<body className="text-text-primary font-sans antialiased w-full">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-button-primary-bg) focus:text-(--color-button-primary-label) focus:rounded-(--radius-button) before:absolute before:">
					Skip to main content
				</a>
				<Header />
				<main
					id="main-content"
					className="relative overflow-y-visible min-h-[95dvh] bg-main bg-pattern flex flex-col gap-24 pb-24 rounded-bl-(--radius-main) rounded-br-(--radius-main) corner-squircle">
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

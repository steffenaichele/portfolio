import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sileo";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PixelTrail from "./components/PixelTrail";

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
	variable: "--ppNeueMontreal",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://steffenaichele.com"),
	title: {
		default: "Steffen Aichele",
		template: "%s · Steffen Aichele",
	},
	description:
		"Portfolio von Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
	openGraph: {
		type: "website",
		locale: "de_DE",
		alternateLocale: "en_US",
		url: "https://steffenaichele.com",
		siteName: "Steffen Aichele",
		title: "Steffen Aichele",
		description:
			"Portfolio von Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Steffen Aichele – UX/UI Designer und Full Stack Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
	},
};

export const viewport: Viewport = {
	themeColor: "#f5f5f5",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	const t = await getTranslations("layout");

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={`overscroll-x-none overscroll-y-contain ${ppNeueMontreal.variable}`}>
			<body className=" bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans antialiased w-full">
				<PixelTrail />
				<NextIntlClientProvider locale={locale} messages={messages}>
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-button-primary-bg) focus:text-(--color-button-primary-label) focus:rounded-(--radius-button) ">
						{t("skip_to_main")}
					</a>
					<Header />
					<main
						id="main-content"
						className="sticky bottom-0 z-10 overflow-y-visible min-h-[95dvh] flex flex-col gap-20 pb-24 bg-[var(--color-bg)]">
						{children}
					</main>
					<Footer />
				</NextIntlClientProvider>
				<Analytics />
				<SpeedInsights />
				<Toaster position="bottom-center" />
			</body>
		</html>
	);
}

import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ViewProvider from "./components/ViewProvider";

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
	metadataBase: new URL("https://steffenaichele.xyz"),
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
		url: "https://steffenaichele.xyz",
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
			className={`bg-[var(--color-bg)] overflow-x-hidden w-full ${ppNeueMontreal.variable}`}>
			<body className="relative w-full max-w-xl min-h-dvh data-[view=work]:max-w-full mx-auto text-[var(--color-text-primary)] font-sans antialiased [transition:max-width_2000ms_var(--ease-out)] motion-reduce:transition-none">
				{/* <PixelTrail /> */}
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ViewProvider>
						<a
							href="#main-content"
							className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-button-primary-bg) focus:text-(--color-button-primary-label)">
							{t("skip_to_main")}
						</a>
						<Header />
						<main id="main-content">{children}</main>
						<Footer />
					</ViewProvider>
				</NextIntlClientProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}

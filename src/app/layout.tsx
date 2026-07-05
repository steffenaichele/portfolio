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

// Nur tatsächlich genutzte Schnitte laden (400 regulär, 500 für font-medium).
const ppNeueMontreal = localFont({
	src: [
		{
			path: "../fonts/PPNeueMontreal-Book.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/PPNeueMontreal-Medium.woff2",
			weight: "500",
			style: "normal",
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
				{process.env.NODE_ENV === "development" && (
					<script
						type="module"
						async
						src="http://localhost:7331/inject.js"
					/>
				)}
			</body>
		</html>
	);
}

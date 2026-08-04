import type { Metadata } from "next";
import "./styles/preflight.css";
import "./styles/globals.scss";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastProvider } from "./components/ToastNotification/ToastNotification";
import styles from "./layout.module.scss";

const ppMori = localFont({
	src: [
		{
			path: "../fonts/PPMori-Regular.woff2",
			weight: "400",
			style: "regular",
		},
		{
			path: "../fonts/PPMori-Semibold.woff2",
			weight: "600",
			style: "semibold",
		},
	],
	variable: "--ppMori",
	display: "swap",
});

const ppNeueMontrealMono = localFont({
	src: [
		{
			path: "../fonts/PPNeueMontrealMono-Regular.woff",
			weight: "400",
			style: "regular",
		},
		{
			path: "../fonts/PPNeueMontrealMono-Medium.woff",
			weight: "500",
			style: "medium",
		},
	],
	variable: "--ppNeueMontrealMono",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://steffenaichele.xyz"),
	title: {
		default: "Steffen Aichele",
		template: "%s · Steffen Aichele",
	},
	description:
		"Portfolio of Steffen Aichele – UX/UI Designer and Web Developer from Schwäbisch Gmünd.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://steffenaichele.xyz",
		siteName: "Steffen Aichele",
		title: "Steffen Aichele",
		description:
			"Portfolio of Steffen Aichele – UX/UI Designer and Web Developer from Schwäbisch Gmünd.",
	},
	twitter: {
		card: "summary_large_image",
	},
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
			className={`${styles.html} ${ppMori.variable} ${ppNeueMontrealMono.variable}`}>
			<body className={styles.body}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ToastProvider>
						<a href="#main-content" className={styles.skipLink}>
							{t("skip_to_main")}
						</a>
						<Header />
						<main id="main-content" className="content-grid">
							{children}
						</main>
						<Footer />
					</ToastProvider>
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

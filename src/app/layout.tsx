import type { Metadata } from "next";
import "./styles/globals.css";
import localFont from "next/font/local";

import Header from "./components/Header";
import Footer from "./components/Footer";

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
  description: "Portfolio von Steffen Aichele – UX/UI Designer und Full Stack Developer aus Stuttgart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html
			lang="en"
			className={`bg-(--color-black) overscroll-x-none overscroll-y-contain scroll-smooth ${instrumentSans.variable}`}>
			<body className="bg-(--color-bg-elevated) text-(--color-text-primary) font-sans antialiased tracking-[-2%] w-full">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
  );
}

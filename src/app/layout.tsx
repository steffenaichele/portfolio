import type { Metadata } from "next";
import "./styles/globals.css";
import { Instrument_Sans } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";

const instrumentSans = Instrument_Sans({
	subsets: ["latin"],
	variable: "--font-instrument-sans",
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
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
		<html lang="en" className={`scroll-smooth ${instrumentSans.variable}`}>
			<body className="bg-(--background) font-sans antialiased tracking-[-2%] w-full">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
  );
}

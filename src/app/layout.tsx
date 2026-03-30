import type { Metadata } from "next";
import "./styles/globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Steffen Aichele",
  description: "hi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className="bg-(--background) font-sans antialiased tracking-[-2%] w-full body-grid">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
  );
}

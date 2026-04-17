"use client";

import { useState } from "react";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import Logo from "./Logo";
import BlurEffect from "react-progressive-blur";

const Header = () => {
	const [navOpen, setNavOpen] = useState(false);

	return (
		<header
			className={`fixed w-full pt-16 z-50 bg-(--foreground rounded-xl transition-[padding-bottom] duration-300 ease-out ${navOpen ? "pb-6" : "pb-0"}`}
			aria-label="Site header">
			<BlurEffect
				className="absolute inset-0 h-full pointer-events-none"
				position="top"
				intensity={50}
			/>
			<div className="relative flex flex-row justify-between items-start px-5 min-h-11 z-10">
				<Link
					href="/"
					aria-label="Steffen Aichele – Startseite"
					className="h-11 flex items-center">
					<Logo />
				</Link>

				<MobileNavigation open={navOpen} onOpenChange={setNavOpen} />
			</div>
		</header>
	);
};

export default Header;

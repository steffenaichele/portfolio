"use client";

import Link from "next/link";
import MobileNavigation from "./MobileNavigation";


const Header = () => {

	return (
		<header className="fixed w-full h-35 pt-16 z-50 bg-(--foreground rounded-xl" aria-label="Site header">
			<div className="flex flex-row justify-between items-top px-5 h-11">
				<Link href="/">
					<span className="h-full flex justify-center items-center">Steffen Aichele</span>
				</Link>

				<MobileNavigation />
			</div>
		</header>
	);
};

export default Header;

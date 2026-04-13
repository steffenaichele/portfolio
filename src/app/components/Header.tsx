"use client";

import Link from "next/link";
import MobileNavigation from "./MobileNavigation";


const Header = () => {

	return (
		<header className="fixed w-full top-16 z-50 bg-(--foreground rounded-xl">
			<div className="flex flex-row justify-between items-top px-8 h-11">
				<Link href="/">
					<span className="h-full flex justify-center items-center">Steffen Aichele</span>
				</Link>

				<MobileNavigation />
			</div>
		</header>
	);
};

export default Header;

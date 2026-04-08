"use client";

import Link from "next/link";
import MobileNavigation from "./MobileNavigation";


const Header = () => {

	return (
		<header className="fixed w-full xl:w-auto top-16 xl:inset-x-19 z-50 bg-(--foreground) xl:bg-transparent rounded-xl xl:rounded-none">
			<div className="flex flex-row justify-between items-top px-8 h-11">
				<Link href="/">
					<span className="h-full flex justify-center items-center">Steffen Aichele</span>
				</Link>

				{/* Mobile hamburger */}
				<MobileNavigation />
			</div>
		</header>
	);
};

export default Header;

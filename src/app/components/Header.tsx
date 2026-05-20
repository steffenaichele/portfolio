"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MobileNavigation from "./MobileNavigation";
import Logo from "./Logo";
import BlurEffect from "react-progressive-blur";

const Header = () => {
	const [navOpen, setNavOpen] = useState(false);
	const t = useTranslations('layout');

	return (
		<header
			className="fixed w-full pt-[max(4rem,env(safe-area-inset-top))] pb-4 z-50 rounded-xl"
			aria-label="Site header">
			<BlurEffect
				className="absolute inset-0 h-full pointer-events-none"
				position="top"
				intensity={navOpen ? 100 : 50}
			/>
			<div className="relative flex flex-row justify-between items-start px-5 min-h-11 z-10">
				<Link
					href="/"
					aria-label={t('header.logo_label')}
					className="h-11 flex items-center">
					<Logo />
				</Link>

				<MobileNavigation open={navOpen} onOpenChange={setNavOpen} />
			</div>
		</header>
	);
};

export default Header;

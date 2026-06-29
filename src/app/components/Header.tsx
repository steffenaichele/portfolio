"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";
import BlurEffect from "react-progressive-blur";

const navLinks = [
	{ key: "home", href: "/" },
	{ key: "work", href: "/work" },
] as const;

const Header = () => {
	const t = useTranslations("layout");
	const tNav = useTranslations("layout.nav");
	const pathname = usePathname();
	const activeKey = pathname === "/work" ? "work" : "home";

	return (
		<header
			className="sticky max-w-lg mx-auto w-full top-0 bg-[var(--color-segment-bg)] pt-[max(4rem,env(safe-area-inset-top))] pb-4 z-50 rounded-xl"
			aria-label="Site header">
			<BlurEffect
				className="absolute inset-0 h-full pointer-events-none"
				position="top"
				intensity={50}
			/>
			<div className="relative max-w-lg mx-auto flex flex-row justify-between items-center min-h-11 z-10">
				<Link
					href="/"
					aria-label={t("header.logo_label")}
					className="h-11 flex items-center">
					<Logo />
				</Link>

				<nav aria-label={tNav("nav_label")}>
					<ToggleButton
						activeKey={activeKey}
						options={navLinks.map((link) => ({
							key: link.key,
							label: tNav(link.key),
							href: link.href,
						}))}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;

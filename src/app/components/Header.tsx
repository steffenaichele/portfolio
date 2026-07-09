"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";
import BlurEffect from "react-progressive-blur";
import styles from "./Header.module.scss";

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
		<header className={styles.header} aria-label="Site header">
			<BlurEffect className={styles.blur} position="top" intensity={50} />
			<div className={styles.inner}>
				<Link
					href="/"
					aria-label={t("header.logo_label")}
					className={styles.logoButton}>
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

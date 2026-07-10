"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import ActionWrapper from "./ActionWrapper";
import Button from "./Button";
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
					<ActionWrapper variant="primary" className={styles.nav}>
						{navLinks.map((link) => {
							const active = activeKey === link.key;
							return (
								<Button
									key={link.key}
									href={link.href}
									data-pill-rest={active}
									aria-current={active ? "page" : undefined}
									className={active ? styles.navActive : styles.navInactive}>
									{tNav(link.key)}
								</Button>
							);
						})}
					</ActionWrapper>
				</nav>
			</div>
		</header>
	);
};

export default Header;

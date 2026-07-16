"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "../Logo/Logo";
import InteractionWrapper from "../InteractionWrapper/InteractionWrapper";
import Option from "../Option/Option";
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
			<div className={styles.inner}>
				<Link
					href="/"
					aria-label={t("header.logo_label")}
					className={styles.logoButton}>
					<Logo />
				</Link>

				<nav aria-label={tNav("nav_label")}>
					<InteractionWrapper variant="primary" className={styles.nav}>
						{navLinks.map((link) => {
							const active = activeKey === link.key;
							return (
								<Option
									key={link.key}
									href={link.href}
									data-pill-rest={active}
									aria-current={active ? "page" : undefined}
									className={active ? styles.navActive : styles.navInactive}>
									<span>{tNav(link.key)}</span>
								</Option>
							);
						})}
					</InteractionWrapper>
				</nav>
			</div>
		</header>
	);
};

export default Header;

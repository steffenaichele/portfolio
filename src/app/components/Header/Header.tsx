"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";

// Header trägt nur noch das Logo — die Haupt-Navigation lebt als floating Nav
// (components/Nav) fixed am unteren Viewport-Rand.
const Header = () => {
	const t = useTranslations("layout");

	return (
		<header className={styles.header} aria-label="Site header">
			<div className={styles.inner}>
				<Link
					href="/"
					aria-label={t("header.logo_label")}
					className={styles.logoButton}>
					<Logo />
				</Link>
			</div>
		</header>
	);
};

export default Header;

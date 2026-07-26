"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";

// Header trägt nur noch das Logo — die Haupt-Navigation lebt als floating Nav
// (components/Nav) fixed am unteren Viewport-Rand.
const Header = () => {
	const t = useTranslations("layout");

	return (
		<header
			className={`${styles.header} content-grid`}
			aria-label="Site header">
			<div className={`${styles.wrapper}`}>
				<Link
					href="/"
					aria-label={t("header.logo_label")}
					className={styles.logoButton}>
					<Logo />
				</Link>
				<Nav />
			</div>
		</header>
	);
};

export default Header;

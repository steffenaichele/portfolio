"use client";

import { useTranslations } from "next-intl";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";
import BlurEffect from "react-progressive-blur";
import { useView } from "./ViewProvider";
import styles from "./Header.module.scss";

const navItems = [{ key: "home" }, { key: "work" }] as const;

const Header = () => {
	const t = useTranslations("layout");
	const tNav = useTranslations("layout.nav");
	const { view, requestView } = useView();

	return (
		<header className={styles.header} aria-label="Site header">
			<BlurEffect className={styles.blur} position="top" intensity={50} />
			<div className={styles.inner}>
				<button
					type="button"
					aria-label={t("header.logo_label")}
					onClick={() => requestView("home")}
					className={styles.logoButton}>
					<Logo />
				</button>

				<nav aria-label={tNav("nav_label")}>
					<ToggleButton
						activeKey={view}
						options={navItems.map((item) => ({
							key: item.key,
							label: tNav(item.key),
							onClick: () => requestView(item.key),
						}))}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;

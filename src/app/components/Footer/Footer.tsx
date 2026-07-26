"use client";

import { useTranslations } from "next-intl";
import ImprintModal from "../ImprintModal/ImprintModal";
import styles from "./Footer.module.scss";

// Footer: Meta + Impressum. Die Kontakt-Gruppe (Email/LinkedIn/GitHub) lebt
// jetzt in der floating Nav (components/Nav). Der Sprachumschalter
// (components/LanguageToggle) kommt post-launch mit DE zurück.
const Footer = () => {
	const t = useTranslations("layout.footer");

	return (
		<footer aria-label="Footer" className={`${styles.footer} content-grid`}>
			<div className={`${styles.row} breakout`}>
				<div className={styles.meta}>
					<p>{t("copyright")}</p>
					<p>
						{t("built_with")} <span aria-hidden="true">✨</span>
					</p>
				</div>
				<div className={styles.actions}>
					<ImprintModal />
				</div>
			</div>
		</footer>
	);
};

export default Footer;

"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import LanguageToggle from "./LanguageToggle";
import ImprintModal from "./ImprintModal";
import styles from "./Footer.module.scss";

const Footer = () => {
	const t = useTranslations("layout.footer");

	return (
		<footer aria-label="Footer" className={styles.footer}>
			<div className={styles.linksRow}>
				<ActionWrapper className={styles.linksWrap}>
					<Button
						isLink
						href="https://github.com/steffenaichele"
						external>
						GitHub
						<span className={styles.icon}>
							<Icon icon={ArrowUpRight} />
						</span>
					</Button>
					<Button
						isLink
						href="https://www.linkedin.com/in/steffenaichele"
						external>
						LinkedIn
						<span className={styles.icon}>
							<Icon icon={ArrowUpRight} />
						</span>
					</Button>
					<ImprintModal />
				</ActionWrapper>
				<ActionWrapper>
					<Button
						content="iconRight"
						copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
						{t("email")}
						<Icon icon={Mail} />
					</Button>
				</ActionWrapper>
			</div>

			<div className={styles.bottomRow}>
				<div className={styles.meta}>
					<p>{t("copyright")}</p>
					<p>
						{t("built_with")} <span aria-hidden="true">✨</span>
					</p>
				</div>
				<LanguageToggle />
			</div>
		</footer>
	);
};

export default Footer;

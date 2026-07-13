"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Button from "./Button";
import InteractionWrapper from "./InteractionWrapper";
import LanguageToggle from "./LanguageToggle";
import ImprintModal from "./ImprintModal";
import { useToast } from "./ToastNotification";
import styles from "./Footer.module.scss";

const Footer = () => {
	const t = useTranslations("layout.footer");
	const { showToast } = useToast();

	return (
		<footer aria-label="Footer" className={styles.footer}>
			<div className={styles.row}>
				<InteractionWrapper>
					<ImprintModal />
				</InteractionWrapper>
				<InteractionWrapper variant="primary">
					<Button
						size="sm"
						content="iconText"
						underline
						copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}
						onCopySuccess={() =>
							showToast(t("email_copied"), "success")
						}
						onCopyError={() =>
							showToast(t("email_copy_failed"), "error")
						}>
						<span>{t("email")}</span>
						<Icon icon={Mail} />
					</Button>
					<Button
						size="sm"
						content="iconText"
						underline
						href="https://www.linkedin.com/in/steffenaichele"
						external>
						<span>LinkedIn</span>
						<Icon icon={ArrowUpRight} />
					</Button>
					<Button
						size="sm"
						content="iconText"
						underline
						href="https://github.com/steffenaichele"
						external>
						<span>GitHub</span>
						<Icon icon={ArrowUpRight} />
					</Button>
				</InteractionWrapper>
			</div>

			<div className={styles.row}>
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

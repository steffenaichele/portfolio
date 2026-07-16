"use client";

import { RiArrowRightUpLine, RiMailLine } from "@remixicon/react";
import { useTranslations } from "next-intl";
import Icon from "../Icon";
import Option from "../Option/Option";
import InteractionWrapper from "../InteractionWrapper/InteractionWrapper";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ImprintModal from "../ImprintModal/ImprintModal";
import { useToast } from "../ToastNotification/ToastNotification";
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
					<Option
						size="sm"
						content="iconText"
						copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}
						onCopySuccess={() =>
							showToast(t("email_copied"), "success")
						}
						onCopyError={() =>
							showToast(t("email_copy_failed"), "error")
						}>
						<span>{t("email")}</span>
						<Icon icon={RiMailLine} />
					</Option>
					<Option
						size="sm"
						content="iconText"
						href="https://www.linkedin.com/in/steffenaichele"
						external>
						<span>LinkedIn</span>
						<Icon icon={RiArrowRightUpLine} />
					</Option>
					<Option
						size="sm"
						content="iconText"
						href="https://github.com/steffenaichele"
						external>
						<span>GitHub</span>
						<Icon icon={RiArrowRightUpLine} />
					</Option>
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

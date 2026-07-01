"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import LanguageToggle from "./LanguageToggle";
import ImprintModal from "./ImprintModal";

const Footer = () => {
	const t = useTranslations("layout.footer");

	return (
		<footer
			aria-label="Footer"
			className="mt-auto w-full max-w-xl mx-auto flex flex-col gap-6 bg-[var(--color-segment-bg)] px-7 py-10 mb-1 rounded-lg">
			<div className="flex flex-wrap items-center gap-2">
				<ActionWrapper className="flex flex-wrap">
					<Button
						isLink
						href="https://github.com/steffenaichele"
						external>
						GitHub
						<span className="text-[var(--color-text-secondary)]">
							<Icon icon={ArrowUpRight} />
						</span>
					</Button>
					<Button
						isLink
						href="https://www.linkedin.com/in/steffenaichele"
						external>
						LinkedIn
						<span className="text-[var(--color-text-secondary)]">
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

			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-col gap-1 text-[var(--color-text-tertiary)] text-xs">
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

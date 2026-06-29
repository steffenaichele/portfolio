"use client";

import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import { useTranslations } from "next-intl";
import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import LanguageToggle from "./LanguageToggle";
import NotificationStackFooter from "./NotificationStackFooter";

const cardClass =
	"bg-(--color-footer-bg) rounded-[var(--radius-surface)] shadow-xl";

const Footer = () => {
	const t = useTranslations("layout.footer");
	const tNav = useTranslations("layout.nav");

	return (
		<footer className="max-w-lg mx-auto" aria-label="Footer">
			<NotificationStackFooter>
				{/* Card 1 (oben im Stack): Identität */}
				<div className={`flex flex-col px-6 py-4 ${cardClass}`}>
					<h2 className="text-xl font-medium text-(--color-footer-text-primary)">
						Steffen Aichele
					</h2>
					<p className="text-md text-(--color-footer-text-secondary)">
						{t("subtitle")}
					</p>
				</div>

				{/* Card 2: Navigation */}
				<nav
					aria-label="Footer-Navigation"
					className={`flex gap-4 px-6 py-4 ${cardClass}`}>
					<div className="flex flex-col flex-1 gap-2">
						<p className="text-sm font-medium uppercase text-(--color-footer-text-tertiary)">
							{t("pages_heading")}
						</p>
						<ActionWrapper>
							<ul className="flex flex-col gap-1 text-(--color-footer-text-primary)">
								<li>
									<Button isLink href="/">
										{tNav("home")}
									</Button>
								</li>
								<li>
									<Button isLink href="/work">
										{tNav("work")}
									</Button>
								</li>
								<li>
									<Button isLink href="/imprint">
										{t("imprint")}
									</Button>
								</li>
							</ul>
						</ActionWrapper>
					</div>
					<div className="flex flex-col flex-1 gap-2">
						<p className="text-sm font-medium uppercase text-(--color-footer-text-tertiary)">
							{t("links_heading")}
						</p>
						<ActionWrapper>
							<ul className="flex flex-col gap-1 text-(--color-footer-text-primary)">
								<li>
									<Button
										isLink
										href="https://www.linkedin.com/in/steffenaichele"
										external>
										LinkedIn
										<span className="text-(--color-footer-text-secondary)">
											<Icon icon={ArrowUpRight} />
										</span>
									</Button>
								</li>
								<li>
									<Button
										isLink
										href="https://github.com/steffenaichele"
										external>
										GitHub
										<span className="text-(--color-footer-text-secondary)">
											<Icon icon={ArrowUpRight} />
										</span>
									</Button>
								</li>
							</ul>
						</ActionWrapper>
					</div>
				</nav>

				{/* Card 3 (unten im Stack): Copyright + Sprache */}
				<div
					className={`flex flex-wrap items-center justify-between px-6 py-4 ${cardClass}`}>
					<div className="flex flex-col gap-1 text-[var(--color-footer-text-secondary)] text-xs">
						<p>{t("copyright")}</p>
						<p>
							{t("built_with")} <span aria-hidden="true">✨</span>
						</p>
					</div>
					<LanguageToggle />
				</div>
			</NotificationStackFooter>
		</footer>
	);
};

export default Footer;

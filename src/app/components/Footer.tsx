"use client";

import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import { useTranslations } from "next-intl";
import LinkButton from "./LinkButton";
import LanguageToggle from "./LanguageToggle";

const Footer = () => {
	const t = useTranslations('layout.footer');
	return (
		<footer className="w-full px-2 pb-2 ">
			<div className="flex flex-col gap-12 p-8 bg-(--color-footer-bg) rounded-[var(--radius-surface)] corner-squircle">
				<div className="flex flex-col">
					<h2 className="text-2xl text-(--color-footer-text-primary)">
						Steffen Aichele
					</h2>
					<p className="text-sm text-(--color-footer-text-secondary)">
						{t('subtitle')}
					</p>
				</div>

				{/* <div className="flex gap-4 justify-between items-center">
					<h3 className="text-lg text-(--color-footer-text-primary)">
						Get in Touch
					</h3>
					<Button
						content="iconRight"
						variant="primary"
						copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
						Holler at me
						<Icon icon={Mail} />
					</Button>
				</div> */}

				<nav aria-label="Footer-Navigation" className="flex gap-4">
					<div className="flex flex-col flex-1 gap-2">
						<h6 className="text-sm uppercase text-(--color-footer-text-tertiary)">
							{t('pages_heading')}
						</h6>
						<ul className="flex flex-col gap-1 text-(--color-footer-text-primary)">
							<li>
								<LinkButton href="/">Home</LinkButton>
							</li>
							<li>
								<LinkButton href="/impressions">
									Impressions
								</LinkButton>
							</li>
							<li>
								<LinkButton href="/cv">CV</LinkButton>
							</li>
							<li>
								<LinkButton href="/imprint">
									{t('imprint')}
								</LinkButton>
							</li>
						</ul>
					</div>
					<div className="flex flex-col flex-1 gap-2">
						<h6 className="text-sm uppercase text-(--color-footer-text-tertiary)">
							{t('links_heading')}
						</h6>
						<ul className="flex flex-col gap-1 text-(--color-footer-text-primary)">
							<li>
								<LinkButton
									href="https://www.linkedin.com/in/steffenaichele"
									external
									hasIcon>
									LinkedIn
									<span className="text-(--color-footer-text-secondary)">
										<Icon icon={ArrowUpRight} />
									</span>
								</LinkButton>
							</li>
							<li>
								<LinkButton
									href="https://github.com/steffenaichele"
									external
									hasIcon>
									GitHub
									<span className="text-(--color-footer-text-secondary)">
										<Icon icon={ArrowUpRight} />
									</span>
								</LinkButton>
							</li>
						</ul>
					</div>
				</nav>

				<div className="flex flex-wrap items-center justify-between gap-4 text-[var(--color-footer-text-secondary)] text-xs">
					<div className="flex flex-col gap-1">
						<p>{t('copyright')}</p>
						<p>
							{t('built_with')}{" "}
							<span aria-hidden="true">✨</span>
						</p>
					</div>
					<LanguageToggle />
				</div>
			</div>
		</footer>
	);
};

export default Footer;

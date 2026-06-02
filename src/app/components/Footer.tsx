"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import { useTranslations } from "next-intl";
import LinkButton from "./LinkButton";
import LanguageToggle from "./LanguageToggle";

const Footer = () => {
	const t = useTranslations("layout.footer");
	const tNav = useTranslations("layout.nav");
	const reduceMotion = useReducedMotion();
	const footerRef = useRef<HTMLElement>(null);

	// Pull the footer up by its own height so it overlaps the bottom of the
	// pinned <main> (see layout.tsx) instead of pushing it out of its sticky
	// position. The footer then scrolls up over the ProjectSection.
	useEffect(() => {
		const el = footerRef.current;
		if (!el) return;
		const setHeight = () =>
			document.documentElement.style.setProperty(
				"--footer-height",
				`${el.offsetHeight}px`,
			);
		setHeight();
		const observer = new ResizeObserver(setHeight);
		observer.observe(el);
		return () => {
			observer.disconnect();
			document.documentElement.style.removeProperty("--footer-height");
		};
	}, []);

	const segment = {
		initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.4 } as const,
	};

	return (
		<footer
			ref={footerRef}
			className="relative z-20 w-full px-2 pb-2 -mt-[var(--footer-height,0px)]">
			<div className="flex flex-col gap-12 p-8 bg-(--color-footer-bg) rounded-[var(--radius-surface)] corner-squircle">
				<motion.div
					initial={segment.initial}
					whileInView={segment.whileInView}
					viewport={segment.viewport}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
					className="flex flex-col">
					<h2 className="text-2xl text-(--color-footer-text-primary)">
						Steffen Aichele
					</h2>
					<p className="text-sm text-(--color-footer-text-secondary)">
						{t('subtitle')}
					</p>
				</motion.div>

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

				<motion.nav
					aria-label="Footer-Navigation"
					initial={segment.initial}
					whileInView={segment.whileInView}
					viewport={segment.viewport}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
					className="flex gap-4">
					<div className="flex flex-col flex-1 gap-2">
						<p className="text-sm uppercase text-(--color-footer-text-tertiary)">
							{t('pages_heading')}
						</p>
						<ul className="flex flex-col gap-1 text-(--color-footer-text-primary)">
							<li>
								<LinkButton href="/">{tNav("home")}</LinkButton>
							</li>
							<li>
								<LinkButton href="/impressions">
									{tNav("impressions")}
								</LinkButton>
							</li>
							<li>
								<LinkButton href="/imprint">
									{t('imprint')}
								</LinkButton>
							</li>
						</ul>
					</div>
					<div className="flex flex-col flex-1 gap-2">
						<p className="text-sm uppercase text-(--color-footer-text-tertiary)">
							{t('links_heading')}
						</p>
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
				</motion.nav>

				<motion.div
					initial={segment.initial}
					whileInView={segment.whileInView}
					viewport={segment.viewport}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
					className="flex flex-wrap items-center justify-between gap-4 text-[var(--color-footer-text-secondary)] text-xs">
					<div className="flex flex-col gap-1">
						<p>{t('copyright')}</p>
						<p>
							{t('built_with')}{" "}
							<span aria-hidden="true">✨</span>
						</p>
					</div>
					<LanguageToggle />
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;

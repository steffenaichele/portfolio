"use client";

// clsx merges class strings conditionally.
// Usage: clsx("base-class", condition && "conditional-class", { "object-class": condition })
// Strings, arrays, and objects are all valid — falsy values are ignored.

import { useEffect, useEffectEvent } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useLocale } from "../hooks/useLocale";
import Button from "./Button";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const DURATION_OPEN = 300;
const DURATION_CLOSE = 200;
const STAGGER_DELAY = 60;
const MENU_GAP = 32;

const navLinkHrefs = [
	{ key: "home" as const, href: "/" },
	{ key: "impressions" as const, href: "/impressions" },
	{ key: "cv" as const, href: "/cv" },
];

const countLinks = navLinkHrefs.length;

interface MobileNavigationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const MobileNavigation = ({ open, onOpenChange }: MobileNavigationProps) => {
	const t = useTranslations('layout');
	const { locale, setLocale } = useLocale();
	const closeOnEscape = useEffectEvent(() => {
		if (open) onOpenChange(false);
	});

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeOnEscape();
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, []);

	const menuIcon = open ? X : Menu;
	const duration = open ? DURATION_OPEN : DURATION_CLOSE;

	const itemClass = clsx(
		"transition-[opacity,transform] [transition-timing-function:var(--ease-out)]",
		open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
	);

	return (
		<nav className="flex-none flex flex-col items-end">
			<Button
				variant="primary"
				size="md"
				content="icon"
				aria-label={open ? t('nav.menu_close') : t('nav.menu_open')}
				aria-expanded={open}
				aria-controls="mobile-menu"
				onClick={() => onOpenChange(!open)}>
				<Icon icon={menuIcon} />
			</Button>

			<div
				className={clsx("grid", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
				style={{
					marginTop: open ? MENU_GAP : 0,
					transition: `grid-template-rows ${duration}ms var(--ease-out), margin-top ${duration}ms var(--ease-out)`,
				}}
				inert={!open}>
				<ul
					id="mobile-menu"
					className="min-h-0 flex flex-col items-end gap-2"
					aria-label={t('nav.nav_label')}>
					{navLinkHrefs.map((link, index) => (
						<li
							key={link.href}
							className={itemClass}
							style={{
								transitionDuration: `${duration}ms`,
								transitionDelay: open
									? `${index * STAGGER_DELAY}ms`
									: "0ms",
							}}>
							<Button
								href={link.href}
								size="md"
								onClick={() => onOpenChange(false)}>
								{t(`nav.${link.key}`)}
							</Button>
						</li>
					))}
					<li
						className={itemClass}
						style={{
							transitionDuration: `${duration}ms`,
							transitionDelay: open
								? `${countLinks * STAGGER_DELAY}ms`
								: "0ms",
						}}>
						<div className="flex items-center gap-2 h-9 px-1">
							<button
								onClick={() => setLocale("en")}
								aria-label={t('nav.switch_to_en')}
								className={clsx(
									"text-base transition-colors",
									locale === "en"
										? "text-[var(--color-text-primary)] font-medium"
										: "text-[var(--color-text-tertiary)]"
								)}>
								EN
							</button>
							<span className="text-base text-[var(--color-text-tertiary)]" aria-hidden>·</span>
							<button
								onClick={() => setLocale("de")}
								aria-label={t('nav.switch_to_de')}
								className={clsx(
									"text-base transition-colors",
									locale === "de"
										? "text-[var(--color-text-primary)] font-medium"
										: "text-[var(--color-text-tertiary)]"
								)}>
								DE
							</button>
						</div>
					</li>
					<li
						className={itemClass}
						style={{
							transitionDuration: `${duration}ms`,
							transitionDelay: open
								? `${(countLinks + 1) * STAGGER_DELAY}ms`
								: "0ms",
						}}>
						<Button
							variant="cta"
							size="md"
							content="iconRight"
							copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}
							copySuccessMessage={t('copy_success')}>
							{t('contact_button')}
							<Icon icon={Mail} />
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default MobileNavigation;

"use client";

// clsx merges class strings conditionally.
// Usage: clsx("base-class", condition && "conditional-class", { "object-class": condition })
// Strings, arrays, and objects are all valid — falsy values are ignored.

import { useEffect, useEffectEvent } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import LanguageToggle from "./LanguageToggle";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const DURATION_OPEN = 300;
const DURATION_CLOSE = 200;
const STAGGER_DELAY = 60;

const navLinkHrefs = [
	{ key: "home" as const, href: "/" },
	{ key: "work" as const, href: "/work" },
];

const countLinks = navLinkHrefs.length;

interface MobileNavigationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const MobileNavigation = ({ open, onOpenChange }: MobileNavigationProps) => {
	const t = useTranslations('layout');
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
			<ActionWrapper>
				<Button
					size="md"
					content="icon"
					aria-label={open ? t("nav.menu_close") : t("nav.menu_open")}
					aria-expanded={open}
					aria-controls="mobile-menu"
					onClick={() => onOpenChange(!open)}>
					<Icon icon={menuIcon} />
				</Button>
			</ActionWrapper>

			<div
				className={clsx(
					"grid",
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
				style={{
					transition: `grid-template-rows ${duration}ms var(--ease-out)`,
				}}
				inert={!open || undefined}>
				<ul
					id="mobile-menu"
					className="min-h-0 flex flex-col items-end gap-2 pt-8"
					aria-label={t("nav.nav_label")}>
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
							<ActionWrapper>
								<Button
									href={link.href}
									size="md"
									onClick={() => onOpenChange(false)}>
									{t(`nav.${link.key}`)}
								</Button>
							</ActionWrapper>
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
						<ActionWrapper>
							<Button
								size="md"
								content="iconRight"
								copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}
								copySuccessMessage={t("copy_success")}>
								{t("contact_button")}
								<Icon icon={Mail} />
							</Button>
						</ActionWrapper>
					</li>
					<li
						className={itemClass}
						style={{
							transitionDuration: `${duration}ms`,
							transitionDelay: open
								? `${(countLinks + 1) * (STAGGER_DELAY * 3)}ms`
								: "0ms",
						}}>
						<LanguageToggle />
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default MobileNavigation;

"use client";

// clsx merges class strings conditionally.
// Usage: clsx("base-class", condition && "conditional-class", { "object-class": condition })
// Strings, arrays, and objects are all valid — falsy values are ignored.

import { useEffect } from "react";
import clsx from "clsx";
import Button from "./Button";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const DURATION_OPEN = 300;
const DURATION_CLOSE = 200;
const STAGGER_DELAY = 60;
const MENU_GAP = 32;

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Impressions", href: "/impressions" },
	{ label: "CV", href: "/cv" },
];

const countLinks = navLinks.length;

interface MobileNavigationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const MobileNavigation = ({ open, onOpenChange }: MobileNavigationProps) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && open) {
				onOpenChange(false);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [open, onOpenChange]);

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
				content="iconOnly"
				aria-label={open ? "Menü schließen" : "Menü öffnen"}
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
					aria-label="Mobile Navigation">
					{navLinks.map((link, index) => (
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
								onClick={() => onOpenChange(false)}>
								{link.label}
							</Button>
						</li>
					))}
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
							content="iconRight"
							copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
							Kontakt
							<Icon icon={Mail} />
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default MobileNavigation;

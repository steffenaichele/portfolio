"use client";

import { useEffect } from "react";
import Button from "./Button";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const navLinks = [
    { label: "Home", href: "/" },
	{ label: "Projekte", href: "/projects" },
	{ label: "CV", href: "/cv" },
];

const countLinks = navLinks.length; // for transition delay calculation

interface MobileNavigationProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const MobileNavigation = ({ open, onOpenChange }: MobileNavigationProps) => {
	// Close menu on Escape key
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

	return (
		<nav className={`flex-none flex flex-col items-end transition-[gap] ${open ? "duration-300" : "duration-200"} [transition-timing-function:var(--ease-out)] ${open ? "gap-8" : "gap-0"}`}>
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
				className={`grid transition-[grid-template-rows] ${open ? "duration-300" : "duration-200"} [transition-timing-function:var(--ease-out)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
				inert={!open}>
				<ul
					id="mobile-menu"
					className="min-h-0 flex flex-col items-end gap-2"
					aria-label="Mobile Navigation">
					{navLinks.map((link, index) => (
						<li
							key={link.href}
							className={`transition-[opacity,transform] ${open ? "duration-300" : "duration-200"} [transition-timing-function:var(--ease-out)] ${
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-2 pointer-events-none"
							}`}
							style={{
								transitionDelay: open ? `${index * 60}ms` : "0ms",
							}}>
							<Button
								href={link.href}
								onClick={() => onOpenChange(false)}>
								{link.label}
							</Button>
						</li>
					))}
					<li
						className={`transition-[opacity,transform] ${open ? "duration-300" : "duration-200"} [transition-timing-function:var(--ease-out)] ${
							open
								? "opacity-100 translate-y-0"
								: "opacity-0 -translate-y-2 pointer-events-none"
						}`}
						style={{
							transitionDelay: open
								? `${(countLinks + 1) * 60}ms`
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const navLinks = [
    { label: "Home", href: "/" },
	{ label: "Projekte", href: "/projects" },
	{ label: "Über mich", href: "/about-me" },
];

const countLinks = navLinks.length; // for transition delay calculation

const MobileNavigation = () => {
	const [open, setOpen] = useState(false);

	// Close menu on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && open) {
				setOpen(false);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [open]);

	const buttonClasses = "bg-(--color-button-primary-bg) border-(--color-button-primary-stroke) border text-(--color-button-primary-label) shadow-(--shadow) hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active) active:scale-95 focus:outline-1 focus:outline-orange-300 h-11 flex-none label-md rounded-(--radius-button) corner-squircle inline-flex flex-row items-center justify-center transition-[background-color,border-color,color,transform] duration-150 cursor-pointer select-none px-4";

	const menuIcon = open ? X : Menu;

	return (
		<nav className="relative h-auto flex-none flex flex-col items-end gap-8">
			<Button
				variant="primary"
				content="iconOnly"
				aria-label={open ? "Menü schließen" : "Menü öffnen"}
				aria-expanded={open}
				aria-controls="mobile-menu"
				onClick={() => setOpen((prev) => !prev)}>
				<Icon icon={menuIcon} />
			</Button>

			<ul
				id="mobile-menu"
				className={`w-content flex flex-col items-end gap-2 ${open ? "visible" : "invisible"}`}
				aria-label="Mobile Navigation">
				{navLinks.map((link, index) => (
					<li
						key={link.href}
						className={`transition-[opacity,transform] duration-300 ease-out
                            ${
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-2 pointer-events-none"
							}`}
						style={{
							transitionDelay: open ? `${index * 100}ms` : "0ms",
						}}>
						<Link
							href={link.href}
							className={buttonClasses}
							onClick={() => setOpen(false)}>
							{link.label}
						</Link>
					</li>
				))}
				<li
					className={`transition-[opacity,transform] duration-300 ease-out
                            ${
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-2 pointer-events-none"
							}`}
					style={{
						transitionDelay: open
							? `${(countLinks + 1) * 100}ms`
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
		</nav>
	);
};

export default MobileNavigation;

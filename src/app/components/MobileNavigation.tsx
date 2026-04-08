"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

import { Menu, X, Mail } from "lucide-react";
import Icon from "./Icon";

const navLinks = [
    { label: "Home", href: "/" },
	{ label: "Projekte", href: "/projects" },
	{ label: "Über mich", href: "/about-me" },
];

const EMAIL = "hi@steffenaichele.xyz";

const countLinks = navLinks.length; // for transition delay calculation

const MobileNavigation = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const menuIcon = open ? X : Menu;

	return (
		<nav className="relative h-auto flex-none flex xl:hidden flex-col items-end gap-8">
			<Button
				variant="primary"
				content="iconOnly"
				onClick={() => setOpen((prev) => !prev)}>
				<Icon icon={menuIcon} />
			</Button>

			<ul
				className={`w-content flex flex-col items-end gap-2 ${open ? "visible" : "invisible"}`}
				aria-label="Mobile Navigation">
				{navLinks.map((link, index) => (
					<li
						key={link.href}
						className={`transition-all duration-300 ease-out 
                            ${
								open
									? "opacity-100 translate-y-0"
									: "opacity-0 -translate-y-2 pointer-events-none"
							}`}
						style={{
							transitionDelay: open ? `${index * 100}ms` : "0ms",
						}}>
						<Button
							variant="primary"
							content="text"
							onClick={() => {
								setOpen(false);
								if (link.href.startsWith("mailto:")) {
									window.location.href = link.href;
								} else {
									router.push(link.href);
								}
							}}>
							{link.label}
						</Button>
					</li>
				))}
				<li
					className={`transition-all duration-300 ease-out 
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
						onClick={() => navigator.clipboard.writeText(EMAIL)}>
						Kontakt
						<Icon icon={Mail} />
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default MobileNavigation;

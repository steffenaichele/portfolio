"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./Button";

const navLinks = [
	{ label: "Work", href: "#projects" },
	{ label: "CV", href: "#cv" },
	{ label: "Contact", href: "mailto:mail@steffen-aichele.de" },
];

const HamburgerIcon = ({ open }: { open: boolean }) => (
	<span className="flex flex-col justify-center items-center w-5 h-5 gap-1.5">
		<span
			className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${
				open ? "translate-y-1.75 rotate-45" : ""
			}`}
		/>
		<span
			className={`block h-px w-5 bg-current transition-all duration-300 ${
				open ? "opacity-0 scale-x-0" : ""
			}`}
		/>
		<span
			className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${
				open ? "-translate-y-1.75 -rotate-45" : ""
			}`}
		/>
	</span>
);

const Header = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed w-full xl:w-auto top-16 xl:inset-x-19 z-50 bg-(--foreground) xl:bg-transparent rounded-xl xl:rounded-none overflow-hidden">
			<div className="flex flex-row justify-between items-center pl-8 pr-4 h-14">
				<Link href="/" className="font-medium text-(--text-primary) text-lg">
					steffen aichele
				</Link>

				{/* Desktop nav */}
				<nav className="hidden xl:flex flex-row gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="label-sm text-(--text-tertiary) hover:text-(--text-primary) transition-colors duration-200"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Mobile hamburger */}
				<div className="xl:hidden">
					<Button
						variant="primary"
						content="iconOnly"
						onClick={() => setOpen((v) => !v)}
						aria-label={open ? "Menu schließen" : "Menu öffnen"}
					>
						<HamburgerIcon open={open} />
					</Button>
				</div>
			</div>

			{/* Mobile nav — expands inside header */}
			<div
				className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
					open ? "max-h-48" : "max-h-0"
				}`}
			>
				<nav className="px-8 pb-6 pt-2">
					<ul className="flex flex-col gap-1">
						{navLinks.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									onClick={() => setOpen(false)}
									className="block py-2 label-md text-(--text-secondary) hover:text-(--text-primary) transition-colors duration-200"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;

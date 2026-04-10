"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import Icon from "./Icon";
import Button from "./Button";
import LinkButton from "./LinkButton";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col gap-12 px-8 py-16 bg-(--color-footer-bg)">
			<div className="flex flex-col gap-0">
				<h2 className="text-(--color-footer-text-primary)">
					Steffen Aichele
				</h2>
				<p className="p-md text-(--color-footer-text-tertiary)">
					UX/UI Designer & Web Developer
				</p>
			</div>

			<div className="flex gap-4 justify-between items-center">
				<h3 className="text-(--color-footer-text-primary)">
					Get in Touch
				</h3>
				<Button
					content="iconRight"
					variant="primary"
					onClick={() => navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL ?? "")}>
					Holler at me
					<Icon icon={Mail} />
				</Button>
			</div>

			<nav aria-label="Footer-Navigation" className="flex gap-4">
				<div className="flex flex-col flex-1 gap-3">
					<h6 className="text-(--color-footer-text-tertiary)">
						Seiten
					</h6>
					<ul className="flex flex-col gap-1 text-(--color-footer-text-secondary)">
						<li>
							<LinkButton href="/">Home</LinkButton>
						</li>
						<li>
							<LinkButton href="/projects">Projekte</LinkButton>
						</li>
						<li>
							<LinkButton href="/about-me">Über mich</LinkButton>
						</li>
						<li>
							<LinkButton href="/imprint">Impressum</LinkButton>
						</li>
					</ul>
				</div>
				<div className="flex flex-col flex-1 gap-3">
					<h6 className="text-(--color-footer-text-tertiary)">
						Links
					</h6>
					<ul className="flex flex-col gap-1 text-(--color-footer-text-secondary)">
						<li>
							<LinkButton
								href="www.linkedin.com/in/steffenaichele"
								external
								hasIcon>
								LinkedIn
								<Icon icon={ArrowUpRight} />
							</LinkButton>
						</li>
						<li>
							<LinkButton
								href="https://github.com/steffenaichele"
								external
								hasIcon>
								GitHub
								<Icon icon={ArrowUpRight} />
							</LinkButton>
						</li>
					</ul>
				</div>
			</nav>

			<div className="flex flex-col md:flex-row wrap gap-1">
				<p className="p-sm text-(--color-footer-text-tertiary)">
					© 2026 Steffen Aichele - Alle Rechte vorbehalten.
				</p>
				<p className="p-sm text-(--color-footer-text-tertiary)">
					Built with Next.js & Tailwind CSS ✨
				</p>
			</div>
		</footer>
	);
};

export default Footer;

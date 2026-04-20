"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import Icon from "./Icon";
import Button from "./Button";
import LinkButton from "./LinkButton";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col gap-12 px-5 py-16 bg-(--color-footer-bg)">
			<div className="flex flex-col">
				<h2 className="xl-regular text-(--color-footer-text-primary)">
					Steffen Aichele
				</h2>
				<p className="sm-emphasized text-(--color-footer-text-secondary)">
					UX/UI Designer & Web Developer
				</p>
			</div>

			<div className="flex gap-4 justify-between items-center">
				<h3 className="md-regular text-(--color-footer-text-primary)">
					Get in Touch
				</h3>
				<Button
					content="iconRight"
					variant="primary"
					copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
					Holler at me
					<Icon icon={Mail} />
				</Button>
			</div>

			<nav aria-label="Footer-Navigation" className="flex gap-4">
				<div className="flex flex-col flex-1 gap-3">
					<h6 className="xs-emphasized uppercase text-(--color-footer-text-tertiary)">
						Seiten
					</h6>
					<ul className="flex flex-col gap-2 text-(--color-footer-text-primary)">
						<li>
							<LinkButton href="/">Home</LinkButton>
						</li>
						<li>
							<LinkButton href="/projects">Projekte</LinkButton>
						</li>
						<li>
							<LinkButton href="/cv">CV</LinkButton>
						</li>
						<li>
							<LinkButton href="/imprint">Impressum</LinkButton>
						</li>
					</ul>
				</div>
				<div className="flex flex-col flex-1 gap-3">
					<h6 className="xs-emphasized uppercase text-(--color-footer-text-tertiary)">
						Links
					</h6>
					<ul className="flex flex-col gap-2 text-(--color-footer-text-primary)">
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

			<div className="flex flex-col md:flex-row wrap text-(--color-footer-text-secondary)">
				<p className="xs-regular">
					© 2026 Steffen Aichele - Alle Rechte vorbehalten.
				</p>
				<p className="xs-regular">
					Built with Next.js & Tailwind CSS{" "}
					<span aria-hidden="true">✨</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;

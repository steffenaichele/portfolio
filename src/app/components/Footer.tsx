import Link from "next/link";
import Button from "./Button";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col gap-12 px-8 py-12 bg-(--color-footer-bg)">
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
				<Button content="text" variant="primary">
					Holler at me
				</Button>
			</div>

			<nav aria-label="Footer-Navigation" className="flex gap-4">
				<div>
					<h6>Seiten</h6>
					<ul>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div>
					<h6>Links</h6>
					<ul>
						<li>
							<Link
								href="https://linkedin.com/in/steffen-aichele"
								target="_blank"
								rel="noopener noreferrer"
								className="label-sm text-(--text-tertiary) hover:text-(--text-inverted) transition-colors duration-200">
								LinkedIn
							</Link>
						</li>
						<li>
							<Link
								href="https://github.com/steffenaichele"
								target="_blank"
								rel="noopener noreferrer"
								className="label-sm text-(--text-tertiary) hover:text-(--text-inverted) transition-colors duration-200">
								GitHub
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			<div className="flex flex-col gap-4">
				<p className="p-md text-(--color-footer-text-tertiary)">
					© 2026 Steffen Aichele - Alle Rechte vorbehalten.
				</p>
				<p className="p-md text-(--color-footer-text-tertiary)">
					Built with Next.js & Tailwind CSS
				</p>
			</div>
		</footer>
	);
};

export default Footer;

import Link from "next/link";
import Button from "./Button";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col gap-3 px-2 pb-8 bg-(--color-footer-bg)">
			<h2 className="text-(--color-footer-text-primary)">
				Steffen Aichele
			</h2>
			<p className="p-md text-(--color-footer-text-tertiary)">
				UX/UI Designer & Web Developer
			</p>

			<section>
				<h3 className="text-(--color-footer-text-primary)">
					Get in Touch
				</h3>
				<Button content="text" variant="primary" size="md">
					Holler at me
				</Button>
			</section>

			<nav className="flex flex-col xl:flex-row gap-4 xl:gap-8">
				<Link
					href="https://linkedin.com/in/steffen-aichele"
					target="_blank"
					rel="noopener noreferrer"
					className="label-sm text-(--text-tertiary) hover:text-(--text-inverted) transition-colors duration-200">
					LinkedIn
				</Link>
				<Link
					href="https://github.com/steffenaichele"
					target="_blank"
					rel="noopener noreferrer"
					className="label-sm text-(--text-tertiary) hover:text-(--text-inverted) transition-colors duration-200">
					GitHub
				</Link>
			</nav>

			<section>
				<p className="p-md text-(--color-footer-text-tertiary)">
					© 2026 Steffen Aichele - Alle Rechte vorbehalten.
				</p>
				<p className="p-md text-(--color-footer-text-tertiary)">
					Built with Next.js & Tailwind CSS
				</p>
			</section>
		</footer>
	);
};

export default Footer;

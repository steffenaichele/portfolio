import Link from "next/link";

const Footer = () => {
	return (
		<footer className="col-start-1 xl:col-start-2 -col-end-1 xl:-col-end-2 w-full bg-(--bg-footer) xl:rounded-3xl xl:my-4 px-8 py-10">
			<div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
				<div className="flex flex-col gap-2">
					<span className="text-(--text-inverted) font-medium text-lg">
						steffen aichele
					</span>
					<span className="label-sm text-(--text-tertiary)">
						UX/UI Designer & Full Stack Developer
					</span>
				</div>

				<nav className="flex flex-col xl:flex-row gap-4 xl:gap-8">
					<Link
						href="mailto:mail@steffen-aichele.de"
						className="label-sm text-(--text-tertiary) hover:text-(--text-inverted) transition-colors duration-200">
						mail@steffen-aichele.de
					</Link>
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

				<p className="label-sm text-(--text-tertiary)">
					© 2026 Steffen Aichele
				</p>
			</div>
		</footer>
	);
};

export default Footer;

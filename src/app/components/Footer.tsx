import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col gap-3 px-2 pb-8">
			<section className="bg-(--bg-footer) px-6 py-7 rounded-2xl ">
				<div className="flex flex-col gap-2">
					<span className="text-(--text-inverted) font-medium text-lg">
						steffen aichele
					</span>
					<span className="label-sm text-(--text-tertiary)">
						UX/UI Designer & Full Stack Developer
					</span>
				</div>
			</section>

			<section className="bg-(--bg-footer) px-6 py-7 rounded-2xl ">
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
			</section>

			<section className="bg-(--bg-footer) px-6 py-7 rounded-2xl ">
				<p className="label-sm text-(--text-tertiary)">
					© 2026 Steffen Aichele
				</p>
			</section>

		</footer>
	);
};

export default Footer;

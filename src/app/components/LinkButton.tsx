"use client";

import Link from "next/link";
import { ReactNode } from "react";

/**
 * LinkButton — a styled anchor using Next.js <Link>.
 *
 * Props:
 *   href      (required)  — destination URL, internal or external
 *   children  (required)  — button label / content
 *   hasIcon   (optional)  — adds right padding + gap for an icon, default false
 *   external  (optional)  — opens in new tab + sets rel="noopener noreferrer", default false
 *
 * Examples:
 *   <LinkButton href="/projects">View projects</LinkButton>
 *   <LinkButton href="/contact" hasIcon><ArrowRight />Get in touch</LinkButton>
 *   <LinkButton href="https://github.com/..." external>GitHub</LinkButton>
 *   <LinkButton href="https://behance.net/..." external hasIcon><ExternalLink />Behance</LinkButton>
 */

interface LinkButtonProps {
	href: string;
	hasIcon?: boolean;
	children: ReactNode;
	external?: boolean;
}

const LinkButton = ({
	href,
	hasIcon = false,
	children,
	external = false,
}: LinkButtonProps) => {
	const baseClasses =
		"h-7 inline-flex flex-row items-center justify-center label-md py-1 transition-all duration-150 select-none focus:outline-1 focus:outline-orange-300 focus:outline-offset-2 rounded";

	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className={`${baseClasses} ${hasIcon ? "gap-2" : ""}`}>
			{children}
			{external && (
				<span className="sr-only">(Opens in new window)</span>
			)}
		</Link>
	);
};

export default LinkButton;

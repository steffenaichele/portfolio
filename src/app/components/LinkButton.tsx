import Link from "next/link";
import { ReactNode } from "react";

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
		"inline-flex flex-row items-center justify-center transition-all duration-150 select-none";

	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className={`${baseClasses} ${hasIcon ? "pr-2 gap-2" : ""}`}>
			{children}
		</Link>
	);
};

export default LinkButton;

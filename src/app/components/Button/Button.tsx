"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { getExternalLinkProps, injectExternalSrOnly, Size, ContentType } from "../../lib/clickable";
import styles from "./Button.module.scss";

/**
 * Button — klickbares Element OHNE InteractionWrapper (reine Text-/Underline-Links,
 * z.B. Footer-Impressum-Link, Homepage-"Work"-Link). Trägt Underline selbst als
 * Hover-Feedback (crossfaded Linie), da hier keine Pille dafür da ist.
 *
 * Kinder: ausschließlich ein textrahmendes Element (z.B. <span>) und/oder <Icon>.
 * size + content bestimmen Höhe/Font-Größe/Gap; underline ist orthogonal dazu
 * und legt ein ::before/::after nur auf das Text-Element (nicht auf <Icon>).
 *
 * Für klickbare Elemente INNERHALB eines InteractionWrapper (Toggles, Tabs,
 * Nav, Icon-Buttons mit Pille) siehe Option.
 *
 * Props:
 *   children  (required)  — <span>Text</span> und/oder <Icon>
 *   size      (optional)  — "md" | "sm", default "md"
 *   content   (optional)  — "text" | "icon" | "iconText", default "text"
 *   underline (optional)  — dünne Underline auf dem Text-Kind (crossfaded bei Hover)
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *
 * Examples:
 *   <Button underline href="/imprint"><span>Impressum</span></Button>
 *   <Button underline href="https://github.com/…" external><span>GitHub</span><Icon icon={ArrowUpRight} /></Button>
 */

interface ButtonProps {
	size?: Size;
	content?: ContentType;
	underline?: boolean;
	external?: boolean;
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	"aria-label"?: string;
}

const Button = ({
	size = "md",
	content = "text",
	underline = false,
	external = false,
	children,
	href,
	onClick,
	className: classNameProp,
	disabled,
	type = "button",
	"aria-label": ariaLabel,
}: ButtonProps) => {
	const className = `${styles.base} ${styles[size]} ${styles[content]} ${underline ? styles.underline : ""} ${classNameProp ?? ""}`;

	const body = external ? injectExternalSrOnly(children, styles.srOnly) : children;

	if (href) {
		return (
			<Link
				href={href}
				onClick={onClick}
				aria-label={ariaLabel}
				{...getExternalLinkProps(external)}
				className={className}>
				{body}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			className={className}>
			{body}
		</button>
	);
};

export default Button;

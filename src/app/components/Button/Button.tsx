"use client";

import { AriaAttributes, ReactNode, Ref } from "react";
import Link from "next/link";
import { getExternalLinkProps, injectExternalSrOnly, Size, ContentType } from "../../lib/clickable";
import styles from "./Button.module.scss";

/**
 * Button — eigenständiges klickbares Element (ohne umgebende Gruppe).
 *
 * variant "plain" (default): reine Text-/Underline-Links, z.B. Footer-Impressum-
 * Link, Homepage-"Work"-Link. Trägt Underline selbst als Hover-Feedback
 * (crossfaded Linie).
 * variant "filled": gefüllte Pille mit eigenem Hover/Active — für einzelne
 * Action-Buttons (Modal-Close, externe Projekt-Links).
 *
 * Kinder: ausschließlich ein textrahmendes Element (z.B. <span>) und/oder <Icon>.
 * size + content bestimmen Höhe/Font-Größe/Gap/Padding; underline ist orthogonal
 * (nur plain) und legt ein ::before/::after nur auf das Text-Element (nicht auf <Icon>).
 *
 * Props:
 *   children  (required)  — <span>Text</span> und/oder <Icon>
 *   variant   (optional)  — "plain" | "filled" | "chopped", default "plain"
 *   size      (optional)  — "md" | "sm", default "md"
 *   content   (optional)  — "text" | "icon" | "iconText", default "text"
 *   underline (optional)  — dünne Underline auf dem Text-Kind (crossfaded bei Hover)
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *   ref, role, aria-*     — durchgereicht an das gerenderte Element
 *
 * Examples:
 *   <Button underline href="/imprint"><span>Impressum</span></Button>
 *   <Button variant="filled" size="sm" content="icon" aria-label="Schließen"><Icon icon={Close} /></Button>
 */

interface ButtonProps extends AriaAttributes {
	variant?: "plain" | "filled" | "chopped";
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
	ref?: Ref<HTMLAnchorElement | HTMLButtonElement>;
	role?: string;
}

const Button = ({
	variant = "plain",
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
	ref,
	role,
	...ariaProps
}: ButtonProps) => {
	const className = `${styles.base} ${variant === "plain" ? styles.plain : ""} ${variant === "filled" ? styles.filled : ""} ${variant === "chopped" ? styles.chopped : ""} ${styles[size]} ${styles[content]} ${underline ? styles.underline : ""} ${classNameProp ?? ""}`;

	const body = external ? injectExternalSrOnly(children, styles.srOnly) : children;

	if (href) {
		return (
			<Link
				ref={ref as Ref<HTMLAnchorElement>}
				href={href}
				onClick={onClick}
				role={role}
				{...ariaProps}
				{...getExternalLinkProps(external)}
				className={className}>
				{body}
			</Link>
		);
	}

	return (
		<button
			ref={ref as Ref<HTMLButtonElement>}
			type={type}
			onClick={onClick}
			disabled={disabled}
			role={role}
			{...ariaProps}
			className={className}>
			{body}
		</button>
	);
};

export default Button;

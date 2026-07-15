"use client";

import { AriaAttributes, ReactNode, Ref } from "react";
import Link from "next/link";
import { getExternalLinkProps, injectExternalSrOnly, Size, ContentType } from "../../lib/clickable";
import styles from "./Option.module.scss";

/**
 * Option — klickbares Element für den Einsatz INNERHALB eines InteractionWrapper.
 * KEIN eigener Hintergrund/Rundung/Active: Füllung, Rundung und Active/Hover
 * trägt die Pille des umgebenden InteractionWrapper. Eine "gefüllte" Option =
 * InteractionWrapper variant="primary" mit data-pill-rest am Kind (Ruhe-Pille
 * liegt permanent darunter).
 *
 * Kinder: ausschließlich ein textrahmendes Element (z.B. <span>) und/oder <Icon>.
 * size + content bestimmen Höhe/Font-Größe/Padding/Gap.
 *
 * Für klickbare Elemente OHNE InteractionWrapper siehe Button.
 *
 * Props:
 *   children  (required)  — <span>Text</span> und/oder <Icon>
 *   size      (optional)  — "md" | "sm", default "md"
 *   content   (optional)  — "text" | "icon" | "iconText", default "text"
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   copyToClipboard  (optional)  — Text, der bei Klick kopiert wird
 *   onCopySuccess    (optional)  — Callback nach erfolgreichem Kopieren (z.B. Toast)
 *   onCopyError      (optional)  — Callback bei fehlgeschlagenem Kopieren (z.B. Toast)
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *   data-pill-rest  (optional) — markiert dieses Kind als Ruhe-Ziel der Pille (Toggle/Selektion)
 *   role, aria-*     (optional) — durchgereicht an das gerenderte Element
 *
 * Examples:
 *   <InteractionWrapper><Option content="iconText"><span>Download</span><Icon icon={Download} /></Option></InteractionWrapper>
 *   <InteractionWrapper variant="primary"><Option data-pill-rest content="iconText"><span>Copy</span><Icon icon={Mail} /></Option></InteractionWrapper>
 */

interface OptionProps extends AriaAttributes {
	size?: Size;
	content?: ContentType;
	external?: boolean;
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	copyToClipboard?: string;
	onCopySuccess?: () => void;
	onCopyError?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	ref?: Ref<HTMLAnchorElement | HTMLButtonElement>;
	role?: string;
	// Markiert dieses Kind als Ruhe-Ziel der InteractionWrapper-Pille (Toggle/Selektion).
	"data-pill-rest"?: boolean;
}

const Option = ({
	size = "md",
	content = "text",
	external = false,
	children,
	href,
	onClick,
	copyToClipboard,
	onCopySuccess,
	onCopyError,
	className: classNameProp,
	disabled,
	type = "button",
	ref,
	role,
	"data-pill-rest": dataPillRest,
	...ariaProps
}: OptionProps) => {
	const className = `${styles.base} ${styles[size]} ${styles[content]} ${classNameProp ?? ""}`;

	const body = external ? injectExternalSrOnly(children, styles.srOnly) : children;

	if (href) {
		return (
			<Link
				ref={ref as Ref<HTMLAnchorElement>}
				href={href}
				onClick={onClick}
				role={role}
				{...ariaProps}
				data-pill-rest={dataPillRest ? "true" : undefined}
				{...getExternalLinkProps(external)}
				className={className}>
				{body}
			</Link>
		);
	}

	const handleCopyToClipboard = async () => {
		if (copyToClipboard && navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(copyToClipboard);
				onCopySuccess?.();
			} catch {
				onCopyError?.();
			}
		}
		onClick?.();
	};

	return (
		<button
			ref={ref as Ref<HTMLButtonElement>}
			type={type}
			onClick={handleCopyToClipboard}
			disabled={disabled}
			role={role}
			{...ariaProps}
			data-pill-rest={dataPillRest ? "true" : undefined}
			className={className}>
			{body}
		</button>
	);
};

export default Option;

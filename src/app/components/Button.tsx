"use client";

import { ReactNode, Ref, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

/**
 * Button — a styled button element.
 *
 * Props:
 *   children  (required)  — button label / content
 *   isLink    (optional)  — Link-Look statt gefülltem Button, default false
 *   content   (optional)  — "text" | "iconOnly" | "iconRight", default "text"
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *
 * Examples:
 *   <Button>Save</Button>
 *   <Button content="iconRight"><span>Download</span><Download /></Button>
 *   <Button isLink href="/imprint">Impressum</Button>
 *   <Button isLink href="https://github.com/…" external>GitHub</Button>
 *   <Button type="submit" disabled>Submitting…</Button>
 */

type Size = "md" | "sm";
type ContentType = "text" | "icon" | "iconRight";

interface ButtonProps {
	size?: Size;
	content?: ContentType;
	isLink?: boolean;
	external?: boolean;
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	copyToClipboard?: string;
	copySuccessMessage?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	ghost?: boolean;
	ref?: Ref<HTMLAnchorElement | HTMLButtonElement>;
	role?: string;
	"aria-label"?: string;
	"aria-selected"?: boolean;
	"aria-pressed"?: boolean;
	"aria-current"?: React.AriaAttributes["aria-current"];
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
	"aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
	// Markiert dieses Kind als Ruhe-Ziel der ActionWrapper-Pille (Toggle/Selektion).
	"data-pill-rest"?: boolean;
}

// Keine Rundung im Default-State: border-radius clippt das Pointer-Hit-Testing
// an den Ecken — die Pille des ActionWrapper würde dort flackern. Die Rundung
// trägt allein die Pille.
const sizeClasses: Record<Size, string> = {
	md: styles.md,
	sm: styles.sm,
};

const contentClasses: Record<Size, Record<ContentType, string>> = {
	md: {
		text: styles.mdText,
		icon: styles.mdIcon,
		iconRight: styles.mdIconRight,
	},
	sm: {
		text: styles.smText,
		icon: styles.smIcon,
		iconRight: styles.smIconRight,
	},
};

const Button = ({
	size = "md",
	content = "text",
	isLink = false,
	ghost = false,
	external = false,
	children,
	href,
	onClick,
	copyToClipboard,
	copySuccessMessage = "Copied to clipboard!",
	className: classNameProp,
	disabled,
	type = "button",
	ref,
	role,
	"aria-label": ariaLabel,
	"aria-selected": ariaSelected,
	"aria-pressed": ariaPressed,
	"aria-current": ariaCurrent,
	"aria-expanded": ariaExpanded,
	"aria-controls": ariaControls,
	"aria-haspopup": ariaHasPopup,
	"data-pill-rest": dataPillRest,
}: ButtonProps) => {
	// Inline-Feedback beim Clipboard-Kopieren: Label wechselt kurz auf die
	// Success-Message und springt nach einem Timeout zurück.
	const [copied, setCopied] = useState(false);
	const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
		},
		[],
	);

	// isLink folgt dem CVItem-Stil und ignoriert das size/content-Sizing der
	// gefüllten Buttons; ghost trägt eigene feste Tab-Maße.
	const variantClasses = isLink
		? styles.link
		: ghost
			? styles.ghost
			: `${sizeClasses[size]} ${contentClasses[size][content]} ${styles.primary}`;

	const className = `${styles.base} ${variantClasses} ${classNameProp ?? ""}`;

	// Underline-Affordance wie im CVItem: dünne Linie, die bei Hover auf 0 schrumpft.
	// inline-flex + gap: Text und optionales Icon (z.B. externer Link) bündig.
	const body = isLink ? (
		<span className={styles.underline}>{children}</span>
	) : (
		children
	);

	if (href) {
		return (
			<Link
				ref={ref as Ref<HTMLAnchorElement>}
				href={href}
				onClick={onClick}
				aria-label={ariaLabel}
				aria-current={ariaCurrent}
				data-pill-rest={dataPillRest ? "true" : undefined}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className={className}>
				{body}
				{external && (
					<span className={styles.srOnly}> (Opens in new window)</span>
				)}
			</Link>
		);
	}

	const handleCopyToClipboard = async () => {
		if (copyToClipboard && navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(copyToClipboard);
				setCopied(true);
				if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
				copyResetTimer.current = setTimeout(() => setCopied(false), 2000);
			} catch {
				// Kopieren fehlgeschlagen — kein Feedback.
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
			aria-label={ariaLabel}
			aria-selected={ariaSelected}
			aria-pressed={ariaPressed}
			aria-current={ariaCurrent}
			aria-expanded={ariaExpanded}
			aria-controls={ariaControls}
			aria-haspopup={ariaHasPopup}
			data-pill-rest={dataPillRest ? "true" : undefined}
			className={className}>
			{copied ? copySuccessMessage : body}
		</button>
	);
};

export default Button;

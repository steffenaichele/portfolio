"use client";

import { ReactNode, Ref, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

/**
 * Button — nacktes, klickbares Element. KEIN eigener Hintergrund/Rundung/Active:
 * Füllung, Rundung und Active/Hover trägt die Pille des umgebenden ActionWrapper.
 * Ein "gefüllter" Button = ActionWrapper variant="primary" mit data-pill-rest am
 * Kind (Ruhe-Pille liegt permanent darunter).
 *
 * Props:
 *   children  (required)  — button label / content
 *   size      (optional)  — "md" | "sm", default "md"
 *   content   (optional)  — "text" | "icon" | "iconRight", default "text"
 *   underline (optional)  — Link-Look: Label mit dünner Underline (collapsed bei Hover)
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *
 * Examples:
 *   <ActionWrapper><Button content="iconRight"><span>Download</span><Download /></Button></ActionWrapper>
 *   <ActionWrapper variant="primary"><Button data-pill-rest content="iconRight">Copy<Mail /></Button></ActionWrapper>
 *   <Button underline href="/imprint">Impressum</Button>
 *   <Button underline href="https://github.com/…" external>GitHub</Button>
 */

type Size = "md" | "sm";
type ContentType = "text" | "icon" | "iconRight";

interface ButtonProps {
	size?: Size;
	content?: ContentType;
	underline?: boolean;
	external?: boolean;
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	copyToClipboard?: string;
	copySuccessMessage?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
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
	underline = false,
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

	// underline folgt dem CVItem-Stil (kompakte Link-Maße, eigene Underline) und
	// ignoriert das size/content-Sizing; alle übrigen Buttons sind nackt und nutzen
	// das size/content-Raster — Füllung kommt aus der ActionWrapper-Pille.
	const variantClasses = underline
		? styles.link
		: `${sizeClasses[size]} ${contentClasses[size][content]}`;

	const className = `${styles.base} ${variantClasses} ${classNameProp ?? ""}`;

	// Underline-Affordance wie im CVItem: dünne Linie, die bei Hover auf 0 schrumpft.
	// inline-flex + gap: Text und optionales Icon (z.B. externer Link) bündig.
	const body = underline ? (
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

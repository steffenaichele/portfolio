"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";

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
	role?: string;
	"aria-label"?: string;
	"aria-selected"?: boolean;
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
}

// Gefüllter Standard-Button. Hover: Hintergrund wird transparent, damit die
// Hover-Pille der umgebenden ActionWrapper dahinter sichtbar wird. Kein eigener
// active-State — den trägt die Pille (sonst würde die fehlende Rundung sichtbar).
const primaryClasses =
	"bg-(--color-button-primary-bg) border-(--color-button-primary-stroke) border text-(--color-button-primary-label) shadow-[var(--shadow)] hover:bg-transparent focus-visible:outline-1 focus-visible:outline-orange-300 [&_svg]:text-(--color-button-primary-icon)";

// isLink: Spiegelt den CVItem-Look — kein Hintergrund, dünne Underline unter
// dem Label (collapsed bei Hover). Hover-Hintergrund liefert die Pille der
// umgebenden ActionWrapper. Kein Border, kein Shadow, kein Scale.
// Textfarbe wird vom Elternelement geerbt (Body = text-primary, Footer = hell),
// damit der Link sich an den jeweiligen Grund anpasst.
const linkClasses =
	"group font-medium focus-visible:outline-1 focus-visible:outline-orange-300";

// ghost: transparenter Button für Tab-artige Schalter (z.B. CV-Tabs). Eigene
// feste Tab-Maße statt size/content, damit die Optik dem früheren Tab entspricht.
// Active/Inactive-Textfarbe kommt per className vom Aufrufer; der Farb-Fade läuft
// über die color-Transition in baseClasses. Hover-Hintergrund liefert die Pille
// des umgebenden ActionWrapper.
const ghostClasses =
	"h-9 px-3 text-md font-medium text-nowrap hover:text-(--color-text-primary) focus-visible:outline-1 focus-visible:outline-orange-300";

// Keine Rundung im Default-State: border-radius clippt das Pointer-Hit-Testing
// an den Ecken — die Pille des ActionWrapper würde dort flackern. Die Rundung
// trägt allein die Pille.
const sizeClasses: Record<Size, string> = {
	md: "h-9 text-lg",
	sm: "h-6 text-sm text-medium",
};

const contentClasses: Record<Size, Record<ContentType, string>> = {
	md: {
		text: "px-4",
		icon: "px-3",
		iconRight: "pl-4 pr-3 gap-2",
	},
	sm: {
		text: "px-2.5",
		icon: "px-1.5",
		iconRight: "pl-2.5 pr-1.5 gap-1",
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
	role,
	"aria-label": ariaLabel,
	"aria-selected": ariaSelected,
	"aria-expanded": ariaExpanded,
	"aria-controls": ariaControls,
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

	const baseClasses =
		"flex-none inline-flex flex-row items-center justify-center transition-[background-color,color,transform,box-shadow] duration-150 [transition-timing-function:var(--ease-out)] cursor-pointer select-none";

	// isLink folgt dem CVItem-Stil und ignoriert das size/content-Sizing der
	// gefüllten Buttons; ghost trägt eigene feste Tab-Maße.
	const variantClasses = isLink
		? `px-3 py-1 text-md ${linkClasses}`
		: ghost
			? ghostClasses
			: `${sizeClasses[size]} ${contentClasses[size][content]} ${primaryClasses}`;

	const className = `${baseClasses} ${variantClasses} ${classNameProp ?? ""}`;

	// Underline-Affordance wie im CVItem: dünne Linie, die bei Hover auf 0 schrumpft.
	// inline-flex + gap: Text und optionales Icon (z.B. externer Link) bündig.
	const body = isLink ? (
		<span className="relative inline-flex items-center gap-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-(--color-link-underline) after:transition-[height] after:duration-150 after:ease-out motion-reduce:after:transition-none group-hover:after:h-0">
			{children}
		</span>
	) : (
		children
	);

	if (href) {
		return (
			<Link
				href={href}
				onClick={onClick}
				aria-label={ariaLabel}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className={className}>
				{body}
				{external && (
					<span className="sr-only"> (Opens in new window)</span>
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
			type={type}
			onClick={handleCopyToClipboard}
			disabled={disabled}
			role={role}
			aria-label={ariaLabel}
			aria-selected={ariaSelected}
			aria-expanded={ariaExpanded}
			aria-controls={ariaControls}
			className={className}>
			{copied ? copySuccessMessage : body}
		</button>
	);
};

export default Button;

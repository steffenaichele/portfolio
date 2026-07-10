"use client";

import { Children, cloneElement, isValidElement, ReactElement, ReactNode, Ref } from "react";
import Link from "next/link";
import Icon from "./Icon";
import styles from "./Button.module.scss";

/**
 * Button — nacktes, klickbares Element. KEIN eigener Hintergrund/Rundung/Active:
 * Füllung, Rundung und Active/Hover trägt die Pille des umgebenden InteractionWrapper.
 * Ein "gefüllter" Button = InteractionWrapper variant="primary" mit data-pill-rest am
 * Kind (Ruhe-Pille liegt permanent darunter).
 *
 * Kinder: ausschließlich ein textrahmendes Element (z.B. <span>) und/oder <Icon>.
 * size + content bestimmen Höhe/Font-Größe/Padding/Gap; underline ist orthogonal
 * dazu und legt ein ::before nur auf das Text-Element (nicht auf <Icon>).
 *
 * Props:
 *   children  (required)  — <span>Text</span> und/oder <Icon>
 *   size      (optional)  — "md" | "sm", default "md"
 *   content   (optional)  — "text" | "icon" | "iconText", default "text"
 *   underline (optional)  — dünne Underline auf dem Text-Kind (collapsed bei Hover)
 *   onClick   (optional)  — click handler
 *   external  (optional)  — öffnet href in neuem Tab + rel + sr-only Hinweis
 *   copyToClipboard  (optional)  — Text, der bei Klick kopiert wird
 *   onCopySuccess    (optional)  — Callback nach erfolgreichem Kopieren (z.B. Toast)
 *   onCopyError      (optional)  — Callback bei fehlgeschlagenem Kopieren (z.B. Toast)
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *
 * Examples:
 *   <InteractionWrapper><Button content="iconText"><span>Download</span><Icon icon={Download} /></Button></InteractionWrapper>
 *   <InteractionWrapper variant="primary"><Button data-pill-rest content="iconText"><span>Copy</span><Icon icon={Mail} /></Button></InteractionWrapper>
 *   <Button underline href="/imprint"><span>Impressum</span></Button>
 *   <Button underline href="https://github.com/…" external><span>GitHub</span><Icon icon={ArrowUpRight} /></Button>
 */

type Size = "md" | "sm";
type ContentType = "text" | "icon" | "iconText";

interface ButtonProps {
	size?: Size;
	content?: ContentType;
	underline?: boolean;
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
	"aria-label"?: string;
	"aria-selected"?: boolean;
	"aria-pressed"?: boolean;
	"aria-current"?: React.AriaAttributes["aria-current"];
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
	"aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
	// Markiert dieses Kind als Ruhe-Ziel der InteractionWrapper-Pille (Toggle/Selektion).
	"data-pill-rest"?: boolean;
}

// Keine Rundung im Default-State: border-radius clippt das Pointer-Hit-Testing
// an den Ecken — die Pille des InteractionWrapper würde dort flackern. Die Rundung
// trägt allein die Pille, size steuert nur Höhe/Font-Größe.
const sizeClasses: Record<Size, string> = {
	md: styles.md,
	sm: styles.sm,
};

// content nestet in SCSS unter size (Padding unterscheidet sich je Größe) —
// hier reicht die reine content-Klasse, sie trifft zusammen mit sizeClasses.
const contentClasses: Record<ContentType, string> = {
	text: styles.text,
	icon: styles.icon,
	iconText: styles.iconText,
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
	onCopySuccess,
	onCopyError,
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
	const className = `${styles.base} ${sizeClasses[size]} ${contentClasses[content]} ${underline ? styles.underline : ""} ${classNameProp ?? ""}`;

	// Text-Kind anpassen (Icon-Kind bleibt unverändert) — die Kind-Struktur
	// (Text-Element + optional <Icon>) bleibt dadurch immer exakt [Text, Icon],
	// sonst würde ein zusätzliches Geschwister-Element die :last-child/:not(svg)
	// CSS-Selektoren für Padding und Underline auf das falsche Kind lenken.
	const body = external
		? Children.map(children, (child) => {
				if (!isValidElement(child) || child.type === Icon) return child;
				const textChild = child as ReactElement<{ children?: ReactNode }>;
				return cloneElement(textChild, {
					children: (
						<>
							{textChild.props.children}
							<span className={styles.srOnly}> (Opens in new window)</span>
						</>
					),
				});
			})
		: children;

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
			aria-label={ariaLabel}
			aria-selected={ariaSelected}
			aria-pressed={ariaPressed}
			aria-current={ariaCurrent}
			aria-expanded={ariaExpanded}
			aria-controls={ariaControls}
			aria-haspopup={ariaHasPopup}
			data-pill-rest={dataPillRest ? "true" : undefined}
			className={className}>
			{body}
		</button>
	);
};

export default Button;

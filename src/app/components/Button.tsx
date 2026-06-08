"use client";

// clsx merges class strings conditionally.
// Usage: clsx("base-class", condition && "conditional-class", { "object-class": condition })
// Strings, arrays, and objects are all valid — falsy values are ignored.

import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { sileo } from "sileo";

/**
 * Button — a styled button element.
 *
 * Props:
 *   children  (required)  — button label / content
 *   variant   (optional)  — "primary", default "primary"
 *   content   (optional)  — "text" | "iconOnly" | "iconRight", default "text"
 *   onClick   (optional)  — click handler
 *   disabled  (optional)  — disables the button, default false
 *   type      (optional)  — "button" | "submit" | "reset", default "button"
 *
 * Examples:
 *   <Button>Save</Button>
 *   <Button content="iconRight"><span>Download</span><Download /></Button>
 *   <Button onClick={() => console.log("clicked")}>More</Button>
 *   <Button type="submit" disabled>Submitting…</Button>
 */

type Variant = "primary" | "cta" | "link";
type Size = "md" | "sm";
type ContentType = "text" | "icon" | "iconRight";

interface ButtonProps {
	variant?: Variant;
	size?: Size;
	content?: ContentType;
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	copyToClipboard?: string;
	copySuccessMessage?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	"aria-label"?: string;
	"aria-expanded"?: boolean;
	"aria-controls"?: string;
}

const variantClasses: Record<Variant, string> = {
	primary:
		"bg-(--color-button-primary-bg) border-(--color-button-primary-stroke) border text-(--color-button-primary-label) shadow-[var(--shadow)] hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active) active:scale-[0.97] focus-visible:outline-1 focus-visible:outline-orange-300 [&_svg]:text-(--color-button-primary-icon)",
	cta:
		"bg-(--color-button-cta-bg) border-(--color-button-cta-stroke) text-(--color-button-cta-label) shadow-[var(--shadow)] hover:bg-(--color-button-cta-bg-hover) hover:text-(--color-button-cta-label-hover) active:bg-(--color-button-cta-bg-active) active:scale-[0.97] active:text-(--color-button-cta-label-active) focus-visible:outline-1 focus-visible:outline-orange-300 [&_svg]:text-(--color-button-cta-icon)",
	// Spiegelt den CVItem-Look: dünne Underline (collapsed bei Hover) + Surface-
	// Pill-Hintergrund auf Hover/Active. Kein Border, kein Shadow, kein Scale.
	link:
		"group text-(--color-text-primary) font-medium hover:bg-(--color-surface-bg-hover) active:bg-(--color-surface-bg-active) focus-visible:outline-1 focus-visible:outline-orange-300",
};

const sizeClasses: Record<Size, string> = {
	md: "h-9 text-lg rounded-(--radius-button-md)",
	sm: "h-6 text-sm text-medium rounded-(--radius-button-sm)",
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
	variant = "primary",
	size = "md",
	content = "text",
	children,
	href,
	onClick,
	copyToClipboard,
	copySuccessMessage = "Copied to clipboard!",
	className: classNameProp,
	disabled,
	type = "button",
	"aria-label": ariaLabel,
	"aria-expanded": ariaExpanded,
	"aria-controls": ariaControls,
}: ButtonProps) => {
	const baseClasses =
		"flex-none inline-flex flex-row items-center justify-center transition-[background-color,transform,box-shadow] duration-150 [transition-timing-function:var(--ease-out)] cursor-pointer select-none";

	const isLink = variant === "link";

	const className = clsx(
		baseClasses,
		// link folgt dem CVItem-Stil (plain rounded, kein Squircle) und ignoriert
		// das size/content-Sizing der gefüllten Buttons.
		isLink
			? "corner-round rounded-(--radius-tab) px-3 py-1 text-md"
			: clsx("corner-squircle", sizeClasses[size], contentClasses[size][content]),
		variantClasses[variant],
		classNameProp,
	);

	// Underline-Affordance wie im CVItem: dünne Linie, die bei Hover auf 0 schrumpft.
	const body = isLink ? (
		<span className="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-(--color-link-underline) after:transition-[height] after:duration-150 after:ease-out motion-reduce:after:transition-none group-hover:after:h-0">
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
				className={className}>
				{body}
			</Link>
		);
	}

	const handleCopyToClipboard = async () => {
		if (copyToClipboard) {
			if (!navigator.clipboard) {
				sileo.error({ title: "Failed to copy to clipboard." });
			} else {
				try {
					await navigator.clipboard.writeText(copyToClipboard);
					sileo.success({ title: copySuccessMessage });
				} catch {
					sileo.error({ title: "Failed to copy to clipboard." });
				}
			}
		}
		onClick?.();
	};

	return (
		<button
			type={type}
			onClick={handleCopyToClipboard}
			disabled={disabled}
			aria-label={ariaLabel}
			aria-expanded={ariaExpanded}
			aria-controls={ariaControls}
			className={className}>
			{body}
		</button>
	);
};

export default Button;

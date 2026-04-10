"use client";

import { ReactNode } from "react";

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

type Variant = "primary" | "cta";
type ContentType = "text" | "iconOnly" | "iconRight";

interface ButtonProps {
	variant?: Variant;
	content?: ContentType;
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const variantClasses: Record<Variant, string> = {
	primary:
		"bg-(--color-button-primary-bg) border-(--color-button-primary-stroke) border-1 text-(--color-button-primary-label) shadow-(--shadow) hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active) active:scale-95 focus:outline-1 focus:outline-orange-300",
	cta: 
		"bg-(--color-button-cta-bg) border-(--color-button-cta-stroke) text-(--color-button-cta-label) shadow-(--shadow) hover:bg-(--color-button-cta-bg-hover) hover:text-(--color-button-cta-label-hover) active:bg-(--color-button-cta-bg-active) active:scale-95 active:text-(--color-button-cta-label-active) focus:outline-1 focus:outline-orange-300",
};

const contentClasses: Record<ContentType, string> = {
	text: "px-5",
	iconOnly: "px-4",
	iconRight: "pr-4 pl-5 gap-3",
};

const Button = ({
	variant = "primary",
	content = "text",
	children,
	onClick,
	disabled,
	type = "button",
}: ButtonProps) => {
	const baseClasses =
		"h-11 flex-none label-md rounded-(--radius-squircle-lg) corner-squircle inline-flex flex-row items-center justify-center transition-all duration-150 cursor-pointer select-none";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${contentClasses[content]} ${variantClasses[variant]}`}>
			{children}
		</button>
	);
};

export default Button;

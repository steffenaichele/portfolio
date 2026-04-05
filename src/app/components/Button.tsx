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

type Variant = "primary";
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
		"bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-label)] hover:bg-[var(--color-button-primary-bg-hover)] active:bg-[var(--color-button-primary-bg-hover-active)] focus:outline-1 focus:outline-orange-300",
	// secondary:
	// 	"bg-[var(--button-bg-secondary)] text-[var(--button-label-secondary)] hover:bg-[var(--button-bg-secondary-hover)] active:bg-[var(--button-bg-secondary-active)] focus:outline-2 focus:outline-orange-300",
};

const contentClasses: Record<ContentType, string> = {
	text: "px-4",
	iconOnly: "px-4",
	iconRight: "pr-2 pl-4 gap-2",
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
		"h-11 label-md rounded-2xl corner-squircle inline-flex flex-row items-center justify-center transition-all duration-150 cursor-pointer select-none";

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

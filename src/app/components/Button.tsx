import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";
type ContentType = "text" | "iconOnly" | "iconLeft" | "iconRight";

interface ButtonProps {
	variant?: Variant;
	size?: Size;
	content?: ContentType;
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const variantClasses: Record<Variant, string> = {
	primary:
		"bg-[var(--button-bg-primary)] text-[var(--button-label-primary)] hover:bg-[var(--button-bg-primary-hover)] active:bg-[var(--button-bg-primary-active)] focus:outline-2 focus:outline-orange-300",
	secondary:
		"bg-[var(--button-bg-secondary)] text-[var(--button-label-secondary)] hover:bg-[var(--button-bg-secondary-hover)] active:bg-[var(--button-bg-secondary-active)] focus:outline-2 focus:outline-orange-300",
	ghost: 
		"bg-[var(--button-bg-ghost)] text-[var(--button-label-ghost)] hover:text-[var(--button-label-ghost-hover)] active:bg-[var(--button-bg-ghost-active)] focus:outline-2 focus:outline-orange-300",
};

const sizeClasses: Record<Size, string> = {
	sm: "h-7 px-3 py-1 label-sm",
	md: "h-9 px-4 label-md",
};

const contentClasses: Record<ContentType, string> = {
	text: "",
	iconOnly: "",
	iconLeft: "pl-2 gap-2",
	iconRight: "pr-2 gap-2",
};

const Button = ({
	variant = "primary",
	size = "md",
	content = "text",
	children,
	onClick,
	disabled,
	type = "button",
}: ButtonProps) => {
	const baseClasses =
		"rounded-lg corner-squircle inline-flex flex-row items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none select-none";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${sizeClasses[size]} ${contentClasses[content]} ${variantClasses[variant]}`}>
			{children}
		</button>
	);
};

export default Button;

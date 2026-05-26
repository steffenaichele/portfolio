import clsx from "clsx";

interface TabProps {
	children: React.ReactNode;
	isActive?: boolean;
	onClick?: () => void;
}

const Tab = ({ children, isActive = false, onClick }: TabProps) => {
	return (
		<button
			role="tab"
			aria-selected={isActive}
			onClick={onClick}
			className={clsx(
				"h-7 px-2 rounded-[var(--radius-button-sm)] corner-squircle text-md text-nowrap bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] hover:text-[var(--color-text-secondary)] hover:shadow-[var(--shadow-soft)] active:bg-[var(--color-surface-bg-active)] transition-colors duration-150",
				isActive
					? "text-[var(--color-text-secondary)]"
					: "text-[var(--color-text-tertiary)]",
			)}>
			{children}
		</button>
	);
};

export default Tab;

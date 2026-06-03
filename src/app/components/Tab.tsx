import clsx from "clsx";

interface TabProps {
	children: React.ReactNode;
	isActive?: boolean;
	onClick?: () => void;
}

const Tab = ({ children, isActive = false, onClick }: TabProps) => {
	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			onClick={onClick}
			className={clsx(
				"tab relative h-7 px-3 rounded-[var(--radius-tab)] text-md font-medium text-nowrap hover:text-[var(--color-text-primary)] hover:cursor-pointer active:bg-[var(--color-tab-bg-active)] transition-colors duration-150",
				isActive
					? "text-[var(--color-text-secondary)]"
					: "text-[var(--color-text-tertiary)]",
			)}>
			{children}
		</button>
	);
};

export default Tab;

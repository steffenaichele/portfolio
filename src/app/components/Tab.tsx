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
			// Keine Rundung und kein active:bg im Default-State — Rundung und
			// Active-Farbe trägt die Pille des umgebenden ActionWrapper.
			className={clsx(
				"relative h-7 px-3 text-md font-medium text-nowrap hover:text-[var(--color-text-primary)] hover:cursor-pointer transition-colors duration-150",
				isActive
					? "text-[var(--color-text-secondary)]"
					: "text-[var(--color-text-tertiary)]",
			)}>
			{children}
		</button>
	);
};

export default Tab;

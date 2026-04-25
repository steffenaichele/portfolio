import type { ReactNode } from 'react';

interface TagProps {
	children: ReactNode;
}

export function Tag({ children }: TagProps) {
	return (
		<span className="text-base px-4 py-2 bg-white rounded-full corner-squircle border border-badge-stroke shadow-[var(--shadow-soft)] text-[var(--color-text-secondary)]">
			{children}
		</span>
	);
}

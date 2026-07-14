"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "@remixicon/react";
import Icon from "./Icon";
import styles from "./ToastNotification.module.scss";

/**
 * ToastNotification — app-weite Toast-Benachrichtigungen. ToastProvider einmal
 * root-nah mounten (layout.tsx); jede Komponente ruft danach useToast() auf.
 *
 * Beispiel:
 *   const { showToast } = useToast();
 *   showToast("E-Mail kopiert", "success");
 */

type ToastVariant = "success" | "error";

interface ToastData {
	id: number;
	message: string;
	variant: ToastVariant;
}

interface ToastContextValue {
	showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within a ToastProvider");
	return ctx;
};

const AUTO_DISMISS_MS = 4000;

// Dauer der Exit-Transition (siehe ToastNotification.module.scss) — gleiches
// Ausleseverfahren wie ImprintModal/ImpressionCard beim Modal-Close.
const closeDurationMs = () =>
	parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--duration-state",
		),
	) || 150;

const icons: Record<ToastVariant, typeof RiCheckboxCircleLine> = {
	success: RiCheckboxCircleLine,
	error: RiCloseCircleLine,
};

const ToastItem = ({
	toast,
	onDone,
}: {
	toast: ToastData;
	onDone: (id: number) => void;
}) => {
	const [phase, setPhase] = useState<"entering" | "open" | "closing">(
		"entering",
	);

	// Enter: doppeltes rAF wie bei den Modals, damit der Browser den
	// Ausgangszustand committet, bevor die "open"-Transition startet.
	useEffect(() => {
		let raf2 = 0;
		const raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => setPhase("open"));
		});
		const dismissTimer = setTimeout(() => setPhase("closing"), AUTO_DISMISS_MS);
		return () => {
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
			clearTimeout(dismissTimer);
		};
	}, []);

	useEffect(() => {
		if (phase !== "closing") return;
		const removeTimer = setTimeout(() => onDone(toast.id), closeDurationMs());
		return () => clearTimeout(removeTimer);
	}, [phase, toast.id, onDone]);

	return (
		<div
			className={`${styles.toast} ${styles[toast.variant]} ${
				phase === "open" ? styles.open : ""
			} ${phase === "closing" ? styles.closing : ""}`}>
			<Icon icon={icons[toast.variant]} />
			<span>{toast.message}</span>
		</div>
	);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<ToastData[]>([]);
	const nextId = useRef(0);

	const showToast = useCallback(
		(message: string, variant: ToastVariant = "success") => {
			nextId.current += 1;
			setToasts((prev) => [...prev, { id: nextId.current, message, variant }]);
		},
		[],
	);

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div role="status" aria-live="polite" className={styles.viewport}>
				{toasts.map((toast) => (
					<ToastItem key={toast.id} toast={toast} onDone={removeToast} />
				))}
			</div>
		</ToastContext.Provider>
	);
};

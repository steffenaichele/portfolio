"use client";

import { useRef, useState, useEffect, useEffectEvent } from "react";

/**
 * useZoomModal — headless Verhalten eines Zoom-Modals (Öffnen/Schließen mit
 * Timing über --duration-state, Escape-to-close, Body-Scroll-Lock, Focus-Trap).
 *
 * Bewusst ohne Markup: Die ImpressionCard-Shell verdrahtet die zurückgegebenen
 * Refs/Handler an Trigger, Backdrop und Panel. So bleibt das Verhalten von der
 * Darstellung getrennt und ist später gegen z.B. Inline-Aufklappen austauschbar,
 * ohne die Content-Kompositionen anzufassen.
 *
 * Rückgabe:
 *   mounted     — ob das Panel im DOM ist (steuert Rendering + aria-expanded)
 *   open/close  — Panel öffnen/schließen (close spielt die Close-Transition ab)
 *   triggerRef  — Button, der öffnet (Fokus kehrt beim Schließen hierher zurück)
 *   modalRef    — Panel-Element (Focus-Trap + is-open/is-closing-Klassen)
 *   backdropRef — Backdrop-Element (is-open/is-closing-Klassen)
 */
export function useZoomModal() {
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const close = () => {
		const modal = modalRef.current;
		const backdrop = backdropRef.current;
		if (!modal) return;

		const closeDurationMs =
			parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue(
					"--duration-state",
				),
			) || 150;

		modal.classList.remove("is-open");
		modal.classList.add("is-closing");
		backdrop?.classList.remove("is-open");
		backdrop?.classList.add("is-closing");

		setTimeout(() => {
			modal.classList.remove("is-closing");
			backdrop?.classList.remove("is-closing");
			setMounted(false);
			triggerRef.current?.focus();
		}, closeDurationMs);
	};

	const open = () => {
		setMounted(true);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				modalRef.current?.classList.add("is-open");
				backdropRef.current?.classList.add("is-open");
			});
		});
	};

	const handleEscape = useEffectEvent(() => {
		if (mounted) close();
	});

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleEscape();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		document.body.style.overflow = mounted ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mounted]);

	// Focus trap
	useEffect(() => {
		if (!mounted) return;
		const modal = modalRef.current;
		if (!modal) return;

		const getFocusable = () =>
			Array.from(
				modal.querySelectorAll<HTMLElement>(
					'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
				),
			);

		const rafId = requestAnimationFrame(() => {
			getFocusable()[0]?.focus();
		});

		const trap = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;
			const focusable = getFocusable();
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last?.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first?.focus();
			}
		};

		modal.addEventListener("keydown", trap);
		return () => {
			cancelAnimationFrame(rafId);
			modal.removeEventListener("keydown", trap);
		};
	}, [mounted]);

	return { mounted, open, close, triggerRef, modalRef, backdropRef };
}

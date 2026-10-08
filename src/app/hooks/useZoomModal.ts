"use client";

import { useRef, useState, useEffect } from "react";

/**
 * useZoomModal — Verhalten eines Zoom-Modals auf Basis von <dialog>.
 *
 * Escape-to-close, Focus-Trap, Fokus-Rückgabe an den Trigger, Inertisierung des
 * Hintergrunds und die Top-Layer-Platzierung liefert showModal() nativ; Öffnen/
 * Schließen animiert CSS über @starting-style + transition-behavior:allow-discrete
 * (styles/_modal.scss). Übrig bleibt hier nur das, was die Plattform NICHT gibt:
 * der Body-Scroll-Lock und der Zustand für aria-expanded.
 *
 * Rückgabe:
 *   isOpen      — Dialog offen (steuert aria-expanded)
 *   open/close  — Dialog öffnen/schließen
 *   dialogRef   — an das <dialog>-Element hängen
 */
export function useZoomModal() {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const open = () => {
		dialogRef.current?.showModal();
		setIsOpen(true);
	};
	const close = () => dialogRef.current?.close();

	// Escape und Light-Dismiss (closedby="any") schließen am close()-Handler
	// vorbei — false kommt deshalb vom nativen close-Event, nicht aus close().
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const onClose = () => setIsOpen(false);
		dialog.addEventListener("close", onClose);
		return () => dialog.removeEventListener("close", onClose);
	}, []);

	// Einziges Verhalten, das <dialog> nicht mitbringt: die Seite dahinter
	// scrollt sonst weiter.
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return { isOpen, open, close, dialogRef };
}

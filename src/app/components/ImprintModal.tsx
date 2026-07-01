"use client";

import { useState, useRef, useEffect, useEffectEvent } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import Icon from "./Icon";

// Impressum als Modal (keine eigene Route mehr). Modal-Mechanik gespiegelt von
// ImpressionCard: t-modal/-backdrop-Klassen (globals.css), Escape, Body-Scroll-Lock,
// Focus-Trap, Fokus-Rückgabe an den Trigger.
const ImprintModal = () => {
	const t = useTranslations("impressum");
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

	const closeModal = () => {
		const modal = modalRef.current;
		const backdrop = backdropRef.current;
		if (!modal) return;

		const closeMs =
			parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue(
					"--modal-close-dur",
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
		}, closeMs);
	};

	const openModal = () => {
		setMounted(true);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				modalRef.current?.classList.add("is-open");
				backdropRef.current?.classList.add("is-open");
			});
		});
	};

	const handleEscape = useEffectEvent(() => {
		if (mounted) closeModal();
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

	return (
		<>
			<Button
				ref={triggerRef}
				isLink
				onClick={openModal}
				aria-haspopup="dialog"
				aria-expanded={mounted}>
				{t("page_title")}
			</Button>

			{mounted && (
				<>
					{/* Backdrop */}
					<button
						ref={backdropRef}
						type="button"
						tabIndex={-1}
						aria-label={t("close")}
						onClick={closeModal}
						className="t-modal-backdrop fixed inset-0 z-50 bg-black/60 cursor-default w-full h-full border-none"
					/>

					{/* Panel */}
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-label={t("page_title")}
						className="t-modal fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--color-surface-bg)] shadow-[var(--shadow)] overflow-hidden">
						{/* Close button */}
						<div className="flex justify-end p-3">
							<ActionWrapper>
								<Button
									size="sm"
									content="icon"
									aria-label={t("close")}
									onClick={closeModal}>
									<Icon icon={X} />
								</Button>
							</ActionWrapper>
						</div>

						{/* Imprint content */}
						<div className="flex flex-col gap-6 px-6 pb-8">
							<h2 className="text-2xl text-[var(--color-text-primary)]">
								{t("page_title")}
							</h2>
							<div className="text-[var(--color-text-tertiary)]">
								<p className="mb-4">{t("legal_notice")}</p>
								<address className="not-italic">
									<p>Steffen Aichele</p>
									<p>Lönsstraße 4</p>
									<p>73529 Schwäbisch Gmünd</p>
								</address>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ImprintModal;

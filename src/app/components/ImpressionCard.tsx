"use client";

import { useState, useRef, useEffect, useEffectEvent } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";

import Button from "./Button";
import Icon from "./Icon";
import type { Impression, Project } from "../data/content";

interface ImpressionCardProps {
	impression: Impression;
	project?: Project;
}

const ImpressionCard = ({ impression }: ImpressionCardProps) => {
	const t = useTranslations('impressions');
	const messages = useMessages() as { impressions?: { items?: Record<string, { label: string; context: string; alt: string }> } };
	const itemMessages = messages.impressions?.items?.[impression.id];
	const label = itemMessages?.label ?? impression.label;
	const context = itemMessages?.context ?? impression.context;
	const alt = itemMessages?.alt ?? impression.alt;
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

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

		const getFocusable = () => Array.from(
			modal.querySelectorAll<HTMLElement>(
				'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
			)
		);

		const rafId = requestAnimationFrame(() => {
			getFocusable()[0]?.focus();
		});

		const trap = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
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

		modal.addEventListener('keydown', trap);
		return () => {
			cancelAnimationFrame(rafId);
			modal.removeEventListener('keydown', trap);
		};
	}, [mounted]);

	return (
		<>
			{/* Card */}
			<div
				className={`relative ${impression.square ? "aspect-square col-span-4 md:col-span-1" : "aspect-3/2 col-span-4 md:col-span-2"} group cursor-pointer bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] rounded-[var(--radius-surface)] corner-squircle shadow-[var(--shadow-soft)] origin-center transition-transform duration-300 ease-out hover:scale-101 overflow-hidden`}>
				<div className="h-10 flex px-4 pt-4 pb-0">
					<div className="grow h-6 px-2 flex flex-wrap items-center gap-x-1 gap-y-0.5">
						<p className="text-sm text-[var(--color-text-secondary)]">
							{label}
						</p>
						<p className="text-sm text-[var(--color-text-tertiary)]">
							{" · "}
						</p>
						<p className="text-sm text-[var(--color-text-tertiary)]">
							{context}
						</p>
					</div>
					{impression.link && (
						<Button
							href={impression.link}
							size="sm"
							content="icon"
							aria-label={t("open_label", { label })}>
							<Icon icon={ArrowRight} />
						</Button>
					)}
				</div>

				{/* Image – click opens modal */}
				<Image
					src={`/impressions/${impression.src}`}
					alt={alt}
					fill
					sizes="(max-width: 1024px) 50vw, 25vw"
					className="mt-12 p-2 object-top object-contain transition-transform group-hover:scale-103"
				/>
				<button
					ref={triggerRef}
					onClick={openModal}
					className="absolute cursor-pointer inset-0 w-full h-full"
					aria-label={t("zoom_label", { label })}
					aria-expanded={mounted}
					aria-haspopup="dialog"
				/>
			</div>

			{/* Modal */}
			{mounted && (
				<>
					{/* Backdrop */}
					<button
						ref={backdropRef}
						type="button"
						tabIndex={-1}
						aria-label={t("modal_close")}
						onClick={closeModal}
						className="t-modal-backdrop fixed inset-0 z-50 bg-black/60 cursor-default w-full h-full border-none"
					/>

					{/* Panel */}
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-label={label}
						className="t-modal fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] corner-squircle shadow-[var(--shadow)] overflow-hidden">
						{/* Close button */}
						<Button
							variant="primary"
							size="sm"
							content="icon"
							aria-label={t("modal_close")}
							onClick={closeModal}>
							<Icon icon={X} />
						</Button>

						{/* Image */}
						<div
							className={`relative w-full ${impression.square ? "aspect-square" : "aspect-3/2"}`}>
							<Image
								src={`/impressions/${impression.src}`}
								alt={alt}
								fill
								sizes="(max-width: 768px) 100vw, 448px"
								className="object-contain"
							/>
						</div>

						{/* Info */}
						<div className="flex flex-col gap-3 p-5">
							<div className="flex flex-col gap-0.5">
								<p className="text-md font-medium text-[var(--color-text-primary)]">
									{label}
								</p>
								<p className="text-xs text-[var(--color-text-tertiary)]">
									{context}
								</p>
							</div>
							{impression.link && (
								<Button
									href={impression.link}
									size="sm"
									content="icon"
									aria-label={t("external_label", { label })}>
									{t("open_button")}
									<Icon icon={ArrowRight} />
								</Button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ImpressionCard;

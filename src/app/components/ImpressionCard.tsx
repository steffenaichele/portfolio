"use client";

import { useState, useRef, useEffect, useEffectEvent } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";

import Button from "./Button";
import Icon from "./Icon";
import type { Impression } from "../data/impressions";

interface ImpressionCardProps {
	impression: Impression;
}

const ImpressionCard = ({ impression }: ImpressionCardProps) => {
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

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

	return (
		<>
			{/* Card */}
			<div
				className={`flex justify-center items-center ${impression.square ? "aspect-square col-span-4 md:col-span-1" : "aspect-3/2 col-span-4 md:col-span-2"} group cursor-pointer`}>
				<button
					onClick={openModal}
					className="relative w-full h-full overflow-hidden bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] rounded-[var(--radius-surface)] corner-squircle shadow-[var(--shadow-soft)] origin-center transition-transform duration-300 ease-out hover:scale-101"
					aria-label={`${impression.label} vergrößern`}>
					{/* Info bar – reveals on group-hover via grid resize (01) */}
					<div className="h-10 flex px-5 py-4">
						<div className="flex flex-wrap gap-x-1 gap-y-0.5">
							<p className="text-xs text-[var(--color-text-secondary)]">
								{impression.label}
							</p>
							<p className="text-xs text-[var(--color-text-tertiary)]">
								{" · "}
							</p>
							<p className="text-xs text-[var(--color-text-tertiary)]">
								{impression.context}
							</p>
						</div>
						{impression.link && (
							<Button
								href={impression.link}
								size="sm"
								content="icon"
								aria-label={`${impression.label} öffnen`}>
								<Icon icon={ArrowRight} />
							</Button>
						)}
					</div>

					{/* Image – click opens modal */}
					<Image
						src={`/impressions/${impression.src}`}
						alt={impression.alt}
						fill
						sizes="(max-width: 1024px) 50vw, 25vw"
						className="object-contain transition-transform group-hover:scale-105"
					/>
				</button>
			</div>

			{/* Modal */}
			{mounted && (
				<>
					{/* Backdrop */}
					<div
						ref={backdropRef}
						onClick={closeModal}
						className="t-modal-backdrop fixed inset-0 z-50 bg-black/60"
					/>

					{/* Panel */}
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-label={impression.label}
						className="t-modal fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--color-surface-bg)] rounded-[var(--radius-surface)] corner-squircle shadow-[var(--shadow)] overflow-hidden">
						{/* Close button */}
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-[var(--color-button-primary-bg-hover)] transition-colors focus:outline-1 focus:outline-orange-300"
							aria-label="Schließen">
							<X size={16} strokeWidth={1.5} />
						</button>

						{/* Image */}
						<div
							className={`relative w-full ${impression.square ? "aspect-square" : "aspect-3/2"}`}>
							<Image
								src={`/impressions/${impression.src}`}
								alt={impression.alt}
								fill
								sizes="(max-width: 768px) 100vw, 448px"
								className="object-contain"
							/>
						</div>

						{/* Info */}
						<div className="flex flex-col gap-3 p-5">
							<div className="flex flex-col gap-0.5">
								<p className="text-md font-medium text-[var(--color-text-primary)]">
									{impression.label}
								</p>
								<p className="text-xs text-[var(--color-text-tertiary)]">
									{impression.context}
								</p>
							</div>
							{impression.link && (
								<Button
									href={impression.link}
									size="sm"
									content="icon"
									aria-label={`${impression.label} extern öffnen`}>
									Öffnen
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

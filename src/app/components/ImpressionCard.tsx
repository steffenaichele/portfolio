"use client";

import { useState, useRef, useEffect, useEffectEvent } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

import Button from "./Button";
import ActionWrapper from "./ActionWrapper";
import Icon from "./Icon";
import type { Impression } from "../data/content";
import styles from "./ImpressionCard.module.scss";

interface ImpressionCardProps {
	impression: Impression;
}

const ImpressionCard = ({ impression }: ImpressionCardProps) => {
	const t = useTranslations("impressions");
	const label = t(`items.${impression.id}.label`);
	const context = t(`items.${impression.id}.context`);
	const alt = t(`items.${impression.id}.alt`);
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
				className={`${styles.card} ${impression.square ? styles.square : styles.wide}`}>
				<div className={styles.header}>
					<div className={styles.labelWrap}>
						<p className={styles.label}>{label}</p>
						<p className={styles.contextText}>{" · "}</p>
						<p className={styles.contextText}>{context}</p>
					</div>
					{impression.link && (
						<ActionWrapper>
							<Button
								href={impression.link}
								size="sm"
								content="icon"
								aria-label={t("open_label", { label })}>
								<Icon icon={ArrowRight} />
							</Button>
						</ActionWrapper>
					)}
				</div>

				{/* Image – click opens modal */}
				<Image
					src={`/impressions/${impression.src}`}
					alt={alt}
					fill
					sizes="(max-width: 1024px) 50vw, 25vw"
					className={styles.cardImage}
				/>
				<button
					ref={triggerRef}
					onClick={openModal}
					className={styles.trigger}
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
						className={`t-modal-backdrop ${styles.backdrop}`}
					/>

					{/* Panel */}
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-label={label}
						className={`t-modal ${styles.modalPanel}`}>
						{/* Close button */}
						<ActionWrapper>
							<Button
								size="sm"
								content="icon"
								aria-label={t("modal_close")}
								onClick={closeModal}>
								<Icon icon={X} />
							</Button>
						</ActionWrapper>

						{/* Image */}
						<div
							className={`${styles.modalImageWrap} ${impression.square ? styles.aspectSquare : styles.aspectWide}`}>
							<Image
								src={`/impressions/${impression.src}`}
								alt={alt}
								fill
								sizes="(max-width: 768px) 100vw, 448px"
								className={styles.modalImage}
							/>
						</div>

						{/* Info */}
						<div className={styles.modalInfo}>
							<div className={styles.modalLabelWrap}>
								<p className={styles.modalLabel}>{label}</p>
								<p className={styles.modalContext}>{context}</p>
							</div>
							{impression.link && (
								<ActionWrapper>
									<Button
										href={impression.link}
										size="sm"
										content="icon"
										aria-label={t("external_label", { label })}>
										{t("open_button")}
										<Icon icon={ArrowRight} />
									</Button>
								</ActionWrapper>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ImpressionCard;

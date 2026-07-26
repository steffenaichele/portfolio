"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { RiCloseLine } from "@remixicon/react";

import Button from "../Button/Button";
import Icon from "../Icon";
import { useZoomModal } from "../../hooks/useZoomModal";
import styles from "./ImpressionCard.module.scss";

/**
 * ImpressionCard — schlanke, komponierbare Shell für eine Arbeit im Work-Grid.
 *
 * Die Shell trägt nur das GETEILTE: Karten-Oberfläche + Hover, das Zoom-Verhalten
 * (via useZoomModal) und die generische a11y-Verdrahtung. Den INHALT komponiert
 * jede Arbeit selbst über die Compound-Slots und stylt ihn individuell:
 *
 *   <ImpressionCard label={title} className={styles.wide}>
 *     <ImpressionCard.Header> …Titel/Laufzeit/Link… </ImpressionCard.Header>
 *     <ImpressionCard.Media> <Image … /> </ImpressionCard.Media>
 *     <ImpressionCard.Zoom> …frei gestaltbarer Modal-Inhalt… </ImpressionCard.Zoom>
 *   </ImpressionCard>
 *
 * - label     — barrierefreier Name der Card (für Zoom-/Dialog-Label)
 * - className  — Layout pro Komposition (aspect-ratio etc.), liegt auf .card
 *
 * Das Zoom-Panel rendert per Portal an document.body: .card nutzt scale/overflow
 * (Hover), was sonst einen Containing-Block für das fixe Panel bilden würde.
 */

type ImpressionCardContextValue = {
	mounted: boolean;
	open: () => void;
	close: () => void;
	triggerRef: RefObject<HTMLButtonElement | null>;
	modalRef: RefObject<HTMLDivElement | null>;
	backdropRef: RefObject<HTMLButtonElement | null>;
	zoomLabel: string;
	closeLabel: string;
	dialogLabel: string;
};

const ImpressionCardContext = createContext<ImpressionCardContextValue | null>(
	null,
);

const useImpressionCard = () => {
	const ctx = useContext(ImpressionCardContext);
	if (!ctx)
		throw new Error(
			"ImpressionCard.Header/Media/Zoom müssen innerhalb von <ImpressionCard> stehen.",
		);
	return ctx;
};

interface ImpressionCardProps {
	label: string;
	className?: string;
	children: ReactNode;
}

const ImpressionCard = ({ label, className, children }: ImpressionCardProps) => {
	const t = useTranslations("impressions");
	const { mounted, open, close, triggerRef, modalRef, backdropRef } =
		useZoomModal();

	const value: ImpressionCardContextValue = {
		mounted,
		open,
		close,
		triggerRef,
		modalRef,
		backdropRef,
		zoomLabel: t("zoom_label", { label }),
		closeLabel: t("modal_close"),
		dialogLabel: label,
	};

	return (
		<ImpressionCardContext.Provider value={value}>
			<div className={`${styles.card} ${className ?? ""}`}>{children}</div>
		</ImpressionCardContext.Provider>
	);
};

/** Kopfzeile — freier Inhalt (Titel/Laufzeit + optionale Actions wie Link). */
const Header = ({ children }: { children: ReactNode }) => (
	<div className={styles.header}>{children}</div>
);

/** Medienbereich — freier Inhalt (z.B. <Image fill>) plus der Zoom-Trigger. */
const Media = ({ children }: { children: ReactNode }) => {
	const { open, mounted, triggerRef, zoomLabel } = useImpressionCard();
	return (
		<>
			{children}
			<button
				ref={triggerRef}
				type="button"
				onClick={open}
				className={styles.trigger}
				aria-label={zoomLabel}
				aria-expanded={mounted}
				aria-haspopup="dialog"
			/>
		</>
	);
};

/** Zoom-Panel — freier Modal-Inhalt. Chrome (Backdrop, Close) liefert die Shell. */
const Zoom = ({ children }: { children: ReactNode }) => {
	const { mounted, close, modalRef, backdropRef, dialogLabel, closeLabel } =
		useImpressionCard();
	if (!mounted) return null;

	return createPortal(
		<>
			<button
				ref={backdropRef}
				type="button"
				tabIndex={-1}
				aria-label={closeLabel}
				onClick={close}
				className={`t-modal-backdrop ${styles.backdrop}`}
			/>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				aria-label={dialogLabel}
				className={`t-modal ${styles.panel}`}>
				<Button
					variant="filled"
					size="sm"
					content="icon"
					aria-label={closeLabel}
					onClick={close}>
					<Icon icon={RiCloseLine} />
				</Button>
				{children}
			</div>
		</>,
		document.body,
	);
};

ImpressionCard.Header = Header;
ImpressionCard.Media = Media;
ImpressionCard.Zoom = Zoom;

export default ImpressionCard;

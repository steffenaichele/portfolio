"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";
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
 * Das Zoom-Panel ist ein natives <dialog>: showModal() hebt es in den Top Layer,
 * dessen Containing Block der Viewport ist — das scale/overflow der Card (Hover)
 * kann es dort nicht mehr beschneiden, ein Portal ist deshalb nicht nötig.
 */

type ImpressionCardContextValue = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	dialogRef: RefObject<HTMLDialogElement | null>;
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
	const { isOpen, open, close, dialogRef } = useZoomModal();

	const value: ImpressionCardContextValue = {
		isOpen,
		open,
		close,
		dialogRef,
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
	const { open, isOpen, zoomLabel } = useImpressionCard();
	return (
		<>
			{children}
			<button
				type="button"
				onClick={open}
				className={styles.trigger}
				aria-label={zoomLabel}
				aria-expanded={isOpen}
				aria-haspopup="dialog"
			/>
		</>
	);
};

/** Zoom-Panel — freier Modal-Inhalt. Backdrop liefert der Browser, Close die Shell. */
const Zoom = ({ children }: { children: ReactNode }) => {
	const { close, dialogRef, dialogLabel, closeLabel } = useImpressionCard();

	return (
		<dialog
			ref={dialogRef}
			// Light-Dismiss (Klick auf den Backdrop) nativ — ohne Handler.
			closedby="any"
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
		</dialog>
	);
};

ImpressionCard.Header = Header;
ImpressionCard.Media = Media;
ImpressionCard.Zoom = Zoom;

export default ImpressionCard;

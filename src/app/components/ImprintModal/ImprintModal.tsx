"use client";

import { RiCloseLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

import Button from "../Button/Button";
import Icon from "../Icon";
import { useZoomModal } from "../../hooks/useZoomModal";
import styles from "./ImprintModal.module.scss";

// Impressum als Modal (keine eigene Route mehr). Modal-Mechanik über useZoomModal
// (wie ImpressionCard): natives <dialog> — Escape, Focus-Trap, Fokus-Rückgabe an
// den Trigger und der Backdrop kommen vom Browser, die Transition aus _modal.scss.
const ImprintModal = () => {
	const t = useTranslations("impressum");
	const { isOpen, open, close, dialogRef } = useZoomModal();

	return (
		<>
			<Button
				underline
				size="sm"
				onClick={open}
				aria-haspopup="dialog"
				aria-expanded={isOpen}>
				<span>{t("page_title")}</span>
			</Button>

			<dialog
				ref={dialogRef}
				// Light-Dismiss (Klick auf den Backdrop) nativ — ohne Handler.
				closedby="any"
				aria-label={t("page_title")}
				className={`t-modal ${styles.panel}`}>
				{/* Close button */}
				<div className={styles.closeRow}>
					<Button
						variant="filled"
						size="sm"
						content="icon"
						aria-label={t("close")}
						onClick={close}>
						<Icon icon={RiCloseLine} />
					</Button>
				</div>

				{/* Imprint content */}
				<div className={styles.content}>
					<h2 className={styles.title}>{t("page_title")}</h2>
					<div className={styles.body}>
						<p className={styles.notice}>{t("legal_notice")}</p>
						<address className={styles.address}>
							<p>Steffen Aichele</p>
							<p>Lönsstraße 4</p>
							<p>73529 Schwäbisch Gmünd</p>
						</address>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default ImprintModal;

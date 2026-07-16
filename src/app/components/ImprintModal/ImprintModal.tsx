"use client";

import { RiCloseLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

import Option from "../Option/Option";
import InteractionWrapper from "../InteractionWrapper/InteractionWrapper";
import Icon from "../Icon";
import { useZoomModal } from "../../hooks/useZoomModal";
import styles from "./ImprintModal.module.scss";

// Impressum als Modal (keine eigene Route mehr). Modal-Mechanik über useZoomModal
// (wie ImpressionCard): t-modal/-backdrop-Klassen (globals.css), Escape,
// Body-Scroll-Lock, Focus-Trap, Fokus-Rückgabe an den Trigger.
const ImprintModal = () => {
	const t = useTranslations("impressum");
	const { mounted, open, close, triggerRef, modalRef, backdropRef } =
		useZoomModal();

	return (
		<>
			<Option
				ref={triggerRef}
				size="sm"
				onClick={open}
				aria-haspopup="dialog"
				aria-expanded={mounted}>
				<span>{t("page_title")}</span>
			</Option>

			{mounted && (
				<>
					{/* Backdrop */}
					<button
						ref={backdropRef}
						type="button"
						tabIndex={-1}
						aria-label={t("close")}
						onClick={close}
						className={`t-modal-backdrop ${styles.backdrop}`}
					/>

					{/* Panel */}
					<div
						ref={modalRef}
						role="dialog"
						aria-modal="true"
						aria-label={t("page_title")}
						className={`t-modal ${styles.panel}`}>
						{/* Close button */}
						<div className={styles.closeRow}>
							<InteractionWrapper variant="primary">
								<Option
									size="sm"
									content="icon"
									data-pill-rest
									aria-label={t("close")}
									onClick={close}>
									<Icon icon={RiCloseLine} />
								</Option>
							</InteractionWrapper>
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
					</div>
				</>
			)}
		</>
	);
};

export default ImprintModal;

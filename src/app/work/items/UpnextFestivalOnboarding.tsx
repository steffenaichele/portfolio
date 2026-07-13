"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import ImpressionCard from "../../components/ImpressionCard/ImpressionCard";
import InteractionWrapper from "../../components/InteractionWrapper";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { ArrowRight } from "lucide-react";
import { useProject } from "../../hooks/useProject";
import styles from "./UpnextFestivalOnboarding.module.scss";

const IMPRESSION_ID = "2_1";
const SRC = "/impressions/upnext_dashboard.png";

// Impression 2_1 (Projekt 2) — individuell komponiert und gestylt: quadratisch.
const UpnextFestivalOnboarding = () => {
	const t = useTranslations("impressions");
	const label = t(`items.${IMPRESSION_ID}.label`);
	const alt = t(`items.${IMPRESSION_ID}.alt`);
	const { title, timeframe, link } = useProject(IMPRESSION_ID);

	return (
		<ImpressionCard label={label} className={styles.square}>
			<ImpressionCard.Header>
				<div className={styles.labelWrap}>
					<p className={styles.label}>{label}</p>
					<p className={styles.context}>{"·"}</p>
					<p className={styles.context}>{title}</p>
					{timeframe && <p className={styles.context}>{`· ${timeframe}`}</p>}
				</div>
				{link && (
					<InteractionWrapper variant="primary">
						<Button
							href={link}
							size="sm"
							content="icon"
							data-pill-rest
							aria-label={t("open_label", { label })}>
							<Icon icon={ArrowRight} />
						</Button>
					</InteractionWrapper>
				)}
			</ImpressionCard.Header>

			<ImpressionCard.Media>
				<Image
					src={SRC}
					alt={alt}
					fill
					sizes="(max-width: 1024px) 50vw, 25vw"
					className={styles.cardImage}
					data-zoom-image
				/>
			</ImpressionCard.Media>

			<ImpressionCard.Zoom>
				<div className={styles.modalImageWrap}>
					<Image
						src={SRC}
						alt={alt}
						fill
						sizes="(max-width: 768px) 100vw, 448px"
						className={styles.modalImage}
					/>
				</div>
				<div className={styles.modalInfo}>
					<div className={styles.modalLabelWrap}>
						<p className={styles.modalLabel}>{label}</p>
						<p className={styles.modalContext}>
							{timeframe ? `${title} · ${timeframe}` : title}
						</p>
					</div>
					{link && (
						<InteractionWrapper variant="primary">
							<Button
								href={link}
								size="sm"
								content="iconText"
								data-pill-rest
								aria-label={t("external_label", { label })}>
								<span>{t("open_button")}</span>
								<Icon icon={ArrowRight} />
							</Button>
						</InteractionWrapper>
					)}
				</div>
			</ImpressionCard.Zoom>
		</ImpressionCard>
	);
};

export default UpnextFestivalOnboarding;

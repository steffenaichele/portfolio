"use client";

import Image from "next/image";
import { RiArrowRightLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

import ImpressionCard from "../../components/ImpressionCard/ImpressionCard";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon";
import { getImpression } from "../../data/impressions";
import styles from "./NextmuseumOpenCall.module.scss";

const IMPRESSION_ID = "1_1";

// Impression 1_1 — individuell komponiert und gestylt: breites Format.
const NextmuseumOpenCall = () => {
	const t = useTranslations("impressions");
	const { label, alt, src, projectTitle, projectTimeframe, projectLink } =
		getImpression(IMPRESSION_ID);

	return (
		<ImpressionCard label={label} className={styles.wide}>
			<ImpressionCard.Header>
				<div className={styles.labelWrap}>
					<p className={styles.label}>{label}</p>
					<p className={styles.context}>{"·"}</p>
					<p className={styles.context}>{projectTitle}</p>
					{projectTimeframe && (
						<p className={styles.context}>{`· ${projectTimeframe}`}</p>
					)}
				</div>
				{projectLink && (
					<Button
						variant="filled"
						size="sm"
						content="icon"
						href={projectLink}
						external
						aria-label={t("open_label", { label })}>
						<Icon icon={RiArrowRightLine} />
					</Button>
				)}
			</ImpressionCard.Header>

			<ImpressionCard.Media>
				<Image
					src={src}
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
						src={src}
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
							{projectTimeframe
								? `${projectTitle} · ${projectTimeframe}`
								: projectTitle}
						</p>
					</div>
					{projectLink && (
						<Button
							variant="filled"
							size="sm"
							content="iconText"
							href={projectLink}
							external
							aria-label={t("external_label", { label })}>
							<span>{t("open_button")}</span>
							<Icon icon={RiArrowRightLine} />
						</Button>
					)}
				</div>
			</ImpressionCard.Zoom>
		</ImpressionCard>
	);
};

export default NextmuseumOpenCall;

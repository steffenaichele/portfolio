import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./CaseFigure.module.scss";

interface CaseFigureProps {
	caption: string;
	/** CSS aspect-ratio als String, z. B. "16 / 9". */
	ratio: string;
	/** Fehlt src, wird ein Platzhalter im richtigen Format gerendert. */
	src?: string;
	alt?: string;
	className?: string;
}

// Server Component (kein "use client"): rendert nur Markup, braucht keine
// Browser-APIs. getTranslations ist die Server-Variante von useTranslations.
const CaseFigure = async ({
	caption,
	ratio,
	src,
	alt,
	className,
}: CaseFigureProps) => {
	const t = await getTranslations("case_study");

	return (
		<figure className={`${styles.figure} ${className ?? ""}`}>
			<div
				className={styles.frame}
				// Seitenverhältnis kommt aus den Daten → als Custom Property rein,
				// damit das eigentliche Styling im SCSS-Modul bleibt.
				style={{ "--case-figure-ratio": ratio } as CSSProperties}>
				{src ? (
					<Image
						src={src}
						alt={alt ?? ""}
						// fill = Bild füllt das Elternelement (das die aspect-ratio hält).
						fill
						// sizes sagt Next, wie breit das Bild TATSÄCHLICH gerendert wird.
						// Danach wählt der Browser die passende Datei aus dem srcset.
						// Ohne sizes lädt fill immer 100vw = unnötig große Downloads.
						// figureHalf ist die Hälfte der 768px-Lesebreite.
						sizes="(min-width: 768px) 384px, 50vw"
						className={styles.image}
					/>
				) : (
					<span className={styles.pending}>{t("figure_pending")}</span>
				)}
			</div>
			<figcaption className={styles.caption}>{caption}</figcaption>
		</figure>
	);
};

export default CaseFigure;

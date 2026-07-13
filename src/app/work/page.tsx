import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NextmuseumOpenCall from "./items/NextmuseumOpenCall";
import UpnextFestivalOnboarding from "./items/UpnextFestivalOnboarding";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("impressions");
	return {
		title: t("meta_title"),
		description: t("meta_description"),
	};
}

// Reihenfolge der Arbeiten wird hier deklarativ gesetzt. Jede Impression ist eine
// eigene, individuell gestylte Komposition (work/items/*) — kein zentrales Datenmodell.
export default function WorkPage() {
	return (
		<main className={styles.page} id="main-content">
			<div className={styles.feed}>
				<NextmuseumOpenCall />
				<UpnextFestivalOnboarding />
			</div>
		</main>
	);
}

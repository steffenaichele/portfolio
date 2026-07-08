import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImpressionCard from "../components/ImpressionCard";
import { impressions } from "../data/content";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("impressions");
	return {
		title: t("meta_title"),
		description: t("meta_description"),
	};
}

export default async function WorkPage() {
	const t = await getTranslations("impressions");

	return (
		<div className={styles.page}>
			<header className={styles.head}>
				<h1 className={styles.title}>{t("page_title")}</h1>
				<p className={styles.description}>{t("page_description")}</p>
			</header>
			<div className={styles.grid}>
				{impressions.map((impression) => (
					<ImpressionCard key={impression.id} impression={impression} />
				))}
			</div>
		</div>
	);
}

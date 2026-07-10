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

export default function WorkPage() {
	return (
		<main className={styles.page} id="main-content">
			<div className={styles.feed}>
				{impressions.map((impression) => (
					<ImpressionCard key={impression.id} impression={impression} />
				))}
			</div>
		</main>
	);
}

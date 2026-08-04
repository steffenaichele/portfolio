import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection/CVSection";
import styles from "./page.module.scss";

import Button from "./components/Button/Button";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('home');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function Home() {
	const t = await getTranslations('home');

	return (
		<main className={`${styles.page} content-grid`} id="main-content">
			<section className={styles.section}>
				<h1 className={styles.heading}>
					{t("heading1")} <br />
					{t("heading2")}
				</h1>
			</section>
			<CVSection />
		</main>
	);
}

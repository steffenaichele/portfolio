import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection";
import styles from "./page.module.scss";

import Button from "./components/Button";

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
		<main className={styles.page} id="main-content">
			<section className={styles.intro}>
				<h1 className={styles.greeting}>
					{t("greeting")}{" "}
					<span role="img" aria-label={t("emoji_label")}>
						✌🏻
					</span>
				</h1>
				<p>{t("text1")}</p>
				<p>{t("text2")}</p>
				<p>{t("text3")}</p>
				<div className={styles.workButtonWrapper}>
					<p>{t.rich("text4")}</p>
					<Button size="md" content="text" href="/work" underline>
						<span>{t("work_button")}</span>
					</Button>
				</div>
			</section>
			<CVSection />
		</main>
	);
}

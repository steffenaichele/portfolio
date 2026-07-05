import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection";
import ImpressionCard from "./components/ImpressionCard";
import MainView from "./components/MainView";
import { impressions } from "./data/content";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('home');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function Home() {
	const t = await getTranslations('home');

	const home = (
		<div
			data-stagger-group
			className={styles.homeGroup}>
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
			</section>
			<CVSection />
		</div>
	);

	const work = (
		<div data-stagger-group className={styles.workGroup}>
			{impressions.map((impression) => (
				<ImpressionCard key={impression.id} impression={impression} />
			))}
		</div>
	);

	return <MainView home={home} work={work} />;
}

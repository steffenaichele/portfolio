import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CaseStudySection from "./components/CaseStudySection/CaseStudySection";
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
		<div className={styles.page}>
			<section className={styles.section}>
				<h1 className={styles.heading}>
					{t("heading1")} <br />
					{t("heading2")}
				</h1>
			</section>
			<CaseStudySection />
			<CVSection />
		</div>
	);
}

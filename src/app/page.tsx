import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection/CVSection";
import CaseStudyFolder from "./components/CaseStudyFolder/CaseStudyFolder";
import { caseStudies } from "./data/caseStudies";
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

	return (
		<>
			<section className={`${styles.section} ${styles.hero}`}>
				<p className={`text-body ${styles.greeting}`}>
					{t("greeting")}
				</p>
				<h1 className={`text-body ${styles.heading}`}>
					{t("hero_text_1")}
					<br />
					<br />
					{t("hero_text_2")}
				</h1>
				<Image
					src="/me.jpg"
					alt={t("img_alt")}
					width={76}
					height={76}
					className={styles.heroImage}
				/>
			</section>
			<section
				id="case-studies"
				className={`${styles.section} ${styles.caseStudies}`}>
				{caseStudies.map((caseStudy) => (
					<CaseStudyFolder key={caseStudy.id} caseStudy={caseStudy} />
				))}
			</section>
			<CVSection />
		</>
	);
}

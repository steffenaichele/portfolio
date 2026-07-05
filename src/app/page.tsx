import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection";
import ImpressionCard from "./components/ImpressionCard";
import MainView from "./components/MainView";
import { impressions } from "./data/content";

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
			className="contents flex flex-col gap-1">
			<section className="py-14 px-7 rounded-lg text-md font-medium text-[var(--color-text-primary)] flex flex-col gap-6">
				<h1 className="text-[var(--color-text-secondary)]">
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
		<div data-stagger-group className="flex flex-wrap">
			{impressions.map((impression) => (
				<ImpressionCard key={impression.id} impression={impression} />
			))}
		</div>
	);

	return <MainView home={home} work={work} />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CVSection from "./components/CVSection";

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
			<section className="max-w-lg mx-auto bg-[var(--color-segment-bg)] pt-60 px-4 text-md font-medium text-[var(--color-text-primary)] flex flex-col gap-5">
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
		</>
	);
}

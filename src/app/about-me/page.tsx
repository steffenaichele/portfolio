import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('about_me');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function AboutMe() {
	const t = await getTranslations('about_me');
	return (
		<section className="pt-50 flex flex-col gap-24">
			<h1 className="text-4xl text-[var(--color-text-primary)]">{t('page_title')}</h1>
			<p className="text-[var(--color-text-primary)]">hello:)</p>
		</section>
	);
}

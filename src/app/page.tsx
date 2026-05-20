import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsSection from "./components/ProjectsSection";
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
			<section className="pt-150">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl text-[var(--color-text-primary)]">
						{t('greeting')}{" "}
						<span role="img" aria-label={t('emoji_label')}>✌🏻</span>
					</h1>
					<p className="text-2xl text-[var(--color-text-tertiary)]">
						{t('subtitle')}
					</p>
				</div>
			</section>
			<ProjectsSection />
			<CVSection />
		</>
	);
}

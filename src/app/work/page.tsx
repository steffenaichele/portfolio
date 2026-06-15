import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImpressionCard from "../components/ImpressionCard";
import { impressions, getProjectForImpression } from "../data/content";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('impressions');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function ImpressionsPage() {
	const t = await getTranslations('impressions');
	return (
		<section className="pt-80 flex flex-col gap-24">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl text-[var(--color-text-primary)]">
					{t('page_title')}
				</h1>
				<p className="text-lg text-[var(--color-text-secondary)]">
					{t('page_description')}
				</p>
			</div>
			<div
				className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3">
				{impressions.map((impression) => (
					<ImpressionCard
						key={impression.id}
						impression={impression}
						project={getProjectForImpression(impression)}
					/>
				))}
			</div>
		</section>
	);
}

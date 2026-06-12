import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";
import ActionWrapper from "../components/ActionWrapper";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('impressum');
	return {
		title: t('meta_title'),
		description: t('meta_description'),
	};
}

export default async function Imprint() {
	const t = await getTranslations('impressum');
	return (
		<section className="pt-50 flex flex-col items-start gap-10">
			<h1 className="text-4xl text-[var(--color-text-primary)]">
				{t('page_title')}
			</h1>
			<div className="text-[var(--color-text-tertiary)]">
				<p className="mb-4">{t('legal_notice')}</p>
				<address className="not-italic">
					<p>Steffen Aichele</p>
					<p>Lönsstraße 4</p>
					<p>73529 Schwäbisch Gmünd</p>
				</address>
			</div>
			<ActionWrapper>
				<Button
					size="md"
					content="iconRight"
					copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
					{t('contact_button')}
					<Icon icon={Mail} />
				</Button>
			</ActionWrapper>
		</section>
	);
}

"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useLocale } from "../hooks/useLocale";

export default function LanguageToggle() {
	const t = useTranslations('layout.nav');
	const { locale, setLocale } = useLocale();

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => setLocale("en")}
				aria-label={t('switch_to_en')}
				aria-pressed={locale === "en"}
				className={clsx(
					"text-base transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-orange-300 focus-visible:outline-offset-2",
					locale === "en"
						? "text-[var(--color-text-primary)] font-medium"
						: "text-[var(--color-text-tertiary)]"
				)}>
				EN
			</button>
			<span className="text-[var(--color-text-tertiary)]" aria-hidden>·</span>
			<button
				onClick={() => setLocale("de")}
				aria-label={t('switch_to_de')}
				aria-pressed={locale === "de"}
				className={clsx(
					"text-base transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-orange-300 focus-visible:outline-offset-2",
					locale === "de"
						? "text-[var(--color-text-primary)] font-medium"
						: "text-[var(--color-text-tertiary)]"
				)}>
				DE
			</button>
		</div>
	);
}

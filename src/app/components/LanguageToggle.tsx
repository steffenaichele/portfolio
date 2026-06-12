"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useLocale } from "../hooks/useLocale";
import ActionWrapper from "./ActionWrapper";

export default function LanguageToggle() {
	const t = useTranslations('layout.nav');
	const { locale, setLocale } = useLocale();

	// Keine Rundung auf den Buttons (Pointer-Hit-Testing); Hover-Pille kommt
	// vom ActionWrapper, etwas Padding gibt der Pille Fläche.
	const buttonClass = (active: boolean) =>
		clsx(
			"px-1.5 py-0.5 text-base transition-colors focus-visible:outline-2 focus-visible:outline-orange-300 focus-visible:outline-offset-2",
			active
				? "text-[var(--color-text-primary)] font-medium"
				: "text-[var(--color-text-tertiary)]",
		);

	return (
		<ActionWrapper className="flex items-center gap-1">
			<button
				onClick={() => setLocale("en")}
				aria-label={t('switch_to_en')}
				aria-pressed={locale === "en"}
				className={buttonClass(locale === "en")}>
				EN
			</button>
			<span className="text-[var(--color-text-tertiary)]" aria-hidden>·</span>
			<button
				onClick={() => setLocale("de")}
				aria-label={t('switch_to_de')}
				aria-pressed={locale === "de"}
				className={buttonClass(locale === "de")}>
				DE
			</button>
		</ActionWrapper>
	);
}

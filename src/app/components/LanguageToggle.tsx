"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "../hooks/useLocale";
import ToggleButton from "./ToggleButton";

export default function LanguageToggle() {
	const t = useTranslations("layout.nav");
	const { locale, setLocale } = useLocale();

	return (
		<ToggleButton
			size="sm"
			activeKey={locale}
			aria-label={t("language_label")}
			options={[
				{
					key: "en",
					label: "EN",
					onClick: () => setLocale("en"),
					ariaLabel: t("switch_to_en"),
				},
				{
					key: "de",
					label: "DE",
					onClick: () => setLocale("de"),
					ariaLabel: t("switch_to_de"),
				},
			]}
		/>
	);
}

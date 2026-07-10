"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "../hooks/useLocale";
import type { Locale } from "@/i18n/config";
import InteractionWrapper from "./InteractionWrapper";
import Button from "./Button";
import styles from "./LanguageToggle.module.scss";

const languages: { key: Locale; label: string }[] = [
	{ key: "en", label: "EN" },
	{ key: "de", label: "DE" },
];

export default function LanguageToggle() {
	const t = useTranslations("layout.nav");
	const { locale, setLocale } = useLocale();

	return (
		<InteractionWrapper
			variant="secondary"
			aria-label={t("language_label")}
			className={styles.toggle}>
			{languages.map(({ key, label }) => {
				const active = locale === key;
				return (
					<Button
						key={key}
						size="sm"
						onClick={() => setLocale(key)}
						aria-label={t(key === "en" ? "switch_to_en" : "switch_to_de")}
						aria-pressed={active}
						data-pill-rest={active}
						className={`${styles.item} ${
							active ? styles.active : styles.inactive
						}`}>
						<span>{label}</span>
					</Button>
				);
			})}
		</InteractionWrapper>
	);
}

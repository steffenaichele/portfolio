"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "../../hooks/useLocale";
import type { Locale } from "@/i18n/config";
import SegmentedControl from "../SegmentedControl/SegmentedControl";
import styles from "./LanguageToggle.module.scss";

const languages: { key: Locale; label: string }[] = [
	{ key: "en", label: "EN" },
	{ key: "de", label: "DE" },
];

export default function LanguageToggle() {
	const t = useTranslations("layout.nav");
	const { locale, setLocale } = useLocale();

	return (
		<SegmentedControl
			variant="secondary"
			aria-label={t("language_label")}
			className={styles.toggle}>
			{languages.map(({ key, label }) => {
				const active = locale === key;
				return (
					<SegmentedControl.Segment
						key={key}
						active={active}
						onClick={() => setLocale(key)}
						aria-label={t(key === "en" ? "switch_to_en" : "switch_to_de")}
						aria-pressed={active}
						className={`${styles.item} ${
							active ? styles.active : styles.inactive
						}`}>
						<span>{label}</span>
					</SegmentedControl.Segment>
				);
			})}
		</SegmentedControl>
	);
}

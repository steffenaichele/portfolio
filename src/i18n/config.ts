// Launch ist EN-only. "de" kommt post-launch zurück — dann hier ergänzen und
// die Sprachen in components/LanguageToggle wieder aufnehmen.
const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
	return (locales as readonly string[]).includes(value ?? "");
}

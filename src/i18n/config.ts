const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string | undefined | null): value is Locale {
	return (locales as readonly string[]).includes(value ?? "");
}

export function negotiateLocaleFromAcceptLanguage(
	header: string | null,
): Locale | null {
	if (!header) return null;

	const preferences = header
		.split(",")
		.map((part) => {
			const [lang, ...params] = part.trim().split(";");
			const qParam = params.find((p) => p.trim().startsWith("q="));
			const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
			return { lang: lang.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
		})
		.sort((a, b) => b.q - a.q);

	for (const { lang } of preferences) {
		if (lang.startsWith("de")) return "de";
		if (lang.startsWith("en")) return "en";
	}

	return null;
}

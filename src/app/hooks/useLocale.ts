"use client";

import { useLocale as useNextIntlLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";
const MAX_AGE = 60 * 60 * 24 * 365;

// Ohne Cookie verhandelt der Server die Locale über Accept-Language
// (src/i18n/request.ts). Der Cookie wird nur beim expliziten Umschalten gesetzt.
export function useLocale() {
	const locale = useNextIntlLocale() as Locale;
	const router = useRouter();

	function setLocale(next: Locale) {
		document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${MAX_AGE}`;
		router.refresh();
	}

	return { locale, setLocale };
}

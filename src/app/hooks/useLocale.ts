"use client";

import { useLocale as useNextIntlLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type Locale, isLocale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";
const MAX_AGE = 60 * 60 * 24 * 365;

function getCookieLocale(): Locale | null {
	const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
	const value = match?.[1];
	return isLocale(value) ? value : null;
}

function setBrowserLocale(locale: Locale) {
	document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${MAX_AGE}`;
}

export function useLocale() {
	const locale = useNextIntlLocale() as Locale;
	const router = useRouter();

	useEffect(() => {
		if (!getCookieLocale()) {
			const browser = navigator.language.toLowerCase();
			const detected: Locale = browser.startsWith("de") ? "de" : "en";
			setBrowserLocale(detected);
			if (detected !== locale) {
				router.refresh();
			}
		}
	}, []);

	function setLocale(next: Locale) {
		setBrowserLocale(next);
		router.refresh();
	}

	return { locale, setLocale };
}

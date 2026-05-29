import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import {
	DEFAULT_LOCALE,
	type Locale,
	isLocale,
	negotiateLocaleFromAcceptLanguage,
} from "./config";

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const raw = cookieStore.get("NEXT_LOCALE")?.value;

	let locale: Locale;
	if (isLocale(raw)) {
		locale = raw;
	} else {
		const acceptLanguage = (await headers()).get("accept-language");
		locale =
			negotiateLocaleFromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE;
	}

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	};
});

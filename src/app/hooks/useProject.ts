"use client";

import { useTranslations } from "next-intl";
import { getProject, projectIdOf } from "../data/projects";

/**
 * useProject — liefert den Projekt-Kontext einer Impression. Aus der Impression-ID
 * ("1_1") wird die Projekt-ID ("1") abgeleitet; title/timeframe kommen bilingual
 * aus messages/{de,en}.json (projects.items[id]), link aus data/projects.ts.
 *
 * timeframe kann leer sein (noch nicht gepflegt) — Kompositionen rendern es
 * dann konditional.
 */
export function useProject(impressionId: string) {
	const t = useTranslations("projects");
	const id = projectIdOf(impressionId);
	const project = getProject(id);

	return {
		id,
		title: t(`items.${id}.title`),
		timeframe: t(`items.${id}.timeframe`),
		link: project?.link,
	};
}

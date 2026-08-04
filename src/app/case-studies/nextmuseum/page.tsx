import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { sections } from "../../data/caseStudies/nextmuseum";
import CaseNav from "./CaseNav";
import IntroSection from "./sections/IntroSection";
import ProjectSection from "./sections/ProjectSection";
import DecisionsSection from "./sections/DecisionsSection";
import OutcomeSection from "./sections/OutcomeSection";
import styles from "./page.module.scss";

// generateMetadata ist der App-Router-Weg, <title> und <meta> zu setzen: Next
// ruft die Funktion beim Rendern auf dem Server auf und schreibt das Ergebnis
// in den <head>. Das Root-Layout hängt per title.template noch
// "· Steffen Aichele" an.
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("case_nextmuseum");
	return {
		title: t("meta_title"),
		description: t("meta_description"),
	};
}

// Server Component (Standard im App Router): kein "use client", also landet
// nichts davon im Client-Bundle. Nur CaseNav ist eine Client-Komponente.
export default async function NextmuseumCaseStudy() {
	const t = await getTranslations("case_study");

	return (
		<>
			<CaseNav
				sections={sections}
				navLabel={t("nav_label")}
				homeLabel={t("nav_home")}
			/>
			{/* id="case-study" ist der Anker für das seiten-spezifische
			    scroll-behavior in page.module.scss. */}
			<div id="case-study" className={styles.main}>
				<IntroSection />
				<ProjectSection />
				<DecisionsSection />
				<OutcomeSection />
			</div>
		</>
	);
}

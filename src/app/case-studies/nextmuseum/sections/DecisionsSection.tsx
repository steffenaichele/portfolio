import { Fragment } from "react";

import CaseFigure from "../../../components/CaseFigure/CaseFigure";
import Disclosure from "../../../components/Disclosure/Disclosure";
import {
	decisions,
	decisionsIntro,
	openCall,
	sections,
} from "../../../data/caseStudies/nextmuseum";
import shared from "./CaseSection.module.scss";
import styles from "./DecisionsSection.module.scss";

const heading =
	sections.find((section) => section.id === "decisions")?.heading ?? "";

const DecisionsSection = () => (
	<section id="decisions" className={shared.section}>
		<h2 className={shared.heading}>{heading}</h2>

		<div className={shared.prose}>
			<p>{decisionsIntro}</p>
		</div>

		{decisions.map((decision) => (
			<article key={decision.id} className={styles.decision}>
				<p className={styles.eyebrow}>{decision.eyebrow}</p>
				<h3 className={styles.title}>{decision.title}</h3>
				{/* Thesenzeile: das Blockquote aus dem Markdown, bewusst OHNE
				    Zitatoptik — es ist die eigene Kernaussage, kein Fremdzitat. */}
				<p className={styles.thesis}>{decision.thesis}</p>

				<div className={shared.prose}>
					{decision.paragraphs.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>

				{decision.id === "structure" && (
					<>
						<div className={styles.disclosureSlot}>
							<Disclosure summary={openCall.disclosure.summary}>
								{openCall.disclosure.body}
							</Disclosure>
						</div>
						<div className={shared.prose}>
							<p>{openCall.statesIntro}</p>
						</div>
						{/* dt/dd liegen direkt im <dl> — ein Wrapper-<div> würde die
						    subgrid-Kette unterbrechen und die Ausrichtung kosten. */}
						<dl className={shared.definitionList}>
							{openCall.states.map((state) => (
								<Fragment key={state.label}>
									<dt className={shared.term}>{state.label}</dt>
									<dd className={shared.definition}>{state.text}</dd>
								</Fragment>
							))}
						</dl>
					</>
				)}

				{decision.figures.map((figure) => (
					<CaseFigure
						key={figure.caption}
						caption={figure.caption}
						ratio={figure.ratio}
						className={
							figure.span === "full" ? shared.figureFull : shared.figureHalf
						}
					/>
				))}
			</article>
		))}
	</section>
);

export default DecisionsSection;

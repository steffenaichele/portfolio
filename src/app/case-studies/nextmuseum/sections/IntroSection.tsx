import CaseFigure from "../../../components/CaseFigure/CaseFigure";
import Disclosure from "../../../components/Disclosure/Disclosure";
import { intro, sections } from "../../../data/caseStudies/nextmuseum";
import shared from "./CaseSection.module.scss";
import styles from "./IntroSection.module.scss";

const heading =
	sections.find((section) => section.id === "intro")?.heading ?? "";

const IntroSection = () => (
	<section id="intro" className={shared.section}>
		<div className={styles.header}>
			<h1 className={styles.title}>{heading}</h1>
			<ul className={styles.tags}>
				{intro.tags.map((tag) => (
					<li key={tag} className={styles.tag}>
						{tag}
					</li>
				))}
			</ul>
		</div>

		<CaseFigure
			caption={intro.cover.caption}
			ratio={intro.cover.ratio}
			className={shared.figureFull}
		/>

		<dl className={shared.definitionList}>
			<dt className={shared.term}>{intro.durationLabel}</dt>
			<dd className={shared.definition}>{intro.duration}</dd>

			<dt className={shared.term}>{intro.overview.label}</dt>
			<dd className={shared.definition}>
				<p className={shared.definitionLead}>{intro.overview.before}</p>
				<Disclosure summary={intro.overview.disclosure.summary}>
					{intro.overview.disclosure.body}
				</Disclosure>
				<p>{intro.overview.after}</p>
			</dd>

			<dt className={shared.term}>{intro.role.label}</dt>
			<dd className={shared.definition}>
				<p>{intro.role.text}</p>
			</dd>

			<dt className={shared.term}>{intro.context.label}</dt>
			<dd className={shared.definition}>
				{intro.context.paragraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</dd>
		</dl>
	</section>
);

export default IntroSection;

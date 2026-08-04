import CaseFigure from "../../../components/CaseFigure/CaseFigure";
import { getExternalLinkProps } from "../../../lib/clickable";
import { outcome, sections } from "../../../data/caseStudies/nextmuseum";
import shared from "./CaseSection.module.scss";
import styles from "./OutcomeSection.module.scss";

const heading =
	sections.find((section) => section.id === "outcome")?.heading ?? "";

const OutcomeSection = () => (
	<section id="outcome" className={shared.section}>
		<h2 className={shared.heading}>{heading}</h2>

		{/* Zahlen als Ziffern für Überflieger — dieselben Werte stehen im
		    Fließtext darunter, dort im Satzzusammenhang. */}
		<ul className={styles.stats}>
			{outcome.stats.map((stat) => (
				<li key={stat.label} className={styles.stat}>
					<span className={styles.statValue}>{stat.value}</span>
					<span className={styles.statLabel}>{stat.label}</span>
				</li>
			))}
		</ul>

		<div className={shared.prose}>
			<p>
				{outcome.launch.before}
				<a
					href={outcome.launch.href}
					className={shared.link}
					{...getExternalLinkProps(true)}>
					{outcome.launch.linkLabel}
					<span className={shared.srOnly}> (Opens in new window)</span>
				</a>
				{outcome.launch.after}
			</p>
			{outcome.paragraphs.map((paragraph) => (
				<p key={paragraph}>{paragraph}</p>
			))}
		</div>

		{outcome.figures.map((figure) => (
			<CaseFigure
				key={figure.caption}
				caption={figure.caption}
				ratio={figure.ratio}
				className={
					figure.span === "full" ? shared.figureFull : shared.figureHalf
				}
			/>
		))}
	</section>
);

export default OutcomeSection;

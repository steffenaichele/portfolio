import CaseFigure from "../../../components/CaseFigure/CaseFigure";
import { project, sections } from "../../../data/caseStudies/nextmuseum";
import shared from "./CaseSection.module.scss";
import styles from "./ProjectSection.module.scss";

const heading =
	sections.find((section) => section.id === "project")?.heading ?? "";

const ProjectSection = () => (
	<section id="project" className={shared.section}>
		<h2 className={shared.heading}>{heading}</h2>

		<div className={shared.prose}>
			<p>{project.intro}</p>
		</div>

		{project.beforeAfter.map((figure) => (
			<CaseFigure
				key={figure.caption}
				caption={figure.caption}
				ratio={figure.ratio}
				className={shared.figureHalf}
			/>
		))}

		<h3 className={shared.subheading}>{project.goalsLabel}</h3>
		<ol className={styles.goals}>
			{project.goals.map((goal) => (
				<li key={goal.label} className={styles.goal}>
					<p className={styles.goalLabel}>{goal.label}</p>
					<p className={styles.goalText}>{goal.text}</p>
				</li>
			))}
		</ol>

		<h3 className={shared.subheading}>{project.constraintsLabel}</h3>
		<div className={shared.prose}>
			<p>{project.constraints}</p>
		</div>
	</section>
);

export default ProjectSection;

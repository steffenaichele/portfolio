import Image from "next/image";
import type { CaseStudy } from "../../data/caseStudies";
import styles from "./CaseStudyFolder.module.scss";

import Button from "../Button/Button";

interface CaseStudyFolderProps {
	caseStudy: CaseStudy;
}

const CaseStudyFolder = ({ caseStudy }: CaseStudyFolderProps) => {
	const shots = caseStudy.shots?.slice(0, 3) ?? [];

	return (
		<article className={styles.folder}>
			<div className={styles.back}></div>
			<div className={styles.shots}>
				{shots.map((shot, i) => (
					<div key={i} className={styles.shot}>
						<Image
							src={shot.src}
							alt={shot.alt}
							fill
							sizes="120px"
						/>
					</div>
				))}
			</div>
			<div className={styles.front}>
				<h2 className={styles.headline}>{caseStudy.headline}</h2>
				<p className={styles.subline}>{caseStudy.subline}</p>
				<div className={styles.actions}>
					<Button
						href={caseStudy.caseHref}
						variant="filled"
						size="md"
						content="text">
						<span>Read case study</span>
					</Button>
				</div>
			</div>
		</article>
	);
};

export default CaseStudyFolder;

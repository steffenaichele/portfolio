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
		<article className={styles.caseStudyFolder}>
			<div className={styles.textWrapper}>
				<h2 className={styles.headline}>{caseStudy.headline}</h2>
				<p className={styles.subline}>{caseStudy.subline}</p>
				<Button
					href={caseStudy.caseHref}
					variant="filled"
					size="md"
					content="text">
					<span>Read case study</span>
				</Button>
			</div>
			<div className={`${styles.shots} ${caseStudy.id}`}>
				{shots.map((shot, index) => (
					<div className={styles.shotWrapper} key={index}>
						<Image
							key={index}
							src={shot.src}
							alt={shot.alt}
							width={300}
							height={200}
							className={styles.shot}
						/>
					</div>
				))}
			</div>
		</article>
	);
};

export default CaseStudyFolder;

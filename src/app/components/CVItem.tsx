import { RiArrowRightUpLine } from "@remixicon/react";
import Button from "./Button";
import Icon from "./Icon";
import type { CVEntry } from "../data/cv";
import styles from "./CVItem.module.scss";

interface CVItemProps {
	entry: CVEntry;
}

// Unter 420px nur die letzten 2 Ziffern zeigen (siehe .yearFull/.yearShort
// in CVItem.module.scss) — beide Varianten rendern, CSS blendet passend ein/aus.
function Year({ year }: { year: number }) {
	return (
		<>
			<span className={styles.yearFull}>{year}</span>
			<span className={styles.yearShort}>{String(year).slice(-2)}</span>
		</>
	);
}

export function CVItem({ entry }: CVItemProps) {
	return (
		<li className={styles.item}>
			<div className={styles.header}>
				{entry.organizationLink ? (
					<Button
						href={entry.organizationLink}
						external
						underline
						size="sm"
						content="iconText">
						<span>
							<strong>
								{entry.organizationShort}
								{", "}
							</strong>
							{entry.location}
						</span>
						<Icon icon={RiArrowRightUpLine} />
					</Button>
				) : (
					<p className={styles.organization}>
						<strong>
							{entry.organizationShort}
							{", "}
						</strong>
						{entry.location}
					</p>
				)}
				<p className={styles.timeWrapper}>{entry.totalDuration}</p>
			</div>
			<div className={styles.rolesWrapper}>
				{entry.roles.map((role) => (
					<div
						key={`${role.title}-${role.startYear}-${role.startMonth}`}
						className={styles.roleWrapper}>
						<h2 className={styles.roleTitle}>{role.title}</h2>
						<p className={styles.time}>
							{role.startMonth} <Year year={role.startYear} /> –{" "}
							{role.endMonth} <Year year={role.endYear} />
						</p>
					</div>
				))}
			</div>
		</li>
	);
}

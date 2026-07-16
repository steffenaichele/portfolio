import { RiArrowRightUpLine } from "@remixicon/react";
import Button from "../Button/Button";
import Icon from "../Icon";
import type { CVEntry } from "../../data/cv";
import styles from "./CVItem.module.scss";

interface CVItemProps {
	entry: CVEntry;
}

// Responsive Textkürzung (Breakpoints in styles/_breakpoints.scss): beide
// Varianten rendern, CSS blendet passend ein/aus.
// Unter $breakpoint-xs nur die letzten 2 Ziffern des Jahres zeigen.
function Year({ year }: { year: number }) {
	return (
		<>
			<span className={styles.yearFull}>{year}</span>
			<span className={styles.yearShort}>{String(year).slice(-2)}</span>
		</>
	);
}

// Unter $breakpoint-sm organisationInitials statt organizationShort zeigen.
function Organization({ entry }: { entry: CVEntry }) {
	return (
		<>
			<span className={styles.orgFull}>
				{entry.organizationShort}
				{", "}
			</span>
			<span className={styles.orgShort}>
				{entry.organisationInitials ?? entry.organizationShort}
				{", "}
			</span>
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
						<span className={styles.orgRow}>
							<Organization entry={entry} />
							<span className={styles.location}>{entry.location}</span>
						</span>
						<Icon icon={RiArrowRightUpLine} />
					</Button>
				) : (
					<p className={`${styles.organization} ${styles.orgRow}`}>
						<Organization entry={entry} />
						<span className={styles.location}>{entry.location}</span>
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

import { RiExternalLinkLine } from "@remixicon/react";
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
				<div className={styles.titleWrapper}>
					<p className={`${styles.organization}`}>
						<Organization entry={entry} />
						<span className={styles.location}>
							{entry.location}
						</span>
					</p>
					{entry.organizationLink ? (
						<Button
							href={entry.organizationLink}
							external
							underline
							variant="plain"
							size="sm"
							content="icon">
							<Icon icon={RiExternalLinkLine} />
						</Button>
					) : (
						""
					)}
				</div>
				<p className={styles.timeWrapper}>{entry.totalDuration}</p>
			</div>
			<div className={styles.rolesWrapper}>
				{entry.roles.map((role) => (
					<div
						key={`${role.title}-${role.startYear}-${role.startMonth}`}
						className={styles.roleWrapper}>
						<p className={styles.time}>
							{role.startMonth} <Year year={role.startYear} /> –{" "}
							{role.endMonth} <Year year={role.endYear} />
						</p>
						<h2 className={styles.roleTitle}>{role.title}</h2>
					</div>
				))}
			</div>
		</li>
	);
}

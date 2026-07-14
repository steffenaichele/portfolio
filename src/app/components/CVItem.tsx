"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RiArrowRightUpLine } from "@remixicon/react";
import InteractionWrapper from "./InteractionWrapper";
import Button from "./Button";
import Icon from "./Icon";
import type { CVEntry } from "../data/cv";
import styles from "./CVItem.module.scss";

// CVItem — CV-Eintrag. Header (Organisation + Ort + optionaler Link) und
// Roles-Wrapper (alle Rollen mit eigenem Zeitraum) sind immer sichtbar.
// Beschreibung + Technologien sind immer gemountet (aria-hidden/inert wenn
// geschlossen) und werden über die per JS gemessene Item-Höhe + CSS
// overflow:hidden ein-/ausgeblendet — kein Mount/Unmount-Blitzen beim
// Öffnen/Schließen.

// Geschätzte Höhe (px) des geschlossenen Items — dient CVSection nur als
// Platzhalter für die Panel-Mindesthöhe.
export const CLOSED_ITEM_HEIGHT_ESTIMATE = 130;

// Muss mit .content padding (24px oben+unten) in CVItem.module.scss
// synchron bleiben — dient als Ergänzung zur gemessenen .summary-Höhe, da
// .toggle position:absolute ist und selbst keine Höhe an .item weitergibt.
const TOGGLE_PADDING_Y = 48;

interface CVItemProps {
	entry: CVEntry;
	id: string;
}

export function CVItem({ entry, id }: CVItemProps) {
	const t = useTranslations("cv");
	const [isOpen, setIsOpen] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [closedHeight, setClosedHeight] = useState<number>();
	const [openHeight, setOpenHeight] = useState<number>();

	const detailsId = `cv-details-${id.replace(/[^a-zA-Z0-9-]+/g, "-")}`;
	const hasDesc = !!entry.description?.length;
	const hasTech = !!entry.technologies?.length;
	const hasExpandable = hasDesc || hasTech;

	const handleClick = () => {
		if (!hasExpandable) return;
		setIsOpen((open) => !open);
	};

	useLayoutEffect(() => {
		const summary = summaryRef.current;
		const content = contentRef.current;
		if (!summary || !content) return;

		const measure = () => {
			setClosedHeight(TOGGLE_PADDING_Y + summary.offsetHeight);
			setOpenHeight(content.offsetHeight);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(summary);
		observer.observe(content);
		return () => observer.disconnect();
	}, []);

	return (
		<li
			className={styles.item}
			data-open={isOpen || undefined}
			style={{ height: isOpen ? openHeight : closedHeight }}>
			<button
				onClick={handleClick}
				aria-expanded={isOpen}
				aria-controls={detailsId}
				disabled={!hasExpandable}
				data-expandable={hasExpandable || undefined}
				className={styles.toggle}>
				<div className={styles.content} ref={contentRef}>
					<div className={styles.summary} ref={summaryRef}>
						<div className={styles.header}>
							<p>
								<strong>
									{entry.organizationShort}
									{", "}
								</strong>
								{entry.location}
							</p>
							{entry.organizationLink && (
								<InteractionWrapper className={styles.orgLinkWrapper}>
									<Button
										href={entry.organizationLink}
										external
										size="xs"
										content="icon"
										aria-label={t("visit_organization_label", {
											organization: entry.organization,
										})}>
										<Icon icon={RiArrowRightUpLine} />
									</Button>
								</InteractionWrapper>
							)}
						</div>
						<div className={styles.rolesWrapper}>
							{entry.roles.map((role) => (
								<div
									key={`${role.title}-${role.startYear}-${role.startMonth}`}
									className={styles.roleWrapper}>
									<h2 className={styles.roleTitle}>{role.title}</h2>
									<span className={styles.timeWrapper}>
										{role.startMonth} {role.startYear} –{" "}
										{role.endMonth} {role.endYear}
									</span>
								</div>
							))}
						</div>
					</div>

					<div
						id={detailsId}
						aria-hidden={!isOpen}
						inert={!isOpen || undefined}
						style={{ display: "contents" }}>
						{hasDesc && (
							<ul className={styles.descList}>
								{entry.description?.map((point) => (
									<li key={point} className={styles.descItem}>
										{point}
									</li>
								))}
							</ul>
						)}

						{hasTech && (
							<div className={styles.techList}>
								{entry.technologies?.map((tech) => (
									<span key={tech} className={styles.techTag}>
										{tech}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</button>
		</li>
	);
}

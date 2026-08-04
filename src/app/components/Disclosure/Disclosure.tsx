import type { ReactNode } from "react";
import { RiArrowRightSLine } from "@remixicon/react";
import Icon from "../Icon";
import styles from "./Disclosure.module.scss";

interface DisclosureProps {
	summary: string;
	children: ReactNode;
	className?: string;
}

// Natives <details>/<summary>: Auf-/Zuklappen macht der Browser, deshalb kein
// "use client" und kein useState. <summary> ist von Haus aus fokussierbar und
// per Enter/Space bedienbar — der Pfeil ist reine Dekoration.
const Disclosure = ({ summary, children, className }: DisclosureProps) => (
	<details className={`${styles.details} ${className ?? ""}`}>
		<summary className={styles.summary}>
			<span className={styles.chevron} aria-hidden="true">
				<Icon icon={RiArrowRightSLine} />
			</span>
			<span>{summary}</span>
		</summary>
		<div className={styles.body}>{children}</div>
	</details>
);

export default Disclosure;

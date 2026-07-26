"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	RiArrowLeftLine,
	RiGithubLine,
	RiLinkedinBoxLine,
	RiMailLine,
} from "@remixicon/react";
import Icon from "../Icon";
import { copyTextToClipboard, getExternalLinkProps } from "../../lib/clickable";
import { useToast } from "../ToastNotification/ToastNotification";
import styles from "./Nav.module.scss";

type ItemVariant = "primary" | "secondary" | "ghost";

interface NavItemProps {
	variant: ItemVariant;
	href?: string;
	external?: boolean;
	onClick?: () => void;
	ariaLabel?: string;
	iconOnly?: boolean;
	children: ReactNode;
}

const NavItem = ({
	variant,
	href,
	external,
	onClick,
	ariaLabel,
	iconOnly,
	children,
}: NavItemProps) => {
	const className = `${styles.item} ${styles[variant]} ${iconOnly ? styles.iconItem : ""}`;

	if (href) {
		return (
			<Link
				href={href}
				aria-label={ariaLabel}
				{...(external ? getExternalLinkProps(true) : undefined)}
				className={className}>
				{children}
			</Link>
		);
	}

	return (
		<button type="button" onClick={onClick} aria-label={ariaLabel} className={className}>
			{children}
		</button>
	);
};

const Nav = () => {
	const t = useTranslations("layout.nav");
	const pathname = usePathname();
	const { showToast } = useToast();

	const copyEmail = async () => {
		const copied = await copyTextToClipboard(
			process.env.NEXT_PUBLIC_EMAIL ?? "",
		);
		showToast(
			copied ? t("email_copied") : t("email_copy_failed"),
			copied ? "success" : "error",
		);
	};

	return (
		<nav aria-label={t("nav_label")} className={styles.nav}>
			<div className={styles.container}>
				{pathname !== "/" && (
					<NavItem variant="ghost" iconOnly href="/" ariaLabel={t("back_to_home")}>
						<Icon icon={RiArrowLeftLine} />
					</NavItem>
				)}
				<NavItem
					variant="ghost"
					iconOnly
					external
					href="https://github.com/steffenaichele"
					ariaLabel={t("github_label")}>
					<Icon icon={RiGithubLine} />
				</NavItem>
				<NavItem
					variant="ghost"
					iconOnly
					external
					href="https://www.linkedin.com/in/steffenaichele"
					ariaLabel={t("linkedin_label")}>
					<Icon icon={RiLinkedinBoxLine} />
				</NavItem>
				<NavItem variant="primary" onClick={copyEmail}>
					<span>{t("email")}</span>
					<Icon icon={RiMailLine} />
				</NavItem>
			</div>
		</nav>
	);
};

export default Nav;

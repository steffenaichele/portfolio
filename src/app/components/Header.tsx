"use client";

import { useTranslations } from "next-intl";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";
import BlurEffect from "react-progressive-blur";
import { useView } from "./ViewProvider";

const navItems = [{ key: "home" }, { key: "work" }] as const;

const Header = () => {
	const t = useTranslations("layout");
	const tNav = useTranslations("layout.nav");
	const { view, requestView } = useView();

	return (
		<header
			className="sticky w-full max-w-xl mx-auto top-0 px-7 pt-[max(8rem,env(safe-area-inset-top))] pb-14 z-50 rounded-lg"
			aria-label="Site header">
			<BlurEffect
				className="absolute inset-0 h-full pointer-events-none"
				position="top"
				intensity={50}
			/>
			<div className="relative max-w-lg flex flex-row justify-between items-center min-h-11 z-10">
				<button
					type="button"
					aria-label={t("header.logo_label")}
					onClick={() => requestView("home")}
					className="h-11 flex items-center cursor-pointer">
					<Logo />
				</button>

				<nav aria-label={tNav("nav_label")}>
					<ToggleButton
						activeKey={view}
						options={navItems.map((item) => ({
							key: item.key,
							label: tNav(item.key),
							onClick: () => requestView(item.key),
						}))}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;

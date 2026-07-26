import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import Icon from "../components/Icon";

export type Size = "md" | "sm";
export type ContentType = "text" | "icon" | "iconText";

// Text-Kind anpassen (Icon-Kind bleibt unverändert) — die Kind-Struktur
// (Text-Element + optional <Icon>) bleibt dadurch immer exakt [Text, Icon],
// sonst würde ein zusätzliches Geschwister-Element die :last-child/:not(svg)
// CSS-Selektoren für Padding und Underline auf das falsche Kind lenken.
export const injectExternalSrOnly = (
	children: ReactNode,
	srOnlyClassName: string,
): ReactNode =>
	Children.map(children, (child) => {
		if (!isValidElement(child) || child.type === Icon) return child;
		const textChild = child as ReactElement<{ children?: ReactNode }>;
		return cloneElement(textChild, {
			children: (
				<>
					{textChild.props.children}
					<span className={srOnlyClassName}> (Opens in new window)</span>
				</>
			),
		});
	});

export const getExternalLinkProps = (external: boolean) => ({
	target: external ? "_blank" : undefined,
	rel: external ? "noopener noreferrer" : undefined,
});

// Text ins Clipboard kopieren; Rückgabe signalisiert Erfolg (Toast-Feedback
// beim Aufrufer). Ohne Clipboard-API (unsichere Kontexte) → false.
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
	if (!navigator.clipboard) return false;
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
};

"use client";

import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";

const EMAIL = "hi@steffenaichele.xyz";

export default function Imprint() {
	return (
		<>
			<h1>Impressum</h1>
			<p className="p-lg text-(--color-text-tertiary) ">
				Angaben gemäß § 5 TMG <br />
				<br />
				Steffen Aichele
				<br />
				[Straße] [Hausnummer] <br />
				[PLZ] Schwäbisch Gmünd
			</p>
			<Button
				variant="cta"
				content="iconRight"
				onClick={() => navigator.clipboard.writeText(EMAIL)}>
				Kontakt
				<Icon icon={Mail} />
			</Button>
		</>
	);
}

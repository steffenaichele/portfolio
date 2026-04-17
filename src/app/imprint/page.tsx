"use client";

import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";

export default function Imprint() {
	return (
		<section className="pt-50 px-5 flex flex-col items-start gap-10">
			<h1 className="5xl-regular text-(--color-text-primary)">
				Impressum
			</h1>
			<div className="md-reguar text-(--color-text-tertiary)">
				<p className="mb-4">Angaben gemäß § 5 TMG</p>
				<address className="not-italic">
					<p>Steffen Aichele</p>
					<p>Lönsstraße 4</p>
					<p>73529 Schwäbisch Gmünd</p>
				</address>
			</div>
				<Button
					variant="cta"
					content="iconRight"
					copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
					Kontakt
					<Icon icon={Mail} />
				</Button>

		</section>
	);
}

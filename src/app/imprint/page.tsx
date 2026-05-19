import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";

export const metadata: Metadata = {
	title: "Impressum – Steffen Aichele",
	description: "Impressum und Kontaktdaten von Steffen Aichele.",
};

export default function Imprint() {
	return (
		<section className="pt-50 flex flex-col items-start gap-10">
			<h1 className="text-4xl text-[var(--color-text-primary)]">
				Impressum
			</h1>
			<div className="text-[var(--color-text-tertiary)]">
				<p className="mb-4">Angaben gemäß § 5 TMG</p>
				<address className="not-italic">
					<p>Steffen Aichele</p>
					<p>Lönsstraße 4</p>
					<p>73529 Schwäbisch Gmünd</p>
				</address>
			</div>
				<Button
					variant="cta"
					size="md"
					content="iconRight"
					copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
					Kontakt
					<Icon icon={Mail} />
				</Button>

		</section>
	);
}

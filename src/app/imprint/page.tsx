"use client";

import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";

export default function Imprint() {
	return (
		<section className="layout-grid">
			<h1 className="col-start-3 -col-end-3 row-start-1 row-end-2">
				Impressum
			</h1>
			<div className="col-start-3 -col-end-3 row-start-2 row-end-3 p-md text-(--color-text-tertiary)">
				<p className="mb-4">Angaben gemäß § 5 TMG</p>
				<address className="not-italic">
					<p>Steffen Aichele</p>
					<p>Lönsstraße 4</p>
					<p>73529 Schwäbisch Gmünd</p>
				</address>
			</div>
			<div className="col-start-3 -col-end-3 row-start-3 row-end-4 pt-6">
				<Button
					variant="cta"
					content="iconRight"
					copyToClipboard={process.env.NEXT_PUBLIC_EMAIL}>
					Kontakt
					<Icon icon={Mail} />
				</Button>
			</div>
		</section>
	);
}

"use client";

import { Mail } from "lucide-react";
import Icon from "../components/Icon";
import Button from "../components/Button";

export default function Imprint() {
	return (
		<section className="layout-grid pt-64">
			<h1 className="col-start-3 -col-end-3 row-start-1 row-end-2">
				Impressum
			</h1>
			<p className="col-start-3 -col-end-3 row-start-2 row-end-3 p-md text-(--color-text-tertiary) ">
				Angaben gemäß § 5 TMG <br />
				<br />
				Steffen Aichele
				<br />
				Lönsstraße 4 <br />
				73529 Schwäbisch Gmünd
			</p>
			<div className="col-start-3 -col-end-3 row-start-3 row-end-4 pt-6">
				<Button
					variant="cta"
					content="iconRight"
					onClick={() =>
						navigator.clipboard.writeText(
							process.env.NEXT_PUBLIC_EMAIL ?? "",
						)
					}>
					Kontakt
					<Icon icon={Mail} />
				</Button>
			</div>
		</section>
	);
}

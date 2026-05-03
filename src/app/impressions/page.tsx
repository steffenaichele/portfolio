import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Über mich – Steffen Aichele",
	description:
		"Mehr über Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
};

export default function AboutMe() {
	return (
		<section className="pt-80 flex flex-col gap-24">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl text-[var(--color-text-primary)]">
					Impressions
				</h1>
				<p className="text-lg text-[var(--color-text-secondary)]">
					Ein Mix ausgewählter Arbeiten von Kundenprojekten, meinem
					Studium und anderen Stops meiner bisherigen Karriere.
				</p>
			</div>
		</section>
	);
}

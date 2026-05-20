import type { Metadata } from "next";
import ImpressionCard from "../components/ImpressionCard";
import { impressions, getProjectForImpression } from "../data/content";

export const metadata: Metadata = {
	title: "Impressions – Steffen Aichele",
	description:
		"Ausgewählte Arbeiten von Kundenprojekten, Studium und anderen Stationen meiner Karriere.",
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
			<div
				className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3">
				{impressions.map((impression) => (
					<ImpressionCard
						key={impression.id}
						impression={impression}
						project={getProjectForImpression(impression)}
					/>
				))}
			</div>
		</section>
	);
}

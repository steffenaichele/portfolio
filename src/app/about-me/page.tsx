import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Über mich – Steffen Aichele",
	description:
		"Mehr über Steffen Aichele – UX/UI Designer und Full Stack Developer aus Schwäbisch Gmünd.",
};

export default function AboutMe() {
	return (
		<section className="pt-50 px-5 flex flex-col gap-24">
			<h1 className="text-4xl text-(--color-text-primary)">About Me</h1>
            <p className="text-(--color-text-primary)">hello:)</p>
		</section>
	);
}

import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<>
			<section className="px-8 pt-100 justify-center flex flex-col gap-3">
				<h1 className="p-lg text-(--color-text-primary)">
					Hi, ich bin Steffen <span aria-label="Peace sign">✌🏻</span>
				</h1>
				<p className="p-lg text-(--color-text-tertiary)">
					Ich bin UX/UI Designer und Web Entwickler aus Schwäbisch
					Gmünd.
				</p>
			</section>
			<ProjectsSection />
			<CVSection />
		</>
	);
}

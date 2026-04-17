import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<>
			<section className="pt-150 px-5 ">
				<div className="flex flex-col gap-3">
					<h1 className="xl-regular text-(--color-text-primary)">
						Hi, ich bin Steffen{" "}
						<span aria-label="Peace sign">✌🏻</span>
					</h1>
					<p className="xl-regular text-(--color-text-tertiary)">
						Ich bin UX/UI Designer und Web Entwickler aus Schwäbisch
						Gmünd.
					</p>
				</div>
			</section>
			<ProjectsSection />
			<CVSection />
		</>
	);
}

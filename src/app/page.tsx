import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<>
			<section className="layout-grid pt-100 ">
				<div className="col-start-1 -col-end-1 row-start-1 row-end-2 flex flex-col gap-3">
					<h1 className="p-lg text-(--color-text-primary)">
						Hi, ich bin Steffen{" "}
						<span aria-label="Peace sign">✌🏻</span>
					</h1>
					<p className="row-end-3 p-lg text-(--color-text-tertiary)">
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

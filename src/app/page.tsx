import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<main className="col-start-1 -col-end-1">
			<HeroSection />
			<ProjectsSection />
			<CVSection />
		</main>
	);
}

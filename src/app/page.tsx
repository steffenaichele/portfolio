import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<main
			className="col-start-1 -col-end-1 grid grid-cols-subgrid gap-y-40 xl:gap-y-20 bg-(--foreground) text-(--text-primary)">
			<HeroSection />
			<CVSection />
			<ProjectsSection />
		</main>
	);
}

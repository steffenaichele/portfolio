import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<main className="bg-(--foreground) text-(--text-primary)">
			<HeroSection />
			<CVSection />
			<ProjectsSection />
		</main>
	);
}

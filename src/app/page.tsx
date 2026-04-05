import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";

export default function Home() {
	return (
		<main
			className="bg-(--color-bg-elevated) flex flex-col gap-24 pb-24 rounded-bl-squircle-lg rounded-br-squircle-lg corner-squircle">
			<HeroSection />
			<CVSection />
			<ProjectsSection />
		</main>
	);
}

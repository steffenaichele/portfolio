import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";
import BGGrid from "./components/BGGrid";

export default function Home() {
	return (
		<main className="bg-(--color-bg-elevated) bg-pattern flex flex-col gap-24 pb-24 rounded-bl-squircle-lg rounded-br-squircle-lg corner-squircle">
			<BGGrid />
			<HeroSection />
			<CVSection />
			<ProjectsSection />
		</main>
	);
}

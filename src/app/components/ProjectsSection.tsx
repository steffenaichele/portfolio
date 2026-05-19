import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Slideshow from "./Slideshow";
import Button from "./Button";

const slides = [
	{ src: "/projects/1.jpg", alt: "Projekt 1 Vorschau" },
	{ src: "/projects/2.jpg", alt: "Projekt 2 Vorschau" },
	{ src: "/projects/3.jpg", alt: "Projekt 3 Vorschau" },
];

const ProjectsSection = () => {
	return (
		<section className="flex flex-col gap-5 items-end">
				<Slideshow slides={slides} />
				<Button href="/projects" size="md" content="iconRight">
					Projekte ansehen
					<Icon icon={ArrowRight} />
				</Button>
		</section>
	);
};

export default ProjectsSection;

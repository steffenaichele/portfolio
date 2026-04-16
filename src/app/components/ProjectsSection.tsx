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
		<section className="layout-grid">
			<div className="col-start-1 -col-end-1 row-start-1 row-end-2 ">
				<Slideshow slides={slides} />
			</div>
			<div className="col-start-1 -col-end-1 row-start-2 row-end-3 flex justify-end">
				<Button href="/projects" content="iconRight">
					Projekte ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
};

export default ProjectsSection;

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Slideshow from "./Slideshow";

const slides = [
	{ src: "/projects/1.jpg", alt: "Projekt 1 Vorschau" },
	{ src: "/projects/2.jpg", alt: "Projekt 2 Vorschau" },
	{ src: "/projects/3.jpg", alt: "Projekt 3 Vorschau" },
];

const ProjectsSection = () => {
	return (
		<section className="layout-grid">
			<div className="col-start-2 -col-end-2 row-start-1 row-end-2 ">
				<Slideshow slides={slides} />
			</div>
			<div className="col-start-3 -col-end-3 row-start-2 row-end-3 flex justify-end">
				<Link
					href="/projects"
					className="bg-(--color-button-primary-bg) border-(--color-button-primary-stroke) border text-(--color-button-primary-label) shadow-(--shadow) hover:bg-(--color-button-primary-bg-hover) active:bg-(--color-button-primary-bg-active) active:scale-95 focus:outline-1 focus:outline-orange-300 h-11 flex-none label-md rounded-(--radius-button) corner-squircle inline-flex flex-row items-center justify-center transition-all duration-150 cursor-pointer select-none pl-4 pr-4 gap-2 [&_svg]:text-(--color-button-primary-icon)">
					Projekte ansehen
					<Icon icon={ArrowRight} />
				</Link>
			</div>
		</section>
	);
};

export default ProjectsSection;

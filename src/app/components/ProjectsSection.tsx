import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Slideshow from "./Slideshow";

const slides = [
	"/projects/1.jpg",
	"/projects/2.jpg",
	"/projects/3.jpg",
];

const ProjectsSection = () => {
	return (
		<section className="layout-grid gap-y-9">
			<h3 className="col-start-3 -col-end-3 row-start-1 row-end-2 text-(--text-tertiary)">
				work
			</h3>
			<div className="col-start-2 -col-end-2 row-start-2 row-end-3 ">
				<Slideshow slides={slides} />
			</div>
			<div className="col-start-2 -col-end-2 row-start-3 row-end-4">
				<Button content="iconRight" variant="primary">
					Projekte ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
};

export default ProjectsSection;

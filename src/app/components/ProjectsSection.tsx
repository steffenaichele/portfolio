import Button from "./Button";
import ProjectCardStack from "./ProjectCardStack";

const ProjectsSection = () => {
	return (
		<section className="col-start-3 -col-end-3 grid-cols-subgrid py-12">
			<div className="flex items-center justify-between h-10 pr-4 pl-8">
				<h3>projects</h3>
                <Button text="moin"/>
			</div>
			<ProjectCardStack />
		</section>
	);
};

export default ProjectsSection;

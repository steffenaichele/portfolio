import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/projects";

type Props = {
	project: Project;
};

const ProjectCard = ( { project }: Props) => {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="focus:outline-2 focus:outline-orange-300 focus:outline-offset-2 rounded-(--radius-surface) block">
			<div className="relative bg-(--color-surface-bg) border border-surface-stroke shadow-(--shadow) rounded-(--radius-surface) corner-squircle">
				<Image
					width={600}
					height={400}
					className="w-full h-full"
					src={project.coverImage}
					alt={project.title}
				/>
				<div className="absolute bottom-0 left-0">
					<h3>{project.title}</h3>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;

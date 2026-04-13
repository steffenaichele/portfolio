import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/projects";

type Props = {
	project: Project;
};

const ProjectCard = ( { project }: Props) => {
	return (
		<Link href={`/projekte/${project.slug}`} className="px-4">
			<div className="relative bg-(--color-surface-bg) border border-surface-stroke shadow-(--shadow) rounded-(--radius-surface) corner-squircle">
				<Image
					width={100}
					height={100}
					className="w-full h-full"
					src={project.coverImage}
					alt={project.title}
				/>
				<div className="absolute bottom-0 left-0">
					<h4>{project.title}</h4>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;

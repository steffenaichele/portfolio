import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/projects";

type Props = {
	project: Project;
};

const ProjectCard = ( { project }: Props) => {
	return (
		<Link href={`/projekte/${project.slug}`} className="px-4">
			<div className="relative bg-gray-300 h-[25vh] rounded-2xl">
				<Image width={100} height={100} className="w-full h-full" src={project.coverImage} alt={project.title} />
				<div className="absolute bg-gray-50 w-full bottom-0 left-0 px-4 pt-3 pb-4">
					<h4>{project.title}</h4>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;

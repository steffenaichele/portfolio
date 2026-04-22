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
			className="focus:outline-2 focus:outline-orange-300 focus:outline-offset-2 rounded-(--radius-surface) block transition-transform duration-200 [transition-timing-function:var(--ease-out)] hover:[@media(hover:hover)and(pointer:fine)]:translate-y-[-4px]">
			<Image
				width={600}
				height={400}
				className="w-full aspect-[2/3] bg-(--color-surface-bg) border border-surface-stroke shadow-(--shadow-soft) rounded-(--radius-surface) corner-squircle object-cover object-center"
				src={project.coverImage}
				alt={project.title}
			/>
		</Link>
	);
};

export default ProjectCard;

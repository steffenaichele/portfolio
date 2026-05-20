import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/content";

type Props = {
	project: Project;
};

const ProjectCard = ( { project }: Props) => {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="project-card focus:outline-2 focus:outline-orange-300 focus:outline-offset-2 rounded-[var(--radius-surface)] block">
			<Image
				width={600}
				height={400}
				className="w-full aspect-[2/3] bg-[var(--color-surface-bg)] border border-surface-stroke shadow-[var(--shadow-soft)] rounded-[var(--radius-surface)] corner-squircle object-cover object-center"
				src={project.coverImage}
				alt={project.title}
			/>
		</Link>
	);
};

export default ProjectCard;

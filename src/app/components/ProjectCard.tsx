import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/projects";

import Button from "@/app/components/Button";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

type Props = {
	project: Project;
};

const ProjectCard = ( { project }: Props) => {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="focus:outline-2 focus:outline-orange-300 focus:outline-offset-2 rounded-(--radius-surface) block">
			<div className="relative flex flex-col gap-4">
				<Image
					width={600}
					height={400}
					className="w-full aspect-2/3 bg-(--color-surface-bg) border border-surface-stroke shadow-(--shadow-soft) rounded-(--radius-surface) corner-squircle object-cover object-center"
					src={project.coverImage}
					alt={project.title}
				/>
				{/* <div className="flex justify-between items-center">
					<div className="flex flex-col">
						<h3 className="xl-regular text-(--color-text-primary)">
							{project.title}
						</h3>
						<p className="sm-regular text-(--color-text-tertiary)">
							{project.description}
						</p>
					</div>
					<Button variant="primary" content="iconOnly">
						<Icon icon={ArrowRight} />
					</Button>
				</div> */}
			</div>
		</Link>
	);
};

export default ProjectCard;

import { getPublicProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    const projects = getPublicProjects();

    return (
        <>
            <h1>Projekte</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.slug}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>
        </>
    );
}


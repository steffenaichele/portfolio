import ProjectCard from "./ProjectCard";

const ProjectCardStack = () => {
    return (
        <div className="flex flex-col py-4">
            <ProjectCard className="px-4 z-30"/>
            <ProjectCard className="px-8 -mt-46 z-20" />
            <ProjectCard className="px-14 -mt-46 z-10" />
        </div>
    );
};

export default ProjectCardStack;
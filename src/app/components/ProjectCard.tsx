const ProjectCard = ({ className }: { className: string }) => {
	return (
		<div className={className}>
			<div className="relative bg-gray-300 h-50 rounded-lg">
				<h3>Project Title</h3>
			</div>
		</div>
	);
};

export default ProjectCard;

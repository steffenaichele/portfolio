import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Icon from "./Icon";
import Slideshow from "./Slideshow";
import Button from "./Button";

const ProjectsSection = async () => {
	const t = await getTranslations('home');
	const slides = [
		{ src: "/projects/1.jpg", alt: t('slideshow_alt_1') },
		{ src: "/projects/2.jpg", alt: t('slideshow_alt_2') },
		{ src: "/projects/3.jpg", alt: t('slideshow_alt_3') },
	];
	return (
		<section className="flex flex-col gap-5 items-end">
			<Slideshow slides={slides} />
			<Button href="/projects" size="md" content="iconRight">
				{t('projects_button')}
				<Icon icon={ArrowRight} />
			</Button>
		</section>
	);
};

export default ProjectsSection;

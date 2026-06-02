import { getTranslations } from "next-intl/server";
import Slideshow from "./Slideshow";

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
		</section>
	);
};

export default ProjectsSection;

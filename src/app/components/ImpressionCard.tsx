import Image from "next/image";
import Link from "next/link";

import Button from "./Button";
import Icon from "./Icon";
import { ArrowRight } from "lucide-react";

import type { Impression } from "../data/impressions";

interface ImpressionCardProps {
	impression: Impression;
}

const ImpressionCard = ({ impression }: ImpressionCardProps) => {
	return (
		<div
			className={`flex justify-center items-center ${impression.square ? "aspect-square col-span-4 md:col-span-1" : "aspect-3/2 col-span-4 md:col-span-2"} group cursor-pointer`}>
			<div className="relative w-full h-full overflow-hidden bg-[var(--color-surface-bg)] hover:bg-[var(--color-surface-bg-hover)] rounded-[var(--radius-surface)] corner-squircle shadow-[var(--shadow-soft)] origin-center transition-transform duration-300 ease-out hover:scale-101">
				<div className="flex px-5 py-4">
					{/* Label – sichtbar bei Hover auf Desktop */}
					<div className="flex flex-wrap gap-x-1 gap-y-0.5">
						<p className="text-xs text-[var(--color-text-secondary)]">
							{impression.label}
						</p>
						<p className="text-xs text-[var(--color-text-tertiary)]">
							{" · "}
						</p>
						<p className="text-xs text-[var(--color-text-tertiary)]">
							{impression.context}
						</p>
					</div>
					{/* Button – sichtbar bei Hover auf Desktop */}
					{impression.link && (
						<Button href={impression.link} content="iconOnly">
							<Icon icon={ArrowRight} />
						</Button>
					)}
				</div>

				{/* Bild */}
				<Link
					href={impression.link || "#"}
					target={impression.link ? "_blank" : "_self"}
					className="absolute mt-12 h-auto inset-0">
					<Image
						src={`/impressions/${impression.src}`}
						alt={impression.alt}
						fill
						sizes="(max-width: 1024px) 50vw, 25vw"
						className="absolute w-full aspect-square cursor-alias object-contain transition-transform group-hover:scale-105"
					/>
				</Link>
			</div>
		</div>
	);
};

export default ImpressionCard;

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
				{/* Info bar – reveals on group-hover via grid resize (01) */}
				<div
					className="absolute top-0 left-0 right-0 z-10 grid grid-rows-[0fr] group-hover:grid-rows-[1fr]"
					style={{ transition: `grid-template-rows var(--resize-dur) var(--resize-ease)` }}>
					<div className="overflow-hidden min-h-0">
						<div className="flex px-5 py-4 bg-[var(--color-surface-bg)]">
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
							{impression.link && (
								<Button href={impression.link} content="iconOnly" aria-label={`${impression.label} öffnen`}>
									<Icon icon={ArrowRight} />
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* Bild – fills full card */}
				<Link
					href={impression.link || "#"}
					target={impression.link ? "_blank" : "_self"}
					className="absolute inset-0">
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

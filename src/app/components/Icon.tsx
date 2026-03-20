import { LucideIcon } from "lucide-react";

interface IconProps {
	icon: LucideIcon;
}

const Icon = ({ icon: LucideIcon }: IconProps) => (
	<LucideIcon size={20} strokeWidth={2} />
);

export default Icon;

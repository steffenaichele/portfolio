import { LucideIcon } from "lucide-react";

interface IconProps {
	icon: LucideIcon;
}

const Icon = ({ icon: LucideIcon }: IconProps) => (
	<LucideIcon size={16} strokeWidth={1.5} />
);

export default Icon;

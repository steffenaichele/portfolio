import { RemixiconComponentType } from "@remixicon/react";

interface IconProps {
	icon: RemixiconComponentType;
}

const Icon = ({ icon: RemixIcon }: IconProps) => <RemixIcon size={16} />;

export default Icon;

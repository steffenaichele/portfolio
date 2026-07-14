export type CVRole = {
	title: string;
	startMonth: string;
	startYear: number;
	endMonth: string;
	endYear: number;
	duration: string;
};

export type CVEntry = {
	organization: string;
	organizationShort: string;
	organizationLink?: string;
	location: string;
	roles: CVRole[];
	description?: string[];
	descriptionShort?: string;
	technologies?: string[];
	totalDuration: string;
	totalStartMonth: string;
	totalStartYear: number;
	totalEndMonth: string;
	totalEndYear: number;
};

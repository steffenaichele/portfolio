import { CVEntry } from "../data/cv";

type CVItemProps = {
	entry: CVEntry;
};

export default function CVItem({ entry }: CVItemProps) {
	return (
		<div>
			<p className="text-sm text-gray-600 flex gap-3">
				<span>
					{entry.roles[0].startMonth} {entry.roles[0].startYear}
				</span>
				<span>→</span>
				<span>
					{entry.roles[0].endMonth} {entry.roles[0].endYear}
				</span>
			</p>
			<h3>
				{entry.organization}, {entry.location}
			</h3>
			{entry.roles.map((role, index) => (
				<div key={index}>
					<div>
						<h4>{role.title}</h4>
					</div>
					<ul>
						{entry.description?.map((desc, descIndex) => (
							<li key={descIndex}>{desc}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

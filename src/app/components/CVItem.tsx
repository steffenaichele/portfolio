import { CVEntry } from "../data/cv";

type CVItemProps = {
    entry: CVEntry;
};

export default function CVItem({ entry }: CVItemProps) {
    return (
        <div>
            <h3>{entry.organization}, {entry.location}</h3>
            {entry.roles.map((role, index) => (
                <div key={index}>
                    <h4>{role.title} ({role.startMonth} {role.startYear} - {role.endMonth} {role.endYear})</h4>
                    <ul>
                        {entry.description.map((desc, descIndex) => (
                            <li key={descIndex}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
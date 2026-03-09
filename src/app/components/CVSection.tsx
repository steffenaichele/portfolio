import { expierience, education } from "../data/cv";
import CVItem from "./CVItem";

export default function CVSection() {
	return (
		<section className="col-start-3 -col-end-3 grid grid-cols-subgrid bg-amber-200">
			<div className="bg-blue-200 col-start-3 xl:col-start-5 -col-end-3 xl:col-end-8">
				<h2>Expierience</h2>
				{expierience.map((entry, index) => (
					<CVItem key={index} entry={entry} />
				))}
			</div>
			<div className="bg-blue-200 col-start-3 xl:col-start-9 -col-end-3 xl:col-end-12">
				<h2>Education</h2>
				{education.map((entry, index) => (
					<CVItem key={index} entry={entry} />
				))}
			</div>
		</section>
	);
}

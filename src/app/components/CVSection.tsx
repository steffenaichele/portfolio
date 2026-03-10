import { expierience, education } from "../data/cv";
import CVItem from "./CVItem";

export default function CVSection() {
	return (
		<section className="col-start-3 -col-end-3 grid grid-cols-subgrid">
			<div className=" col-start-3 xl:col-start-5 -col-end-3 xl:col-end-8">
				<h3>Expierience</h3>
				{expierience.map((entry, index) => (
					<CVItem key={index} entry={entry} />
				))}
			</div>
			<div className=" col-start-3 xl:col-start-9 -col-end-3 xl:col-end-12">
				<h3>Education</h3>
				{education.map((entry, index) => (
					<CVItem key={index} entry={entry} />
				))}
			</div>
		</section>
	);
}

import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

export default function CVSection() {
	return (
		<section className="col-start-1 xl:col-start-7 -col-end-1 xl:col-end-22 grid grid-cols-subgrid gap-y-9">
			<h3 className="col-start-3 -col-end-3 row-start-1 row-end-2 text-(--text-tertiary)">
				experience
			</h3>
			<div className="col-start-2 -col-end-2 row-start-2 row-end-3 flex flex-col gap-y-3 px-4 py-5 bg-neutral-100 rounded-2xl corner-squircle border border-neutral-300">
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">WBS Coding School</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<p className="mono">2025 → 2026</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Freelance</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<p className="mono">2025 → 2026</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Hochschule für Gestaltung</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<p className="mono">2021 → 2024</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Future Forms</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<p className="mono">2023 → 2024</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">halbautomaten</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<p className="mono">2022 → 2023</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">amplify design</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<p className="mono">2018 → 2021</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Johannes-Gutenberg-Schule</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<p className="mono">2017 → 2020</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Paperdice Solutions</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<p className="mono">2017 → 2018</p>
					</div>
				</div>
			</div>
			<div className="col-start-2 -col-end-2 row-start-3 row-end-4">
				<Button content="iconRight" variant="ghost" size="md">
					CV ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
}

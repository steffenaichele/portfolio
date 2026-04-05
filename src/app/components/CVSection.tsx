import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

export default function CVSection() {
	return (
		<section className="layout-grid gap-y-9 xl:gap-y-7">
			<h3 className="col-start-3 xl:col-start-1 -col-end-3 xl:col-end-2 row-start-1 row-end-2 text-(--text-tertiary)">
				experience
			</h3>
			<div className="col-start-2 xl:col-start-1 -col-end-2 xl:col-end-4 row-start-2 row-end-3 flex flex-col gap-y-3 px-4 py-5 bg-neutral-100 rounded-2xl corner-squircle border border-neutral-300">
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">WBS Coding School</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<h6>2025 → 2026</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Freelance</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<h6>2025 → 2026</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Hochschule für Gestaltung</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<h6>2021 → 2024</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Future Forms</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<h6>2023 → 2024</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">halbautomaten</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<h6>2022 → 2023</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">amplify design</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<h6>2018 → 2021</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Johannes-Gutenberg-Schule</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-sky-200 rounded-sm">
						<h6>2017 → 2020</h6>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h4 className="truncate mr-4">Paperdice Solutions</h4>
					<div className="items-center px-2 py-1 gap-x-4 bg-green-200 rounded-sm">
						<h6>2017 → 2018</h6>
					</div>
				</div>
			</div>
			<div className="col-start-2 -col-end-2 xl:col-end-4 row-start-3 xl:row-start-1 row-end-4 xl:row-end-2">
				<Button content="iconRight" variant="primary">
					CV ansehen
					<Icon icon={ArrowRight} />
				</Button>
			</div>
		</section>
	);
}

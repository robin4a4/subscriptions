import { Select } from "../Select";
import "./style.css";

import { useState } from "react";
import {
	FieldsetType,
	SUBSCRIPTIONS_CATEGORIES,
	SUBSCRIPTION_SERVICES,
} from "../../consts";
import { useAppContext } from "../../context";
import { Input } from "../Input";

function Fieldset({ item }: { item?: FieldsetType }) {
	const [visible, setVisible] = useState(true);
	const [services, setServices] = useState(
		item
			? SUBSCRIPTION_SERVICES.filter(
					(service) => service.category === item?.category,
			  )
			: SUBSCRIPTION_SERVICES,
	);
	if (!visible) return null;
	return (
		<fieldset className="form-fieldset">
			<Select
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
				value={item?.category}
				onValueChange={(value) => {
					setServices(
						SUBSCRIPTION_SERVICES.filter(
							(service) => service.category === value,
						),
					);
				}}
			/>
			<Select placeholder="Service" value={item?.service} options={services} />
			<Input placeholder="Price" defaultValue={item?.price} />
			<div className="buttons-fieldset">
				<button className="button-fieldset add" type="button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>save icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				</button>
				<button
					className="button-fieldset remove"
					type="button"
					onClick={() => {
						setVisible(false);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>remove icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 12h-15"
						/>
					</svg>
				</button>
			</div>
		</fieldset>
	);
}

export function Form() {
	const { data } = useAppContext();
	const [fieldsets, setFieldsets] = useState<FieldsetType[]>(data);

	const handleAddFieldset = () => {
		setFieldsets((prev) => [
			...prev,
			{
				id: undefined,
				category: undefined,
				service: undefined,
				price: 0,
				type: "monthly",
			},
		]);
	};
	return (
		<form className="form">
			{fieldsets.map((item, i) => (
				<Fieldset key={`${item.service}-${i}`} item={item} />
			))}
			<button
				className="add-fieldset"
				type="button"
				onClick={handleAddFieldset}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<title>plus icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>
			<div className="results">
				<b>00.00</b>&nbsp; €
			</div>
		</form>
	);
}

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
	const [services, setServices] = useState(
		item
			? SUBSCRIPTION_SERVICES.filter(
					(service) => service.category === item?.category,
			  )
			: SUBSCRIPTION_SERVICES,
	);
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
			<button className="save-fieldset" type="button">
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
		</fieldset>
	);
}

export function Form() {
	const { data } = useAppContext();
	return (
		<form className="form">
			{data.map((item) => (
				<Fieldset key={item.service} item={item} />
			))}
			<button className="add-fieldset" type="button">
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

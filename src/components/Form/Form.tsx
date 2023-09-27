import { Select } from "../Select";
import "./style.css";

import { useState } from "react";
import { SUBSCRIPTIONS_CATEGORIES, SUBSCRIPTION_SERVICES } from "../../consts";
import { Input } from "../Input";

function Fieldset() {
	const [services, setServices] = useState(SUBSCRIPTION_SERVICES);
	return (
		<fieldset className="form-fieldset">
			<Select
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
				onValueChange={(value) => {
					setServices(
						SUBSCRIPTION_SERVICES.filter(
							(service) => service.category === value,
						),
					);
				}}
			/>
			<Select placeholder="Service" options={services} />
			<Input placeholder="Price" />
		</fieldset>
	);
}

export function Form() {
	return (
		<form className="form">
			<Fieldset />
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

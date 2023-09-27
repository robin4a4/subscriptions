import { Select } from "../Select";
import "./style.css";

import { useState } from "react";
import { SUBSCRIPTIONS_CATEGORIES, SUBSCRIPTION_SERVICES } from "../../consts";
import { Input } from "../Input";

function Fieldset() {
	const [services, setServices] = useState(SUBSCRIPTION_SERVICES);
	console.log(services);
	return (
		<fieldset className="form-fieldset">
			<Select
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
				onValueChange={(value) => {
					console.log(value);
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
			<Fieldset />
			<Fieldset />
			<Fieldset />
		</form>
	);
}

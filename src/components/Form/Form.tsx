import { Select } from "../Select";
import "./style.css";

import { SUBSCRIPTION_SERVICES, SUBSCRIPTIONS_CATEGORIES } from "../../consts";
import { Input } from "../Input";

function Fieldset() {
	return (
		<fieldset className="form-fieldset">
			<Select
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
			/>
			<Select
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
			/>
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

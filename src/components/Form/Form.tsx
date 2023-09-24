import { Select } from "../Select";
import "./style.css";

export function Form() {
	return (
		<form className="form">
			<Select placeholder="Abonnements" options={[{label: "Disney+", value: "disneyplus"}]} />
			<Select placeholder="Abonnements" options={[{label: "Disney+", value: "disneyplus"}]} />
			<Select placeholder="Abonnements" options={[{label: "Disney+", value: "disneyplus"}]} />
		</form>
	);
}

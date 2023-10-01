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

function FormFieldset({ item }: { item?: FieldsetType }) {
	const [fieldsetState, setFieldsetState] = useState({
		visible: true,
		category: item?.category,
		service: item?.service,
		services: item
			? SUBSCRIPTION_SERVICES.filter(
					(service) => service.category === item?.category,
			  )
			: SUBSCRIPTION_SERVICES,
	});

	if (!fieldsetState.visible) return null;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		// @ts-ignore
		const formData = new FormData(form);
		fetch("/action", {
			method: "POST",
			body: formData,
		});
	};
	return (
		<form className="form-fieldset" onSubmit={handleSubmit}>
			<input type="hidden" name="id" defaultValue={item?.id} />
			<Select
				name="category"
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
				value={fieldsetState.category}
				onValueChange={(value) => {
					setFieldsetState({
						...fieldsetState,
						category: value,
						services: SUBSCRIPTION_SERVICES.filter(
							(service) => service.category === value,
						),
					});
				}}
			/>
			<Select
				name="service"
				placeholder="Service"
				value={fieldsetState.service}
				onValueChange={(value) => {
					setFieldsetState({ ...fieldsetState, service: value });
				}}
				options={fieldsetState.services}
			/>
			<Input
				placeholder="Price"
				name="price"
				defaultValue={item?.price}
				unit="€"
			/>
			<div className="buttons-fieldset">
				<button className="button-fieldset add" type="submit">
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
						setFieldsetState({ ...fieldsetState, visible: false });
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
		</form>
	);
}

export function FormContainer() {
	const { data } = useAppContext();
	const [fieldsets, setFieldsets] = useState<FieldsetType[]>(data);
	const total = fieldsets.reduce((acc, item) => acc + item.price, 0);
	const handleAddFieldset = () => {
		setFieldsets([
			...fieldsets,
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
		<div className="form-container">
			{fieldsets.map((item, i) => (
				<FormFieldset key={`${item.service}-${i}`} item={item} />
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
				<b>{total.toLocaleString("fr-FR")}</b>&nbsp; €
			</div>
		</div>
	);
}

import { Select } from "../Select";
import "./style.css";

import { useState } from "react";
import {
	FieldsetType,
	SUBSCRIPTIONS_CATEGORIES,
	SUBSCRIPTION_SERVICES,
	SUBSCRIPTION_TYPES,
} from "../../consts";
import { useAppContext } from "../../context";
import { Input } from "../Input";
import {
	CategoryIcon,
	CheckIcon,
	MinusIcon,
	PlusIcon,
	ServiceIcon,
	TypeIcon,
} from "../../icons";

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
		type: item?.type,
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
				icon={<CategoryIcon />}
			/>
			<Select
				name="service"
				placeholder="Service"
				value={fieldsetState.service}
				onValueChange={(value) => {
					setFieldsetState({ ...fieldsetState, service: value });
				}}
				options={fieldsetState.services}
				icon={<ServiceIcon />}
			/>
			<Select
				name="type"
				placeholder="Type"
				value={fieldsetState.type}
				onValueChange={(value) => {
					setFieldsetState({ ...fieldsetState, type: value });
				}}
				options={SUBSCRIPTION_TYPES}
				icon={<TypeIcon />}
			/>
			<Input
				placeholder="Price"
				name="price"
				defaultValue={item?.price}
				unit="€"
			/>
			<div className="buttons-fieldset">
				<button className="button-fieldset add" type="submit">
					<CheckIcon />
				</button>
				<button
					className="button-fieldset remove"
					type="button"
					onClick={() => {
						setFieldsetState({ ...fieldsetState, visible: false });
					}}
				>
					<MinusIcon />
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
				<PlusIcon />
			</button>
			<div className="results">
				<b>{total.toLocaleString("fr-FR")}</b>&nbsp; €
			</div>
		</div>
	);
}

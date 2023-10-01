import { Select } from "../Select";
import "./style.css";

import { useState } from "react";
import {
	FieldsetType,
	SUBSCRIPTIONS_CATEGORIES,
	SUBSCRIPTION_SERVICES,
	SUBSCRIPTION_TYPES,
	SubscriptionTypes,
} from "../../consts";
import { useAppContext } from "../../context";
import {
	CategoryIcon,
	CheckIcon,
	MinusIcon,
	PlusIcon,
	ServiceIcon,
	TypeIcon,
} from "../../icons";
import { Input } from "../Input";

function FormFieldset({
	item,
	index,
	fieldsets,
	setFieldsets,
}: {
	item?: FieldsetType;
	index: number;
	fieldsets: FieldsetType[];
	setFieldsets: (fieldsets: FieldsetType[]) => void;
}) {
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

	const handleFieldsetsChange = <TFieldsetData,>(
		fieldsetData: TFieldsetData,
	) => {
		const newFieldsets = [...fieldsets];
		newFieldsets[index] = {
			...newFieldsets[index],
			...fieldsetData,
		};
		setFieldsets(newFieldsets);
	};

	return (
		<form className="form-fieldset" onSubmit={handleSubmit}>
			<input type="hidden" name="id" defaultValue={item?.id} />
			<Select
				name="category"
				placeholder="Category"
				options={Object.values(SUBSCRIPTIONS_CATEGORIES)}
				value={fieldsets[index].category}
				onValueChange={(value) =>
					handleFieldsetsChange({
						category: value,
					})
				}
				icon={<CategoryIcon />}
			/>
			<Select
				name="service"
				placeholder="Service"
				value={fieldsets[index].service}
				onValueChange={(value) =>
					handleFieldsetsChange({
						service: value,
					})
				}
				options={SUBSCRIPTION_SERVICES.filter(
					(service) => service.category === fieldsets[index].category,
				)}
				icon={<ServiceIcon />}
			/>
			<Select
				name="type"
				placeholder="Type"
				value={fieldsets[index].type}
				onValueChange={(value) => {
					handleFieldsetsChange({ type: value });
				}}
				options={SUBSCRIPTION_TYPES}
				icon={<TypeIcon />}
			/>
			<Input
				placeholder="Price"
				name="price"
				defaultValue={item?.price}
				onChange={(event) => {
					handleFieldsetsChange({
						// @ts-ignore
						price: (event.target as HTMLInputElement).value,
					});
				}}
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
						const newFieldsets = [...fieldsets];
						newFieldsets.splice(index, 1);
						setFieldsets(newFieldsets);
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
	const [resultType, setResultType] =
		useState<SubscriptionTypes["slug"]>("monthly");
	const total =
		fieldsets.reduce((acc, item) => Number(acc) + Number(item.price), 0) *
		(resultType === "monthly" ? 1 : 12);
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
				<FormFieldset
					key={`${item.service}-${i}`}
					index={i}
					item={item}
					fieldsets={fieldsets}
					setFieldsets={setFieldsets}
				/>
			))}
			<button
				className="add-fieldset"
				type="button"
				onClick={handleAddFieldset}
			>
				<PlusIcon />
			</button>
			<div className="results">
				<Select
					name="type"
					placeholder="Type"
					value={resultType}
					onValueChange={(value) => {
						setResultType(value);
					}}
					options={SUBSCRIPTION_TYPES}
					icon={<TypeIcon />}
				/>
				<span>
					<b>{total.toLocaleString("fr-FR")}</b>&nbsp; € /{" "}
					{resultType === "monthly" ? "mois" : "an"}
				</span>
			</div>
		</div>
	);
}

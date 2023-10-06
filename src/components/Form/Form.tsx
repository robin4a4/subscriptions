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
	SpinnerIcon,
	TypeIcon,
} from "../../icons";
import { Input } from "../Input";

function FormFieldset({
	index,
	fieldsets,
	setFieldsets,
}: {
	index: number;
	fieldsets: FieldsetType[];
	setFieldsets: (fieldsets: FieldsetType[]) => void;
}) {
	const item = fieldsets[index];
	const [submitting, setSubmitting] = useState(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitting(true);
		const form = event.currentTarget;
		// @ts-ignore
		const formData = new FormData(form);
		fetch("/action", {
			method: "POST",
			body: formData,
		}).finally(() => {
			setSubmitting(false);
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
				value={item.category}
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
				value={item.service}
				onValueChange={(value) =>
					handleFieldsetsChange({
						service: value,
					})
				}
				options={SUBSCRIPTION_SERVICES.filter(
					(service) => service.category === item.category,
				)}
				icon={<ServiceIcon />}
			/>
			<Select
				name="type"
				placeholder="Type"
				value={item.type}
				onValueChange={(value) => {
					handleFieldsetsChange({ type: value });
				}}
				options={SUBSCRIPTION_TYPES}
				icon={<TypeIcon />}
			/>
			<Input
				placeholder="Price"
				type="number"
				step="0.01"
				name="price"
				defaultValue={item?.price.toString()}
				onChange={(event) => {
					handleFieldsetsChange({
						price:
							// @ts-ignore
							(event.target as HTMLInputElement).value,
					});
				}}
				unit={`€ / ${item.type === "monthly" ? "month" : "year"}`}
			/>
			<div className="buttons-fieldset">
				<button className="button-fieldset add" type="submit">
					{submitting ? <SpinnerIcon /> : <CheckIcon />}
				</button>
				<button
					className="button-fieldset remove"
					type="button"
					onClick={() => {
						const newFieldsets = [...fieldsets];
						setFieldsets(newFieldsets);
						newFieldsets.splice(index, 1);
						fetch("/action", {
							method: "DELETE",
							body: JSON.stringify({
								id: item.id,
							}),
						}).catch(() => {
							setFieldsets(fieldsets);
						});
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
		fieldsets.reduce(
			(acc, item) =>
				Number(acc) + Number(item.price) / (item.type === "monthly" ? 1 : 12),
			0,
		) * (resultType === "monthly" ? 1 : 12);
	const handleAddFieldset = () => {
		setFieldsets([
			...fieldsets,
			{
				id: undefined,
				category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
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
					<b>
						{total.toLocaleString("fr-FR", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</b>
					&nbsp; € / {resultType === "monthly" ? "month" : "year"}
				</span>
			</div>
		</div>
	);
}

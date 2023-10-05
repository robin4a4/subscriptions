import * as SelectRadix from "@radix-ui/react-select";
import { PropsWithChildren, ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../../icons";
import "./style.css";

export function Select<TOptions extends readonly Record<string, string>[]>({
	name,
	placeholder,
	options,
	disabled,
	value,
	onValueChange,
	icon,
}: {
	name: string;
	placeholder: string;
	options: TOptions;
	disabled?: boolean;
	value?: TOptions extends readonly { name: string; slug: infer TSlug }[]
		? TSlug
		: undefined;
	onValueChange?: (
		value: TOptions extends readonly { name: string; slug: infer TSlug }[]
			? TSlug
			: string,
	) => void;
	icon?: ReactNode;
}) {
	return (
		<SelectRadix.Root value={value} onValueChange={onValueChange} name={name}>
			<SelectRadix.Trigger
				className="SelectTrigger"
				aria-label="Select"
				disabled={disabled}
			>
				{icon ? (
					<SelectRadix.Icon className="SelectIcon">{icon}</SelectRadix.Icon>
				) : null}

				<SelectRadix.Value placeholder={placeholder}>
					{
						options.find((option) => option.slug === value)?.name // this is needed for ssr to show the selected value immediately
					}
				</SelectRadix.Value>
				<SelectRadix.Icon className="SelectIcon">
					<ChevronDownIcon />
				</SelectRadix.Icon>
			</SelectRadix.Trigger>
			<SelectRadix.Portal>
				<SelectRadix.Content className="SelectContent" position="popper">
					<SelectRadix.Viewport className="SelectViewport">
						{options.map((option) => (
							<SelectItem key={option.slug} value={option.slug}>
								{option.name}
							</SelectItem>
						))}
					</SelectRadix.Viewport>
				</SelectRadix.Content>
			</SelectRadix.Portal>
		</SelectRadix.Root>
	);
}

const SelectItem = ({
	children,
	...props
}: PropsWithChildren<{
	value: string;
}>) => {
	return (
		<SelectRadix.Item className="SelectItem" {...props}>
			<SelectRadix.ItemText>{children}</SelectRadix.ItemText>
			<SelectRadix.ItemIndicator className="SelectItemIndicator">
				<CheckIcon />
			</SelectRadix.ItemIndicator>
		</SelectRadix.Item>
	);
};

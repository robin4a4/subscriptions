import * as SelectRadix from "@radix-ui/react-select";
import { PropsWithChildren } from "react";
import "./style.css";

export function Select<TOptions extends readonly Record<string, string>[]>({
	placeholder,
	options,
	disabled,
	value,
	onValueChange,
}: {
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
}) {
	return (
		<SelectRadix.Root value={value} onValueChange={onValueChange}>
			<SelectRadix.Trigger
				className="SelectTrigger"
				aria-label="Food"
				disabled={disabled}
			>
				<SelectRadix.Value placeholder={placeholder} />
				<SelectRadix.Icon className="SelectIcon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
					>
						<title>chevron down icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
				</SelectRadix.Icon>
			</SelectRadix.Trigger>
			<SelectRadix.Portal>
				<SelectRadix.Content className="SelectContent">
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
				>
					<title>check icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4.5 12.75l6 6 9-13.5"
					/>
				</svg>
			</SelectRadix.ItemIndicator>
		</SelectRadix.Item>
	);
};

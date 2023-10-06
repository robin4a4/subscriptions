import { ComponentProps } from "react";
import "./style.css";

export function Input(
	props: ComponentProps<"input"> & {
		unit?: string;
	},
) {
	return (
		<div className="Input">
			<input {...props} />
			{props.unit && <span className="InputUnit">{props.unit}</span>}
		</div>
	);
}

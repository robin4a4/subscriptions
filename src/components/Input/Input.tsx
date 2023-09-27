import { ComponentProps } from "react";
import "./style.css";

export function Input(props: ComponentProps<"input">) {
	return <input className="Input" {...props} type="text" />;
}

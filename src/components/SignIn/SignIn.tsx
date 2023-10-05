import { Input } from "../Input";
import "./style.css";

export function SignInFormContainer() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		fetch("/connect", {
			method: "POST",
			// @ts-ignore
			body: new FormData(form),
		}).then(() => {
			// @ts-ignore
			window.location.reload();
		});
	};
	return (
		<form className="signin-container" onSubmit={handleSubmit}>
			<Input type="text" name="username" placeholder="Username" />
			<Input type="password" name="password" placeholder="Password" />
			<button type="submit">Connect</button>
		</form>
	);
}

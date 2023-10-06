import { useEffect } from "react";
import { FormContainer } from "./components/Form";
import { Layout } from "./components/Layout";
import { SignInFormContainer } from "./components/SignIn";
import { FieldsetType } from "./consts";
import { AppProvider } from "./context";

export function App({
	data,
	manifest,
}: {
	data: { isAdmin?: boolean; fieldsets?: FieldsetType[] };
	manifest: string[];
}) {
	// add transition back after page load
	useEffect(() => {
		// @ts-ignore
		if (typeof document !== "undefined")
			// @ts-ignore
			document.body.classList.remove("css-transitions-only-after-page-load");
	}, []);

	if (!data.isAdmin)
		return (
			<Layout manifest={manifest}>
				<SignInFormContainer />
			</Layout>
		);
	if (data.fieldsets)
		return (
			<Layout manifest={manifest}>
				<AppProvider data={data.fieldsets}>
					<FormContainer />
				</AppProvider>
			</Layout>
		);
}

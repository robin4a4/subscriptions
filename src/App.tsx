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

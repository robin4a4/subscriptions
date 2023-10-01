import { FormContainer } from "./components/Form";
import { Layout } from "./components/Layout";
import { FieldsetType } from "./consts";
import { AppProvider } from "./context";

export function App({
	data,
	manifest,
}: {
	data: FieldsetType[];
	manifest: string[];
}) {
	return (
		<AppProvider data={data}>
			<Layout manifest={manifest}>
				<div className="container">
					<h1>🤑 Subscriptions</h1>
					<FormContainer />
				</div>
			</Layout>
		</AppProvider>
	);
}

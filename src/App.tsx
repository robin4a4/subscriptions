import { Form } from "./components/Form";
import { Layout } from "./components/Layout";
import { AppProvider } from "./context";

export function App({
  data,
  manifest,
}: {
  data: { id: string | null }[];
  manifest: string[];
}) {
  return (
    <AppProvider data={data}>
      <Layout manifest={manifest}>
        <Form />
      </Layout>
    </AppProvider>
  );
}

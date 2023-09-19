import { Form } from "./Form";
import { Todos } from "./Todos";
import { Layout } from "./Layout";
import { AppProvider } from "../context";

export function App({ data }: { data: { id: string | null }[] }) {
  return (
    <AppProvider data={data}>
      <Layout>
        <Todos data={data} />
        <Form />
      </Layout>
    </AppProvider>
  );
}

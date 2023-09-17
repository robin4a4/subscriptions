import { Form } from "./Form";
import { Layout } from "./Layout";

export function App() {
  return (
    <Layout>
      <Form />
      <script src="/dist/client.js" type="module" />
    </Layout>
  );
}

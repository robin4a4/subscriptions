import { Form } from "./Form";
import { Todos } from "./Todos";
import { Layout } from "./Layout";
import { useState } from "react";

export function App({ data }: { data: any[] }) {
  const [open, setOpen] = useState(true);
  return (
    <Layout>
      <Todos data={data} />
      {open ? <Todos data={data} /> : "Click the button to load todos"}
      <Form />
      <button type="button" onClick={() => setOpen(!open)}>
        toggle
      </button>
    </Layout>
  );
}

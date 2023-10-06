import { renderToReadableStream } from "react-dom/server";
import { App } from "../App";
import { FieldsetType } from "../consts";
import { Database } from "bun:sqlite";
const db = new Database("./data/mydb.sqlite", { create: true });
const query = db.query(
  "CREATE TABLE IF NOT EXISTS fieldsets (id INTEGER PRIMARY KEY, category TEXT, service TEXT, price DECIMAL, type TEXT);"
);
query.run();
export function createServer({ manifest }: { manifest: string[] }) {
  return Bun.serve({
    port: process.env.PORT || 8080,
    async fetch(req) {
      const url = new URL(req.url);
      // return index.html for root path
      if (url.pathname === "/") {
        if (!process.env.PASSWORD)
          return new Response("Not Found", { status: 404 });

        const cookie =
          req.headers.get("cookie")?.split("__connect__=")[1] ?? "";
        const isAdmin = await Bun.password.verify(
          process.env.PASSWORD.toString(),
          cookie
        );
        let fieldsets: FieldsetType[] = [];
        if (isAdmin) {
          const query = db.query("SELECT * FROM fieldsets");
          fieldsets = query.all() as FieldsetType[];
        }
        const data = { isAdmin, fieldsets };
        const stream = await renderToReadableStream(
          <App data={data} manifest={manifest} />,
          {
            bootstrapScripts: ["/dist/client.js"],
            bootstrapScriptContent: `
						window.__INITIAL_DATA__=${JSON.stringify(data)};
      					window.__MANIFEST__=${JSON.stringify(manifest)};`,
          }
        );
        return new Response(stream, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }

      if (url.pathname === "/connect") {
        const formdata = await req.formData();
        const username = formdata.get("username")?.toString() ?? "";
        const password = formdata.get("password")?.toString() ?? "";

        if (
          username !== process.env.USERNAME ||
          password !== process.env.PASSWORD
        ) {
          return new Response("Not Found", { status: 404 });
        }
        const hashedPassword = await Bun.password.hash(password);
        return new Response("Success", {
          headers: {
            "Set-Cookie": `__connect__=${hashedPassword};`,
          },
        });
      }

      if (url.pathname === "/action") {
        if (req.method === "DELETE") {
          const { id } = await req.json();
          if (id) {
            const query = db.query("DELETE FROM fieldsets WHERE id = $id");
            query.all({
              $id: id,
            });
          }
          return new Response("Success");
        } else {
          const formdata = await req.formData();
          const id = formdata.get("id")?.toString();
          const category = formdata.get("category")?.toString() ?? "";
          const service = formdata.get("service")?.toString() ?? "";
          const price = formdata.get("price")?.toString() ?? "";
          const type = formdata.get("type")?.toString() ?? "monthly";
          if (id) {
            const query = db.query(
              "UPDATE fieldsets SET category = $category, service = $service, price = $price, type = $type WHERE id = $id"
            );
            query.all({
              $id: id,
              $category: category,
              $service: service,
              $price: price,
              $type: type,
            });
          } else {
            const query = db.query(
              "INSERT INTO fieldsets (category, service, price, type) VALUES ($category, $service, $price, $type)"
            );
            query.all({
              $category: category,
              $service: service,
              $price: price,
              $type: type,
            });
          }
          return new Response("Success");
        }
      }

      // return dist files
      if (url.pathname.startsWith("/dist")) {
        const file = Bun.file(url.pathname.replace(/^\/+/, ""));
        if (!file) return new Response("Not Found", { status: 404 });
        return new Response(file, {
          headers: {
            "Content-Type": file.type,
          },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
    error(e) {
      console.error(e);
      return new Response("Internal Server Error", { status: 500 });
    },
  });
}

import { renderToReadableStream } from "react-dom/server";
import { App } from "../App";
import { FieldsetType } from "../consts";
import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite", { create: true });
const query = db.query(
	"CREATE TABLE IF NOT EXISTS fieldsets (id INTEGER PRIMARY KEY, category TEXT, service TEXT, price DECIMAL, type TEXT);",
);
query.run();
export function createServer({
	manifest,
}: {
	manifest: string[];
}) {
	return Bun.serve({
		port: process.env.PORT || 8080,
		async fetch(req) {
			const url = new URL(req.url);
			// return index.html for root path
			if (url.pathname === "/") {
				const fieldsets: FieldsetType[] = [
					{
						id: 1,
						category: "streaming",
						service: "netflix",
						price: 10.99,
						type: "monthly",
					},
					{
						id: 2,
						category: "streaming",
						service: "hulu",
						price: 5.99,
						type: "monthly",
					},
				];
				const stream = await renderToReadableStream(
					<App data={fieldsets} manifest={manifest} />,
					{
						bootstrapScripts: ["/dist/client.js"],
						bootstrapScriptContent: `
      window.__INITIAL_DATA__=${JSON.stringify(fieldsets)};
      window.__MANIFEST__=${JSON.stringify(manifest)};
      `,
					},
				);
				return new Response(stream, {
					headers: {
						"Content-Type": "text/html",
					},
				});
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

			if (url.pathname === "/action") {
				const formdata = await req.formData();
				const id = formdata.get("id")?.toString();
				const category = formdata.get("category")?.toString() ?? "";
				const service = formdata.get("service")?.toString() ?? "";
				const price = formdata.get("price")?.toString() ?? "";
				if (id) {
					const query = db.query(
						"UPDATE fieldsets SET category = $category, service = $service, price = $price WHERE id = $id",
					);
					query.all({
						$category: category,
						$service: service,
						$price: price,
						$id: id,
					});
				} else {
					const query = db.query(
						"INSERT INTO fieldsets (category, service, price) VALUES ($category, $service, $price)",
					);
					query.all({
						$category: category,
						$service: service,
						$price: price,
					});
				}
				return new Response("Success");
			}

			return new Response("Not Found", { status: 404 });
		},
		error(e) {
			console.error(e);
			return new Response("Internal Server Error", { status: 500 });
		},
	});
}

import { renderToReadableStream } from "react-dom/server";
import { App } from "../App";
import { FieldsetType } from "../consts";
// import { Database } from "bun:sqlite";
// const db = new Database("mydb.sqlite", { create: true });
// const query = db.query(
// 	"CREATE TABLE IF NOT EXISTS fieldsets (id INTEGER PRIMARY KEY, category TEXT, service TEXT, price DECIMAL, type TEXT);",
// );
// query.run();
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

			// parse formdata at /action
			// if (url.pathname === "/action") {
			//   const formdata = await req.formData();
			//   const name = formdata.get("name");
			//   const profilePicture = formdata.get("profilePicture");
			//   if (!profilePicture) throw new Error("Must upload a profile picture.");
			//   // write profilePicture to disk
			//   await Bun.write("profilePicture.png", profilePicture);
			//   return new Response("Success");
			// }

			return new Response("Not Found", { status: 404 });
		},
		error(e) {
			console.error(e);
			return new Response("Internal Server Error", { status: 500 });
		},
	});
}

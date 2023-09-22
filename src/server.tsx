import { renderToReadableStream } from "react-dom/server";
import { App } from "./App";

const manifestString = await Bun.file("dist/manifest.json").text();
const manifest = JSON.parse(manifestString);

const server = Bun.serve({
  port: process.env.PORT || 8080,
  async fetch(req) {
    const url = new URL(req.url);
    // return index.html for root path
    if (url.pathname === "/") {
      const data = await fetch("https://jsonplaceholder.typicode.com/todos");
      const todos = await data.json();

      const stream = await renderToReadableStream(
        <App data={todos} manifest={manifest} />,
        {
          bootstrapScripts: ["/dist/client.js"],
          bootstrapScriptContent: `
          window.__INITIAL_DATA__=${JSON.stringify(todos)};
          window.__MANIFEST__=${manifestString};
          `,
        }
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
console.log(`Listening on port ${server.port}`);

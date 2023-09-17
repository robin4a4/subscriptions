import { renderToReadableStream } from "react-dom/server";
import { App } from "./components/App";

const server = Bun.serve({
  port: process.env.PORT || 8080,
  async fetch(req) {
    const url = new URL(req.url);
    // return index.html for root path
    if (url.pathname === "/") {
      const stream = await renderToReadableStream(<App />);

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

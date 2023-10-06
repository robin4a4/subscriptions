import { createServer } from "./utils/create-server";

const manifestString = await Bun.file("dist/manifest.json").text();
const manifest = JSON.parse(manifestString);

const server = createServer({ manifest });

console.log(`Listening on port ${server.port}`);

import { createServer } from "../src/utils/create-server";

console.log("Building...");
const result = await Bun.build({
  entrypoints: ["src/client.tsx"],
  outdir: "./dist",
});

const manifest = result.outputs.map((output) => {
  return output.path.split("/").pop();
}) as string[];

const server = createServer({ manifest });

console.log(`Listening on port ${server.port}`);

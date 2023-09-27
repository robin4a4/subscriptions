const result = await Bun.build({
  entrypoints: ["src/client.tsx"],
  outdir: "./dist",
});

const manifestObject = result.outputs.map((output) => {
  return output.path.split("/").pop();
});
console.log("manifestObject", manifestObject);
console.log(JSON.stringify(manifestObject));
Bun.write("dist/manifest.json", JSON.stringify(manifestObject));

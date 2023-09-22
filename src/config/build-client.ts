const result = await Bun.build({
	entrypoints: ["src/client.tsx"],
	outdir: "./dist",
});

const manifestObject = result.outputs.map((output) => {
	return output.path.split("/").pop();
});
Bun.write("dist/manifest.json", JSON.stringify(manifestObject));

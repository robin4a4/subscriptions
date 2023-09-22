import { hydrateRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./global.css";

hydrateRoot(
	// @ts-ignore
	document,
	// @ts-ignore
	<App data={window.__INITIAL_DATA__} manifest={window.__MANIFEST__} />,
);

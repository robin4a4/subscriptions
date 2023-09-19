import { hydrateRoot } from "react-dom/client";
import { App } from "./components/App.tsx";

// @ts-ignore
hydrateRoot(document, <App data={window.__INITIAL_DATA__} />);

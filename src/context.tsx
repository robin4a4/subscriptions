import { PropsWithChildren, createContext, useContext } from "react";
import { FieldsetType } from "./consts";

type AppContextType = {
	data: FieldsetType[];
};
export const AppContext = createContext<AppContextType>({
	data: [],
});

export function AppProvider({
	data,
	children,
}: PropsWithChildren<AppContextType>) {
	return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}

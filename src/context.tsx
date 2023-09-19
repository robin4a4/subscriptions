import { PropsWithChildren, createContext } from "react";

type AppContextType = {
  data: {
    id: string | null;
  }[];
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

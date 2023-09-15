import { createContext } from "react";
import useGetMeteoriteData from "../Hooks/useGetMeteoriteData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, loading, error } = useGetMeteoriteData();

  const value = { data, loading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

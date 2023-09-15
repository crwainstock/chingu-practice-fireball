import { createContext } from "react";
import useGetLandingData from "../Hooks/useGetLandingData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, loading, error } = useGetLandingData();

  const value = { data, loading, error };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// https://gist.githubusercontent.com/crwainstock/59650ea0c7d88b4a9a0531aa52c56353/raw/b1905fb1fee896b776d520ebf7db020cf6634691/meteorData.csv

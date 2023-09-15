import { useContext } from "react";
import { DataContext } from "../Context/DataProvider";

export function useDataContext() {
  return useContext(DataContext);
}

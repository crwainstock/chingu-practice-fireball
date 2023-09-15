import { useState } from "react";
import Summary from "./Components/Summary/Summary";
import { useDataContext } from "./Hooks/useDataContext";
import "./App.css";

function App() {
  const { data, loading } = useDataContext().data;

  console.log(data);
  return (
    <div>
      <h1>Fireball App goes here.</h1>
      <Summary />
    </div>
  );
}

export default App;

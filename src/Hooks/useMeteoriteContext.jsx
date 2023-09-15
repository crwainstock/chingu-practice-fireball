import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const MeteoriteContext = createContext();

export function useMeteoriteContext() {
  return useContext(MeteoriteContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await d3Fetch.csv(
          "https://gist.githubusercontent.com/crwainstock/59650ea0c7d88b4a9a0531aa52c56353/raw/b1905fb1fee896b776d520ebf7db020cf6634691/meteorData.csv"
        );
        setData(data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
  }, []);

  //   const fetchData = async () => {
  //     // setLoading(true);
  //     try {
  //       let data = await d3Fetch.csv(
  //         "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv"
  //       );

  //       //   setLoading(false);
  //       console.log({ data });
  //       // data.sort((a, b) => a.year - b.year);
  //       setData(data);
  //       console.log(data);
  //       //   return data; //Array of like 45,000 objects
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <MeteoriteContext.Provider value={data}>
      {children}
    </MeteoriteContext.Provider>
  );
}

export default MeteoriteContext;

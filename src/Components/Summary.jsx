import React from "react";
import { useState, useEffect } from "react";
import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
// import * as d3Fetch from "d3-fetch";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       let data = await d3Fetch.csv(
  //         "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv"
  //       );

  //       setLoading(false);
  //       console.log({ data });
  //       // data.sort((a, b) => a.year - b.year);
  //       setData(data);
  //       return data; //Array of like 45,000 objects
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const meteors = data.slice(0, 10).map((meteor) => {
  //     // console.log(meteor);
  //     return <div key={meteor.id}>{meteor.name}</div>;
  //   });

  // const sample = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  //   const meteorType = data.map((meteor) => {
  //     // console.log(meteor.recclass);
  //     return meteor.recclass;
  //   });

  return (
    <div>
      <h2>Summary Content</h2>
      {loading ? (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          {/* <StrikesByYear /> */}
          <AverageMass />
          {/* <Doughnut
            //   options={...}
            data={sample}
            // {...props}
          /> */}
        </div>
      )}
    </div>
  );
}
export default Summary;

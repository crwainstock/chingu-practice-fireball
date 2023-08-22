import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import * as d3Fetch from "d3-fetch";
// import { useMeteorDataContext } from "../store/meteor-context";

function StrikesByComposition() {
  //   const meteorData = useMeteorDataContext();

  const [meteorData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await d3Fetch.csv(
        "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv"
      );

      setLoading(false);
      setData(data);
      return data; //Array of like 45,000 objects
    } catch (err) {
      console.log(err);
    }
  };

  if (meteorData === 0) return;

  const strikesByRecclass = {};

  meteorData.forEach((meteor) => {
    const composition = meteor.recclass;

    if (composition !== "Unknown") {
      if (composition !== undefined) {
        if (!strikesByRecclass[composition]) {
          strikesByRecclass[composition] = 0;
        }
        strikesByRecclass[composition]++;
      }
    }
  });

  const compositions = Object.keys(strikesByRecclass).slice(0, 10);
  const strikesCount = compositions.map(
    (composition) => strikesByRecclass[composition]
  );

  function compareNumbers(a, b) {
    return b - a;
  }

  strikesCount.sort(compareNumbers);
  const topTenCompositions = strikesCount.slice(0, 10);

  const chartData = {
    labels: compositions,
    datasets: [
      {
        label: "Number of Strikes",
        data: topTenCompositions,
        fill: false,
        backgroundColor: "rgb(12, 22, 79)",
        borderColor: "rgb(12, 22, 79)",
        pointBackgroundColor: "rgb(12, 22, 79)",
        pointBorderColor: "rgb(38,182,183)",
        pointHoverBackgroundColor: "rgb(38,182,183)",
        pointHoverBorderColor: "rgb(38,182,183)",
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(38,182,183)",
        },
      },
      y: {
        ticks: {
          color: "rgb(38,182,183)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Meteorite Strikes by Composition: Top 10",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: 700,
        color: "white",
        marginTop: 50,
        background: "rgb(229,231,245)",
        margin: "1rem",
        // border: "5px solid white",
        borderRadius: "8px",
      }}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByComposition;

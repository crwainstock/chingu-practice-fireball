import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../Summary/summary.css";
// import { useMeteorDataContext } from "../MeteorContext"; //This wasn't working, but I'll use it eventually.

//Thanks Alex for your work putting much of this together! Your work is much appreciated! :)
function StrikesByCountry() {
  //   const meteorData = useMeteorDataContext();
  const [meteorData, setData] = useState([]);
  // const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await d3Fetch.csv(
        "https://gist.githubusercontent.com/crwainstock/4a2d009e65511717664859e7f039ccbf/raw/d661ba3e84607081fae327c0ae589cba4401e88b/geocoded500.csv"
      );

      setLoading(false);
      setData(data);
      return data; //Array of like 45,000 objects
    } catch (err) {
      console.log(err);
    }
  };

  if (meteorData === 0) return;

  const strikesByCountry = {};

  meteorData.forEach((meteor) => {
    const country = meteor.country;

    if (!strikesByCountry[country]) {
      strikesByCountry[country] = 0;
    }

    strikesByCountry[country]++;
  });
  console.log(strikesByCountry);
  const countries = Object.keys(strikesByCountry);

  const strikesCount = countries.map((country) => strikesByCountry[country]);

  function compareNumbers(a, b) {
    return b - a;
  }

  strikesCount.sort(compareNumbers);

  //Group years into 10 year periods -- NOT COMPLETE
  // function groupYearsIntoTenYearGroups(years) {
  //   //Sort years
  //   const sortedYears = years.sort((a, b) => a - b);

  //   const groups = [];
  //   let currentGroup = [];
  //   let startYear = sortedYears[0];

  //   for (const year of sortedYears) {
  //     if (year - startYear <= 9) {
  //       currentGroup.push(year);
  //     } else {
  //       groups.push(currentGroup);
  //       currentGroup = [year];
  //       startYear = year;
  //     }
  //   }

  //   // Push the last group if it's not empty
  //   if (currentGroup.length > 0) {
  //     groups.push(currentGroup);
  //   }

  //   setGroups(groups);
  // }

  // const strikesCount = groups.map((group) => strikesByDecade[group]);

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "Number of Strikes by Country",
        data: strikesCount,
        backgroundColor: "rgb(12, 22, 79)",
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
        title: {
          display: true,
          text: "Number of Strikes",
          color: "rgb(12, 22, 79)",
        },
        beginAtZero: true,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Meteorite Strikes by Country",
        font: {
          size: 18,
        },
      },
      // labels: {
      //   color: "rgb(12, 22, 79)",
      //   font: {
      //     size: 18, // Set the font size of the legend label text to 18
      //   },
      // },
    },
  };

  return (
    <div
      style={{
        width: 700,
        color: "white",
        marginTop: "0.5rem",
        background: "rgb(229,231,245)",
        margin: "0 auto",
        display: "block",
        borderRadius: "8px",
      }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByCountry;

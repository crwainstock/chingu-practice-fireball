import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
// import { useMeteorDataContext } from "../MeteorContext"; //This wasn't working, but I'll use it eventually.

//Thanks Alex for your work putting much of this together! Your work is much appreciated! :)
function StrikesByYear() {
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

  const strikesByYear = {};
  // const strikesByDecade = {};

  meteorData.forEach((meteor) => {
    const year = new Date(meteor.year).getFullYear();

    //Filter out empty fields, falsy data, and NaN
    if (!isNaN(year)) {
      if (!strikesByYear[year]) {
        strikesByYear[year] = 0;
      }

      strikesByYear[year]++;
    }
  });

  const years = Object.keys(strikesByYear);

  const strikesCount = years.map((year) => strikesByYear[year]);

  //Group years into 10 year periods
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
    labels: years,
    datasets: [
      {
        label: "Number of Strikes by Year",
        data: strikesCount,
        backgroundColor: "rgb(1, 244, 255)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        title: {
          display: true,
          text: "Number of Strikes",
          color: "white",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "wheat",
          font: {
            size: 16, // Set the font size of the legend label text to 18
          },
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
        background: "rgb(12, 22, 79)",
        border: "5px solid white",
        borderRadius: "3px",
      }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByYear;

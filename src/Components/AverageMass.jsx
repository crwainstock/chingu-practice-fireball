import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";
import "./summary.css";

export default function AverageMass() {
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
      // console.log(meteorData[0]); //Showing all data for that meteor
      // console.log(meteorData[0]["mass (g)"]);
      return data; //Array of like 45,000 objects
    } catch (err) {
      console.log(err);
    }
  };

  let totalMass = 0;
  let totalCount = 0;

  meteorData.forEach((meteor) => {
    const massValue = meteor["mass (g)"];
    // console.log(massValue); //Undefined
    const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;

    totalMass += mass;
    totalCount++;
  });

  const overallAvgMass = (totalMass / totalCount).toFixed(2);
  const imperialTons = (overallAvgMass / 10160).toFixed(2);
  const usTons = (overallAvgMass / 9072).toFixed(2);
  const kilograms = (overallAvgMass / 10).toFixed(2);

  return (
    <div className="mass-container">
      <span>
        <h3 className="title">Total Average Mass of Meteorites: </h3>
        <div className="data-text">
          <h4>{overallAvgMass} grams</h4>
          <h4>{kilograms} kilograms</h4>
          <h4>{imperialTons} Imperial Tons</h4>
          <h4>{usTons} US Tons</h4>
        </div>
      </span>
    </div>
  );
}

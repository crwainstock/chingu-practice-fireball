import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";

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
      console.log(meteorData[0]); //Showing all data for that meteor
      console.log(meteorData[0].mass); //Undefined
      return data; //Array of like 45,000 objects
    } catch (err) {
      console.log(err);
    }
  };

  let totalMass = 0;
  let totalCount = 0;

  meteorData.forEach((meteor) => {
    const massValue = meteor.mass;
    // console.log(massValue); //Undefined
    const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;

    totalMass += mass;
    totalCount++;
  });

  const overallAvgMass = (totalMass / totalCount).toFixed(2);

  return (
    <div>
      <span>
        <h3>Total Average Mass: </h3>
      </span>
      {overallAvgMass}
    </div>
  );
}

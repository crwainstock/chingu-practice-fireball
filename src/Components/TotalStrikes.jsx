import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";
import "./summary.css";

export default function TotalStrikes() {
  const [meteorData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await d3Fetch.csv(
        "https://gist.githubusercontent.com/crwainstock/59650ea0c7d88b4a9a0531aa52c56353/raw/b1905fb1fee896b776d520ebf7db020cf6634691/meteorData.csv"
      );

      setLoading(false);
      setData(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const strikesCount = meteorData.length;

  return (
    <div className="strikes-container">
      <span>
        <h3 className="title">Total Number of Strikes: </h3>
        <div className="data-text">
          <h4>{strikesCount}</h4>
        </div>
      </span>
    </div>
  );
}

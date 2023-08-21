import React from "react";
import { useState, useEffect } from "react";
import * as d3Fetch from "d3-fetch";

function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    try {
      let data = await d3Fetch.csv(
        "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv"
      );

      //   setLoading(false);
      console.log({ data });
      return data; //Array of like 45,000 objects
    } catch (err) {
      console.log(err);
    }
  };

  const meteors = data.slice(0, 5).map((meteor) => {
    // console.log(meteor);
    return <div>{meteor.id}</div>;
  });

  return (
    <div>
      <h2>Summary Content</h2>
      <div>{meteors}</div>
    </div>
  );
}
export default Summary;

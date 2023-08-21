import React from "react";
import { useState, useEffect } from "react";

function Summary() {
  const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return <h2>This is where the summary will display.</h2>;
}

export default Summary;

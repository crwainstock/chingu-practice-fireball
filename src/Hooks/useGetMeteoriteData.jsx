import { useEffect, useState } from "react";
import { csv } from "d3-fetch";

const url =
  "https://gist.githubusercontent.com/crwainstock/59650ea0c7d88b4a9a0531aa52c56353/raw/b1905fb1fee896b776d520ebf7db020cf6634691/meteorData.csv";

const useGetMeteoriteData = (
  url = "https://gist.githubusercontent.com/crwainstock/59650ea0c7d88b4a9a0531aa52c56353/raw/b1905fb1fee896b776d520ebf7db020cf6634691/meteorData.csv"
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await csv(url);

        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetMeteoriteData;

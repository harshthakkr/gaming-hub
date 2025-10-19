import axios from "axios";
import { useEffect, useState } from "react";

export function useData<T>(endpoint: string, limit: number = 20) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/${endpoint}`);
        setData(res.data);
        setHasMore(res.data.length === limit);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, limit]);

  const handlePagination = async () => {
    try {
      const res = await axios.get(`/api/${endpoint}?offset=${data.length}`);
      setData([...data, ...res.data]);
      setHasMore(res.data.length === limit);
    } catch (error) {
      console.error("Error loading more:", error);
    }
  };

  return { data, hasMore, loading, handlePagination };
}

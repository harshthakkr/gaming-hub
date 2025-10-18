import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useSingleData<T>(endpoint: string) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const slug = params.slug;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/${endpoint}/${slug}`);
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [endpoint, slug]);

  return { data, loading };
}

"use client";

import { Games } from "@/components/Games";
import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Platform = () => {
  const params = useParams();
  const slug = params.slug;
  const [data, setData] = useState<GameCardProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/platforms/${slug}`);
      setData(res.data);
      console.log(res.data);
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{slug}</h2>
      {data && <Games games={data} />}
    </div>
  );
};

export default Platform;

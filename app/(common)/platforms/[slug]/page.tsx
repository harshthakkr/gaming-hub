"use client";

import { Games } from "@/components/Games";
import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Platform = () => {
  const params = useParams();
  const slug = params.slug;
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/platforms/${slug}`);
      setGames(res.data);
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handlePagination = async () => {
    const res = await axios.get(
      `/api/platforms/${slug}?offset=${games.length}`
    );
    setGames([...games, ...res.data]);
    console.log(games);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{slug}</h2>
      {games && (
        <Games games={games} handlePagination={handlePagination} displayMore />
      )}
    </div>
  );
};

export default Platform;

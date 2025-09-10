"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Year2025 = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/2025");
      setGames(res.data);
      setHasMore(res.data.length === 40);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(`/api/2025?offset=${games.length}`);
    setGames([...games, ...res.data]);
    setHasMore(res.data.length === 40);
  };

  return (
    <div>
      <Heading title="2025" />
      <Games
        games={games}
        handlePagination={handlePagination}
        displayMore={hasMore}
      />
    </div>
  );
};

export default Year2025;

"use client";

import { Games } from "@/components/Games";
import axios from "axios";
import { useEffect, useState } from "react";
import { GameCardProps } from "@/utils/types";

export const AllGames = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/games");
        setGames(res.data);
        setHasMore(res.data.length === 40);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/games?offset=${games.length}`
    );
    if (setGames) {
      setGames([...games, ...res.data]);
      setHasMore(res.data.length === 40);
    }
  };

  return (
    <Games games={games} handlePagination={handlePagination} displayMore={hasMore} />
  );
};

export default AllGames;

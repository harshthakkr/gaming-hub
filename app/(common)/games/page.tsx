"use client";

import { Games } from "@/components/Games";
import axios from "axios";
import { useEffect, useState } from "react";
import { GameCardProps } from "@/utils/types";

export const AllGames = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/games");
        setGames(res.data);
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
    console.log(res.data);
    if (setGames) {
      setGames([...games, ...res.data]);
    }
  };

  return (
    <Games
      games={games}
      handlePagination={handlePagination}
      displayMore
    />
  );
};

export default AllGames;

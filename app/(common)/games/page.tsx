"use client";

import { AllGames } from "@/components/AllGames";
import axios from "axios";
import { useEffect, useState } from "react";
import { GameCardProps } from "@/utils/types";

export const Games = () => {
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

  return <AllGames games={games} />;
};

export default Games;

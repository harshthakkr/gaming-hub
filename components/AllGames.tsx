"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";

interface GameProps {
  id: number;
  name: string;
  cover: number;
  coverData: {
    id: number;
    image_id: string;
    url: string;
  };
  releaseDates: number[];
}

export const AllGames = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/games");
        console.log(res.data);
        setGames(res.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);

  if (!games) {
    return;
  }
  return (
    <div>
      {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.name}
          image={
            game.coverData
              ? `https:${game.coverData.url.replace("t_thumb", "t_cover_big")}`
              : "/placeholder.jpg"
          }
        />
      ))}
    </div>
  );
};

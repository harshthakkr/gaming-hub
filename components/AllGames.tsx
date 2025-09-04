"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";

interface GameProps {
  id: number;
  name: string;
  slug: string;
  cover: {
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
        setGames(res.data.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);

  if (!games) {
    return <div>No games available</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.name}
          slug={game.slug}
          id={game.id}
          image={`https:${game.cover.url.replace("t_thumb", "t_cover_big")}`}
        />
      ))}
    </div>
  );
};

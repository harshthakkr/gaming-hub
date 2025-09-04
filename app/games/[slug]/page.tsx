import axios from "axios";
import { GameClient } from "./GameClient";

interface GameProps {
  name: string;
  cover: { url: string };
  genres: { name: string }[];
  involved_companies: { company: string }[];
  release_dates: { human: string };
  screenshots: { url: string; height: number; width: number }[];
  summary: string;
  storyline?: string;
  videos: { video_id: string }[];
}

const Game = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  const { id } = await searchParams;
  const { data }: { data: GameProps } = await axios.get(
    `http://localhost:3000/api/game/${id}`
  );

  return <GameClient data={data} />;
};

export default Game;

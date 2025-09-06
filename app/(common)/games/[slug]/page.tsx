import axios from "axios";
import { GameClient } from "./GameClient";
import { GameCardProps } from "@/utils/types";

const Game = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  const { id } = await searchParams;
  const { data }: { data: GameCardProps } = await axios.get(
    `http://localhost:3000/api/game/${id}`
  );

  return <GameClient data={data} />;
};

export default Game;

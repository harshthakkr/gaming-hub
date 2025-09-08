import axios from "axios";
import { GameClient } from "./GameClient";
import { GamePageProps } from "@/utils/types";

const Game = async ({ params }: { params: Promise<{ slug?: string }> }) => {
  const { slug } = await params;
  const { data }: { data: GamePageProps } = await axios.get(
    `http://localhost:3000/api/games/${slug}`
  );

  return <GameClient data={data} />;
};

export default Game;

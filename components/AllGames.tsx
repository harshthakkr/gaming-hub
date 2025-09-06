import { GameCardProps } from "@/utils/types";
import { GameCard } from "./GameCard";

export const AllGames = ({ games }: { games: GameCardProps[] }) => {
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
          image={`https:${game.cover.url.replace("t_thumb", "t_1080p")}`}
        />
      ))}
    </div>
  );
};

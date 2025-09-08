import { GameCardProps } from "@/utils/types";
import { GameCard } from "./GameCard";

export const Games = ({ games }: { games: GameCardProps[] }) => {
  if (!games) {
    return <div>No games available</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          name={game.name}
          slug={game.slug}
          id={game.id}
          cover={game.cover}
        />
      ))}
    </div>
  );
};

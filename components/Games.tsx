import { GameCardProps } from "@/utils/types";
import { GameCard } from "./GameCard";
import { LoadMoreButton } from "./LoadMoreButton";

export const Games = ({
  games,
  handlePagination,
  displayMore,
}: {
  games: GameCardProps[];
  handlePagination?: () => void;
  displayMore?: boolean;
}) => {
  if (!games) {
    return <div>No games available</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:max-w-[95%] gap-4 lg:gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            slug={game.slug}
            cover={game.cover}
          />
        ))}
      </div>
      {displayMore && handlePagination && (
        <LoadMoreButton handleClick={handlePagination} />
      )}
    </div>
  );
};

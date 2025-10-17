import { GameCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export const GamesList = ({
  games,
  setIsDisplayed,
  setQuery,
}: {
  games: GameCardProps[];
  setIsDisplayed: (value: boolean) => void;
  setQuery: (value: string) => void;
}) => {
  return (
    <div className="z-50 absolute top-12 left-0 w-full bg-neutral-900 p-4 rounded-lg">
      <ul className="h-120 overflow-y-auto space-y-4">
        {games
          .filter((game) => game.cover)
          .map((game) => (
            <li
              key={game.id}
              className="flex items-center gap-4 hover:bg-neutral-800 hover:rounded-lg duration-200"
            >
              {game.cover && (
                <Image
                  src={`https:${game.cover.url.replace("t_thumb", "t_1080p")}`}
                  alt={`${game} cover image`}
                  width={50}
                  height={80}
                  className="object-cover"
                />
              )}
              <span className="cursor-pointer">
                <Link
                  href={`/games/${game.slug}`}
                  onClick={() => {
                    setQuery("");
                    setIsDisplayed(false);
                  }}
                >
                  {game.name}
                </Link>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

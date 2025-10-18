"use client";

import { GameCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./Loader";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const GamesList = ({
  query,
  setIsDisplayed,
  setQuery,
}: {
  query: string;
  setIsDisplayed: (value: boolean) => void;
  setQuery: (value: string) => void;
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const res = await axios.get(`/api/search?q=${query}`);
      setGames(res.data);
      setLoading(false);
    }, 300);
  }, [query]);

  return (
    <div className="z-50 absolute top-12 left-0 w-full bg-neutral-900 p-4 rounded-lg">
      {loading ? (
        <Loader />
      ) : (
        <ul className="max-h-120 overflow-y-auto space-y-4">
          {games
            .filter((game) => game.cover)
            .map((game) => (
              <li
                key={game.id}
                className="flex items-center gap-4 hover:bg-neutral-800 hover:rounded-lg duration-200"
              >
                {game.cover && (
                  <Image
                    src={`https:${game.cover.url.replace(
                      "t_thumb",
                      "t_1080p"
                    )}`}
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
      )}
    </div>
  );
};

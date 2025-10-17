"use client";

import { Menu, X } from "lucide-react";
import { ThemeAndSignOut } from "./ThemeAndSignOut";
import { useRef, useState } from "react";
import axios from "axios";
import { GameCardProps } from "@/utils/types";
import { GamesList } from "./GamesList";

export const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleSearch = (value: string) => {
    setIsDisplayed(true);
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const res = await axios.get(`api/search?q=${value}`);
      setGames(res.data);
    }, 400);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-5 py-4 lg:px-8 lg:flex lg:justify-between lg:items-center">
      <div className="lg:hidden absolute">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <p className="font-bold text-center text-xl flex-shrink-0">Gaming Hub</p>
      <div className="relative flex-1 hidden lg:block max-w-lg mx-6 px-4 py-2 border border-neutral-700 outline-accent rounded">
        <div className="relative">
          <input
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="outline-none w-full"
          />
          <X
            onClick={() => {
              setIsDisplayed(false);
              setQuery("");
            }}
            className="absolute top-0 right-0 text-neutral-500 cursor-pointer"
          />
        </div>
        {isDisplayed && (
          <GamesList
            games={games}
            setIsDisplayed={setIsDisplayed}
            setQuery={setQuery}
          />
        )}
      </div>
      <div className="hidden lg:block">
        <ThemeAndSignOut />
      </div>
    </nav>
  );
};

"use client";

import { Menu, X } from "lucide-react";
import { ThemeAndSignOut } from "./ThemeAndSignOut";
import { useState } from "react";
import { GamesList } from "./GamesList";

export const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [query, setQuery] = useState("");

  const [isDisplayed, setIsDisplayed] = useState(false);

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
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDisplayed(true);
            }}
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
        {query && isDisplayed && (
          <GamesList
            query={query}
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

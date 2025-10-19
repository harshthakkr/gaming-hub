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
    <nav className="relative w-full lg:flex lg:justify-between lg:items-center font-clash">
      <div className="lg:hidden absolute left-0">
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
            className="outline-none w-full bg-transparent"
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

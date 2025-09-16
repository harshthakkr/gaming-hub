"use client";

import { Menu, X } from "lucide-react";
import { ThemeAndSignOut } from "./ThemeAndSignOut";

export const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <nav className="relative md:flex md:justify-between md:items-center mb-6">
      <div className="md:hidden absolute">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <p className="font-bold text-center text-xl flex-shrink-0">Gaming Hub</p>
      <input
        type="text"
        placeholder="Search games..."
        className="hidden md:block flex-1 max-w-lg mx-6 px-4 py-2 border border-neutral-700 outline-accent rounded"
      />
      <div className="hidden md:block">
        <ThemeAndSignOut />
      </div>
    </nav>
  );
};

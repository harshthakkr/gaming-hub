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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-5 py-4 lg:px-8 lg:flex lg:justify-between lg:items-center">
      <div className="lg:hidden absolute">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <p className="font-bold text-center text-xl flex-shrink-0">Gaming Hub</p>
      <input
        type="text"
        placeholder="Search games..."
        className="hidden lg:block flex-1 max-w-lg mx-6 px-4 py-2 border border-neutral-700 outline-accent rounded"
      />
      <div className="hidden lg:block">
        <ThemeAndSignOut />
      </div>
    </nav>
  );
};

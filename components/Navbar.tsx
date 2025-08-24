"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SignOut from "./SignOut";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex justify-between items-center mb-12">
      <p className="font-bold text-xl">Gaming Hub</p>
      <input
        type="text"
        placeholder="Search games..."
        className="min-w-196 px-4 py-2 border rounded"
      />
      <div className="flex items-center gap-6">
        {mounted && (
          <button
            onClick={() =>
              setTheme((theme) => (theme === "dark" ? "light" : "dark"))
            }
            className="p-2 rounded cursor-pointer"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        )}
        <SignOut />
      </div>
    </nav>
  );
};

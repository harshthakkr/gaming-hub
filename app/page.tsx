"use client";

import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // const session = await auth();
  // if (!session) {
  //   redirect("/register");
  // }
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-32 my-4 font-alpino">
      <nav className="flex justify-between items-center">
        <p className="font-medium text-lg">Gaming Hub</p>
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
              className="p-2 rounded"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          )}
          <SignOut />
        </div>
      </nav>
    </div>
  );
}

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SignOut from "./SignOut";

export const ThemeAndSignOut = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex flex-row-reverse md:flex-row items-center justify-between md:gap-4 lg:gap-6 flex-shrink-0">
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
  );
};

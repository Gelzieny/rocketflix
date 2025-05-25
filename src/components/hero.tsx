import { useTheme } from "./context";
import { Moon, Sun } from "lucide-react";

export function Hero() {
  const { theme, toggleTheme } = useTheme();
  return(
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
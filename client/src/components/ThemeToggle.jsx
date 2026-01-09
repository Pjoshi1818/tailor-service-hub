import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent dark:focus:ring-offset-slate-900
          bg-gray-200 dark:bg-slate-800
          hover:bg-gray-300 dark:hover:bg-slate-700"
      >
        {/* Background icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <Sun
            size={12}
            className={`transition-opacity ${
              isDark ? "opacity-30 text-gray-400" : "opacity-90 text-amber-500"
            }`}
          />
          <Moon
            size={12}
            className={`transition-opacity ${
              isDark ? "opacity-90 text-emerald-400" : "opacity-30 text-gray-400"
            }`}
          />
        </div>

        {/* Sliding knob */}
        <div
          className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300
            bg-white dark:bg-slate-600
            shadow-md dark:shadow-slate-900/50`}
          style={{
            left: "2px",
            transform: isDark ? "translateX(28px)" : "translateX(0)",
          }}
        >
          {isDark ? (
            <Moon size={12} className="text-emerald-400" />
          ) : (
            <Sun size={12} className="text-amber-500" />
          )}
        </div>
      </button>
    </div>
  );
}

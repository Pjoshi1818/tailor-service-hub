import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  // This syncs with the script in index.html that applies the class immediately
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Check if dark class is already applied (from index.html script)
    const hasDarkClass = document.documentElement.classList.contains("dark");
    if (hasDarkClass) {
      return true;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  // Sync state with document class on mount (in case of hydration mismatch)
  useEffect(() => {
    const hasDarkClass = document.documentElement.classList.contains("dark");
    if (hasDarkClass !== isDark) {
      setIsDark(hasDarkClass);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};


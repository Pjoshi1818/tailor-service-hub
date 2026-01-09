import React from "react";

/**
 * Reusable card component with consistent styling
 */
export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 p-6 shadow-lg dark:shadow-xl backdrop-blur transition duration-200
        ${onClick ? "cursor-pointer hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-xl dark:hover:shadow-2xl" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}


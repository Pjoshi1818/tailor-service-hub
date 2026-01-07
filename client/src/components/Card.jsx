import React from "react";

/**
 * Reusable card component with consistent styling
 */
export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 shadow-lg backdrop-blur transition duration-200
        ${onClick ? "cursor-pointer hover:border-emerald-500/50 hover:shadow-xl" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}


import React from "react";

/**
 * Empty state component for when there's no data
 */
export default function EmptyState({
  icon = "📭",
  title = "No items found",
  description = "There are no items to display at this time.",
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}


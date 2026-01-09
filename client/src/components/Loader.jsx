import React from "react";

/**
 * Spinner loading indicator component
 * @param {string} size - Size variant: 'sm', 'md', or 'lg'
 */
export default function Loader({ size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-5 w-5 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <span
      className={`inline-block animate-spin rounded-full border-current border-t-transparent align-[-0.125em] text-emerald-600 dark:text-emerald-400 ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    />
  );
}


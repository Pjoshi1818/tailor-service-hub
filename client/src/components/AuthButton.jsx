import React from "react";
import Loader from "./Loader";

/**
 * Primary button for auth actions with loading and disabled states
 */
export default function AuthButton({
  children,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200
        bg-gradient-to-r from-emerald-500 to-emerald-600
        hover:from-emerald-400 hover:to-emerald-500 hover:shadow-xl
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
        disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none disabled:opacity-50
        active:scale-95
        ${className}`}
      {...props}
    >
      {loading && <Loader size="sm" />}
      <span>{children}</span>
    </button>
  );
}


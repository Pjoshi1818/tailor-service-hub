import React from "react";

/**
 * Reusable, accessible input field with label, helper, and error text
 */
export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  autoComplete,
  rightElement,
  className = "",
  name,
}) {
  const hasError = Boolean(error);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-slate-200"
        >
          {label}
          {required && <span className="text-emerald-600 dark:text-emerald-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`block w-full rounded-lg border px-4 py-2.5 text-sm shadow-sm outline-none transition duration-200
            bg-white dark:bg-slate-800/50 text-gray-900 dark:text-slate-100
            placeholder:text-gray-500 dark:placeholder:text-slate-500
            ${
              hasError
                ? "border-red-500 dark:border-red-500/60 bg-red-50 dark:bg-red-500/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                : "border-gray-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 hover:border-gray-400 dark:hover:border-slate-600"
            }`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && !hasError && (
        <p className="text-xs text-gray-600 dark:text-slate-400">{helperText}</p>
      )}
      {hasError && (
        <p
          id={`${id}-error`}
          className="text-xs font-medium text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}


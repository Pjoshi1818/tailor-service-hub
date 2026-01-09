/**
 * Status badge component for order statuses
 */
export default function StatusBadge({ status, className = "" }) {
  const statusConfig = {
    pending: {
      bg: "bg-amber-50 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-300 dark:border-amber-500/30",
      dot: "bg-amber-600 dark:bg-amber-400",
      label: "Pending",
    },
    accepted: {
      bg: "bg-blue-50 dark:bg-blue-500/15",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-blue-300 dark:border-blue-500/30",
      dot: "bg-blue-600 dark:bg-blue-400",
      label: "Accepted",
    },
    rejected: {
      bg: "bg-red-50 dark:bg-red-500/15",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-300 dark:border-red-500/30",
      dot: "bg-red-600 dark:bg-red-400",
      label: "Rejected",
    },
    completed: {
      bg: "bg-emerald-50 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-300 dark:border-emerald-500/30",
      dot: "bg-emerald-600 dark:bg-emerald-400",
      label: "Completed",
    },
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
}


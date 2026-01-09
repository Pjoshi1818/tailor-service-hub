import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Customer Dashboard</h1>
            <p className="mt-3 text-gray-600 dark:text-slate-400">Welcome, {user?.name}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-slate-300">Quick Actions</h2>
            <Link
              to="/tailors"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 dark:bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-600/30 dark:hover:shadow-emerald-600/30 active:scale-95"
            >
              <span>View Tailors</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


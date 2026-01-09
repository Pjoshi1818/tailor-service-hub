import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TailorDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg dark:shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Tailor Dashboard</h1>
            <p className="mt-3 text-gray-600 dark:text-slate-400">Welcome, {user?.name}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/tailor/profile"
              className="group rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl"
            >
              <div className="mb-3 text-3xl">👤</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">Create or update your profile</p>
            </Link>

            <Link
              to="/tailor/orders"
              className="group rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10"
            >
              <div className="mb-3 text-3xl">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Orders
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">View and manage your orders</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


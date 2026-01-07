import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-slate-50">Customer Dashboard</h1>
            <p className="mt-3 text-slate-400">Welcome, {user?.name}</p>
          </div>

          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-300">Quick Actions</h2>
            <Link
              to="/tailors"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95"
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


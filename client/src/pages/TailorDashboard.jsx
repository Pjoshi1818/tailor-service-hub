import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TailorDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-slate-50">Tailor Dashboard</h1>
            <p className="mt-3 text-slate-400">Welcome, {user?.name}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/tailor/profile"
              className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="mb-3 text-3xl">👤</div>
              <h3 className="text-lg font-semibold text-slate-50 transition-colors duration-300 group-hover:text-blue-400">
                Profile
              </h3>
              <p className="mt-1 text-sm text-slate-400">Create or update your profile</p>
            </Link>

            <Link
              to="/tailor/orders"
              className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="mb-3 text-3xl">📋</div>
              <h3 className="text-lg font-semibold text-slate-50 transition-colors duration-300 group-hover:text-emerald-400">
                Orders
              </h3>
              <p className="mt-1 text-sm text-slate-400">View and manage your orders</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


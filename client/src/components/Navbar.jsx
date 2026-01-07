import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-950/20">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent transition-all duration-300 hover:from-emerald-300 hover:to-teal-300"
          >
            TailorMarket
          </Link>

          <div className="flex items-center gap-6">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-500/30 active:scale-95"
                >
                  Register
                </Link>
              </>
            )}

            {user?.role === "customer" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tailors"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Tailors
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "tailor" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tailor/profile"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  My Profile
                </Link>
                <Link
                  to="/tailor/orders"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-300 transition-all duration-200 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent transition-all duration-300 hover:from-emerald-700 hover:to-emerald-600 dark:hover:from-emerald-300 dark:hover:to-emerald-200"
          >
            TailorMarket
          </Link>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-emerald-600/30 dark:hover:shadow-emerald-600/30 active:scale-95"
                >
                  Register
                </Link>
              </>
            )}

            {user?.role === "customer" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tailors"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Tailors
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "tailor" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tailor/profile"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  My Profile
                </Link>
                <Link
                  to="/tailor/orders"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400"
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


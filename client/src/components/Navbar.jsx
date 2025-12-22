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
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-green-400">
        TailorMarket
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:text-green-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-400">
              Register
            </Link>
          </>
        )}

        {user?.role === "customer" && (
          <>
            <Link to="/" className="hover:text-green-400">
              Dashboard
            </Link>
            <Link to="/tailors" className="hover:text-green-400">
              Tailors
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "tailor" && (
          <>
            <Link to="/" className="hover:text-green-400">
              Dashboard
            </Link>
            <Link
              to="/tailor/profile"
              className="hover:text-green-400"
            >
              My Profile
            </Link>
            <Link
              to="/tailor/orders"
              className="hover:text-green-400"
            >
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/" className="hover:text-green-400">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

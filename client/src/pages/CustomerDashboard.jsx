import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">
        Customer Dashboard
      </h1>

      <p className="mt-2">Welcome, {user.name}</p>

      <Link
        to="/tailors"
        className="inline-block mt-6 bg-green-500 px-4 py-2 rounded"
      >
        View Tailors
      </Link>
    </div>
  );
}

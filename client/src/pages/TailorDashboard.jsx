import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TailorDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Tailor Dashboard</h1>
      <p className="mt-2">Welcome, {user.name}</p>

      <div className="mt-6 space-y-3">
        <Link
          to="/tailor/profile"
          className="block bg-blue-500 px-4 py-2 rounded"
        >
          Create / Update Profile
        </Link>

        <Link
          to="/tailor/orders"
          className="block bg-green-500 px-4 py-2 rounded"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}

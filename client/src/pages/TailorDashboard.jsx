import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TailorDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">
        Tailor Dashboard
      </h1>

      <p className="mt-2">Welcome, {user.name}</p>

      <Link
        to="/tailor/orders"
        className="inline-block mt-6 bg-blue-500 px-4 py-2 rounded"
      >
        View Orders
      </Link>
    </div>
  );
}

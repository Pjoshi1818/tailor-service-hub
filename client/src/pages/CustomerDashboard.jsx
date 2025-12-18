import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">
        Customer Dashboard
      </h1>
      <p className="mt-2">Welcome, {user.name}</p>

      <div className="mt-6 bg-gray-800 p-4 rounded">
        <p>• View Tailors</p>
        <p>• Place Orders</p>
        <p>• Track Orders</p>
      </div>
    </div>
  );
}

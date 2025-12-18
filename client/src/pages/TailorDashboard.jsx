import { useAuth } from "../context/AuthContext";

export default function TailorDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">
        Tailor Dashboard
      </h1>
      <p className="mt-2">Welcome, {user.name}</p>

      <div className="mt-6 bg-gray-800 p-4 rounded">
        <p>• Create Tailor Profile</p>
        <p>• View Orders</p>
        <p>• Update Order Status</p>
      </div>
    </div>
  );
}

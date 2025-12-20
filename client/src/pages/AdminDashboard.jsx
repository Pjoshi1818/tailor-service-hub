import { useEffect, useState } from "react";
import {
  getPendingTailors,
  approveTailor,
} from "../api/adminApi";

export default function AdminDashboard() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTailors = async () => {
    try {
      const res = await getPendingTailors();
      setTailors(res.data);
    } catch (error) {
      alert("Failed to load pending tailors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTailors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveTailor(id);
      alert("Tailor approved");
      fetchTailors(); // refresh list
    } catch (error) {
      alert("Approval failed");
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      {tailors.length === 0 && (
        <p>No pending tailors 🎉</p>
      )}

      {tailors.map((tailor) => (
        <div
          key={tailor._id}
          className="bg-gray-800 p-4 mb-3 rounded"
        >
          <p>
            <b>Shop:</b> {tailor.shopName}
          </p>
          <p>
            <b>Owner:</b> {tailor.user.name}
          </p>
          <p>
            <b>Email:</b> {tailor.user.email}
          </p>
          <p>
            <b>Location:</b> {tailor.location}
          </p>

          <button
            onClick={() => handleApprove(tailor._id)}
            className="mt-3 bg-green-500 px-4 py-1 rounded"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}

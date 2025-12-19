import { useEffect, useState } from "react";
import { getAllTailors } from "../api/tailorApi";
import TailorCard from "../components/TailorCard";

export default function TailorList() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const res = await getAllTailors();
        setTailors(res.data);
      } catch (error) {
        console.error("Failed to fetch tailors");
      } finally {
        setLoading(false);
      }
    };

    fetchTailors();
  }, []);

  if (loading) {
    return <p className="text-white p-6">Loading tailors...</p>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">
        Available Tailors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tailors.map((tailor) => (
          <TailorCard key={tailor._id} tailor={tailor} />
        ))}
      </div>
    </div>
  );
}

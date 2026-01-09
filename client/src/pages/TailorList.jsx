import { useEffect, useState } from "react";
import { getAllTailors } from "../api/tailorApi";
import TailorCard from "../components/TailorCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function TailorList() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        setError("");
        const res = await getAllTailors();
        setTailors(res.data);
      } catch (error) {
        setError("Failed to fetch tailors. Please try again later.");
        console.error("Failed to fetch tailors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTailors();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading tailors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-slate-50">Available Tailors</h1>

        {tailors.length === 0 ? (
          <EmptyState
            icon="👔"
            title="No Tailors Available"
            description="There are no approved tailors available at the moment. Please check back later."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tailors.map((tailor) => (
              <TailorCard key={tailor._id} tailor={tailor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { getPendingTailors, approveTailor } from "../api/adminApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Card from "../components/Card";

export default function AdminDashboard() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(null);

  const fetchTailors = async () => {
    try {
      setError("");
      const res = await getPendingTailors();
      setTailors(res.data);
    } catch (error) {
      setError("Failed to load pending tailors. Please try again.");
      console.error("Failed to load pending tailors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTailors();
  }, []);

  const handleApprove = async (id) => {
    setApproving(id);
    try {
      await approveTailor(id);
      alert("Tailor approved successfully!");
      fetchTailors(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed. Please try again.");
    } finally {
      setApproving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading pending tailors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-slate-50">Admin Dashboard</h1>
        <p className="mb-6 text-gray-600 dark:text-slate-400">Review and approve pending tailor profiles</p>

        {tailors.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="No Pending Tailors"
            description="All tailors have been reviewed. Great job!"
          />
        ) : (
          <div className="space-y-4">
            {tailors.map((tailor) => (
              <Card key={tailor._id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">{tailor.shopName}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                      Owner: {tailor.user?.name || "N/A"}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{tailor.user?.email || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Location</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{tailor.location || "N/A"}</p>
                    </div>
                    {tailor.experience && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Experience</p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{tailor.experience} years</p>
                      </div>
                    )}
                    {tailor.priceRange && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Price Range</p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{tailor.priceRange}</p>
                      </div>
                    )}
                  </div>

                  {tailor.services && tailor.services.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {tailor.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={() => handleApprove(tailor._id)}
                      disabled={approving === tailor._id}
                      className="w-full rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {approving === tailor._id && <Loader size="sm" />}
                      <span>Approve Tailor</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { getPendingTailors, approveTailor, rejectTailor, getAllTailors, getAllCustomers } from "../api/adminApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingTailors, setPendingTailors] = useState([]);
  const [allTailors, setAllTailors] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(null);

  const tabs = [
    { id: 'pending', label: 'Pending Tailors', count: pendingTailors.length },
    { id: 'tailors', label: 'All Tailors', count: allTailors.length },
    { id: 'customers', label: 'All Customers', count: allCustomers.length },
  ];

  const fetchData = async () => {
    try {
      setError("");
      setLoading(true);

      const [pendingRes, tailorsRes, customersRes] = await Promise.all([
        getPendingTailors(),
        getAllTailors(),
        getAllCustomers(),
      ]);

      setPendingTailors(pendingRes.data);
      setAllTailors(tailorsRes.data);
      setAllCustomers(customersRes.data);
    } catch (error) {
      setError("Failed to load data. Please try again.");
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    setProcessing(id);
    try {
      await approveTailor(id);
      alert("Tailor approved successfully!");
      fetchData(); // Refresh all data
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed. Please try again.");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this tailor?")) return;

    setProcessing(id);
    try {
      await rejectTailor(id);
      alert("Tailor rejected successfully!");
      fetchData(); // Refresh all data
    } catch (error) {
      alert(error.response?.data?.message || "Rejection failed. Please try again.");
    } finally {
      setProcessing(null);
    }
  };

  const renderPendingTailors = () => (
    <div className="space-y-4">
      {pendingTailors.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="No Pending Tailors"
          description="All tailors have been reviewed. Great job!"
        />
      ) : (
        pendingTailors.map((tailor) => (
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

              <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex gap-3">
                <button
                  onClick={() => handleApprove(tailor._id)}
                  disabled={processing === tailor._id}
                  className="flex-1 rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing === tailor._id && <Loader size="sm" />}
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(tailor._id)}
                  disabled={processing === tailor._id}
                  className="flex-1 rounded-lg bg-red-600 dark:bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-700 dark:hover:bg-red-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing === tailor._id && <Loader size="sm" />}
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  const renderAllTailors = () => (
    <div className="space-y-4">
      {allTailors.length === 0 ? (
        <EmptyState
          icon="👔"
          title="No Tailors"
          description="No tailors have registered yet."
        />
      ) : (
        allTailors.map((tailor) => (
          <Card key={tailor._id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">{tailor.shopName}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Owner: {tailor.user?.name || "N/A"} • {tailor.user?.email || "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Location: {tailor.location || "N/A"}
                </p>
              </div>
              <StatusBadge status={tailor.status} />
            </div>
          </Card>
        ))
      )}
    </div>
  );

  const renderAllCustomers = () => (
    <div className="space-y-4">
      {allCustomers.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No Customers"
          description="No customers have registered yet."
        />
      ) : (
        allCustomers.map((customer) => (
          <Card key={customer._id} className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">{customer.name}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">{customer.email}</p>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                Joined: {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading dashboard data...</p>
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

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'pending' && renderPendingTailors()}
          {activeTab === 'tailors' && renderAllTailors()}
          {activeTab === 'customers' && renderAllCustomers()}
        </div>
      </div>
    </div>
  );
}


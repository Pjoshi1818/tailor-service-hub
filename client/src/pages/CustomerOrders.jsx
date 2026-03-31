import { useEffect, useState } from "react";
import { getCustomerOrders } from "../api/orderApi";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError("");
        const res = await getCustomerOrders();
        setOrders(res.data);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading your orders...</p>
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
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-slate-50">My Orders</h1>

        {orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No Orders Yet"
            description="You haven't placed any orders yet. Browse tailors and place your first order!"
            action={
              <a
                href="/tailors"
                className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Browse Tailors
              </a>
            }
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg dark:shadow-2xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50">
                      {order.serviceType}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Tailor: {order.tailor?.shopName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <StatusBadge status={order.status} />
                    {order.price && (
                      <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{order.price}
                      </p>
                    )}
                  </div>
                </div>
                {order.description && (
                  <div className="mt-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 p-4">
                    <p className="text-sm text-gray-700 dark:text-slate-300">
                      {order.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getTailorOrders, updateOrderStatus } from "../api/orderApi";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Card from "../components/Card";

export default function TailorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    try {
      setError("");
      const res = await getTailorOrders();
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      await updateOrderStatus(id, status);
      await fetchOrders(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading orders...</p>
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
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-slate-50">My Orders</h1>

        {orders.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No Orders Yet"
            description="You don't have any orders at the moment. Orders will appear here once customers place them."
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50">
                        {order.serviceType}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                        Customer: {order.customer?.name || "N/A"}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 dark:text-slate-300">
                      <span className="font-medium">Description:</span> {order.description}
                    </p>
                    {order.price && (
                      <p className="text-gray-700 dark:text-slate-300">
                        <span className="font-medium">Price:</span> ₹{order.price}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                    {order.status === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleStatusChange(order._id, "accepted")}
                          disabled={updating === order._id}
                          className="flex-1 rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {updating === order._id && <Loader size="sm" />}
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(order._id, "rejected")}
                          disabled={updating === order._id}
                          className="flex-1 rounded-lg bg-red-600 dark:bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-700 dark:hover:bg-red-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {updating === order._id && <Loader size="sm" />}
                          <span>Reject</span>
                        </button>
                      </div>
                    )}

                    {order.status === "accepted" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "completed")}
                        disabled={updating === order._id}
                        className="w-full rounded-lg bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {updating === order._id && <Loader size="sm" />}
                        <span>Mark Completed</span>
                      </button>
                    )}
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


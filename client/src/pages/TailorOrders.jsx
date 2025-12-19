import { useEffect, useState } from "react";
import {
  getTailorOrders,
  updateOrderStatus,
} from "../api/orderApi";

export default function TailorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getTailorOrders();
      setOrders(res.data);
    } catch (err) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  if (loading) return <p className="text-white p-6">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-gray-800 p-4 mb-3 rounded"
        >
          <p>Service: {order.serviceType}</p>
          <p>Description: {order.description}</p>
          <p>Status: {order.status}</p>

          {order.status === "pending" && (
            <div className="mt-2 space-x-2">
              <button
                onClick={() =>
                  handleStatusChange(order._id, "accepted")
                }
                className="bg-green-500 px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleStatusChange(order._id, "rejected")
                }
                className="bg-red-500 px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}

          {order.status === "accepted" && (
            <button
              onClick={() =>
                handleStatusChange(order._id, "completed")
              }
              className="mt-2 bg-blue-500 px-3 py-1 rounded"
            >
              Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

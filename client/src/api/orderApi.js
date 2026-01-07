import api from "./axios";

// Create new order (for customers)
export const createOrder = (data) => api.post("/orders", data);

// Get tailor's orders (for tailors)
export const getTailorOrders = () => api.get("/orders/tailor");

// Update order status (for tailors)
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });


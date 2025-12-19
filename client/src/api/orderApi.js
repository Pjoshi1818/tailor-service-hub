import api from "./axios";

export const createOrder = (data) => api.post("/orders", data);

// 👇 Tailor related
export const getTailorOrders = () => api.get("/orders/tailor");
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });

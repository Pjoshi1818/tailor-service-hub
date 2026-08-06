import api from "./axios";

// Get logged-in customer's profile
export const getMyProfile = () => api.get("/customer/profile");

// Update logged-in customer's profile
export const updateMyProfile = (data) => api.put("/customer/profile", data);

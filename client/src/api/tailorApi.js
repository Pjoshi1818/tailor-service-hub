import api from "./axios";

// Get all approved tailors (for customers)
export const getAllTailors = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return api.get(`/tailors${queryString ? `?${queryString}` : ""}`);
};

// Create tailor profile (for tailors)
export const createTailorProfile = (data) => api.post("/tailors", data);

// Get own tailor profile (for tailors)
export const getMyTailorProfile = () => api.get("/tailors/me");

import api from "./axios";

// Get all approved tailors (for customers)
export const getAllTailors = () => api.get("/tailors");

// Create tailor profile (for tailors)
export const createTailorProfile = (data) => api.post("/tailors", data);

// Get own tailor profile (for tailors)
export const getMyTailorProfile = () => api.get("/tailors/me");


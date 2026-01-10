import api from "./axios";

// Get all pending tailors (for admin)
export const getPendingTailors = () => api.get("/admin/pending-tailors");

// Approve tailor (for admin)
export const approveTailor = (tailorId) =>
  api.put(`/admin/approve-tailor/${tailorId}`);

// Reject tailor (for admin)
export const rejectTailor = (tailorId) =>
  api.put(`/admin/reject-tailor/${tailorId}`);

// Get all tailors (for admin)
export const getAllTailors = () => api.get("/admin/all-tailors");

// Get all customers (for admin)
export const getAllCustomers = () => api.get("/admin/all-customers");


import api from "./axios";

// Get all unapproved tailors (for admin)
export const getPendingTailors = () => api.get("/admin/pending-tailors");

// Approve tailor (for admin)
export const approveTailor = (tailorId) =>
  api.put(`/admin/approve-tailor/${tailorId}`);


import api from "./axios";

// Get all unapproved tailors
export const getPendingTailors = () =>
  api.get("/admin/pending-tailors");

// Approve tailor
export const approveTailor = (tailorId) =>
  api.put(`/admin/approve-tailor/${tailorId}`);

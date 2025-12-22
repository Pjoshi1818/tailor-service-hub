import api from "./axios";

export const getAllTailors = () => api.get("/tailors");


// create tailor profile
export const createTailorProfile = (data) =>
  api.post("/tailors", data);

// get own tailor profile (optional, future use)
export const getMyTailorProfile = () =>
  api.get("/tailors/me");


import api from "./axios";

export const getAllTailors = () => api.get("/tailors");

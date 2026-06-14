import api from "./axios";

export const createPost = (data) => api.post("/posts", data);

export const getPosts = () => api.get("/posts");

export const getPost = (id) => api.get(`/posts/${id}`);

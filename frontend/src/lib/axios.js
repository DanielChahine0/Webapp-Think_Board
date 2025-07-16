import axios from "axios";

// Created a dynamic URL for our API from axios
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export const checkAuth = async () => {
  try {
    const res = await api.get("/protected", { withCredentials: true });
    return res.status === 200;
  } catch {
    return false;
  }
};

export default api;
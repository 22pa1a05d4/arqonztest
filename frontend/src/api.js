// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true, // keep cookies/sessions if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming you store it here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

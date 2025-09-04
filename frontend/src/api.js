// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://arqonztest.onrender.com/api",
  withCredentials: true, // keep cookies/sessions if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log("📌 API Request:", config.baseURL + config.url, "Headers:", config.headers); // DEBUG
  return config;
});

export default api;

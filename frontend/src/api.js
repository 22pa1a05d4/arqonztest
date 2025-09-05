// frontend/src/api.js
import axios from "axios";

// Determine the correct API URL based on environment
const getApiUrl = () => {
  // If REACT_APP_API_URL is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // If we're on Vercel (production), use the Render backend
  if (window.location.hostname.includes('vercel.app')) {
    return "https://arqonztest.onrender.com/api";
  }
  
  // If we're on localhost, use local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return "http://localhost:5000/api";
  }
  
  // Default fallback
  return "https://arqonztest.onrender.com/api";
};

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true, // keep cookies/sessions if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log("📌 API Request:", config.baseURL + config.url, "Headers:", config.headers); // DEBUG
  console.log("📌 Environment:", {
    hostname: window.location.hostname,
    apiUrl: getApiUrl(),
    hasToken: !!token
  });
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("📌 API Error:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // If 401, clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // You might want to redirect to login here
      console.log("📌 Token expired or invalid, clearing token");
    }
    
    return Promise.reject(error);
  }
);

export default api;



// // frontend/src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "https://arqonztest.onrender.com/api",
//   withCredentials: true, // keep cookies/sessions if needed
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
  
//   console.log("📌 API Request:", config.baseURL + config.url, "Headers:", config.headers); // DEBUG
//   return config;
// });

// export default api;

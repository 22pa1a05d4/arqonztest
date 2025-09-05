// frontend/src/api.js
import axios from "axios";

// Function to decode JWT token (without verification)
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

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
    // Decode and check token
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = decodedToken.exp && decodedToken.exp < currentTime;
      
      console.log("📌 Token Details:", {
        userId: decodedToken.userId,
        exp: decodedToken.exp,
        currentTime: currentTime,
        isExpired: isExpired,
        expiresAt: decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : 'N/A'
      });
      
      if (isExpired) {
        console.log("📌 Token is expired! Clearing token and redirecting to login.");
        localStorage.removeItem("token");
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }
    }
    
    config.headers.Authorization = `Bearer ${token}`;
    console.log("📌 Token found and added to request:", token.substring(0, 20) + "...");
  } else {
    console.log("📌 No token found in localStorage!");
  }
  
  console.log("📌 API Request:", config.baseURL + config.url, "Headers:", config.headers); // DEBUG
  console.log("📌 Environment:", {
    hostname: window.location.hostname,
    apiUrl: getApiUrl(),
    hasToken: !!token,
    tokenLength: token ? token.length : 0
  });
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("📌 API Success:", {
      url: response.config?.url,
      status: response.status,
      dataLength: response.data?.length || 'N/A'
    });
    return response;
  },
  (error) => {
    console.error("📌 API Error Details:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      requestHeaders: error.config?.headers
    });
    
    // If 401, clear token and redirect to login
    if (error.response?.status === 401) {
      console.log("📌 401 Error - Token is invalid or expired");
      console.log("📌 Current token:", localStorage.getItem("token")?.substring(0, 50) + "...");
      localStorage.removeItem("token");
      // Redirect to login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;

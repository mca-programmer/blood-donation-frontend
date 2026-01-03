// src/api/axiosInstance.js
import axios from "axios";

// base URL of your backend server
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://blood-donation-backend-rouge.vercel.app/api";

// create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT or Firebase token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

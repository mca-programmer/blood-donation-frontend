import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Firebase imports
import app from "../firebase/firebase.jsx";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // User state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // Axios instance for backend APIs
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  });

  // ✅ FIX: Set token IMMEDIATELY when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []); // Empty dependency - runs once on mount

  // ✅ FIX: Also update token when user changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [user]);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && !user) {
        // Optionally sync with backend if needed
      }
    });
    return () => unsubscribe();
  }, []);

  // -------------------------
  // Email/Password Register
  // -------------------------
  const register = async (formData) => {
    try {
      setLoading(true);

      const { name, email, password, bloodGroup, district, upazila, avatar } = formData;

      // 1️⃣ Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await firebaseUpdateProfile(userCredential.user, {
        displayName: name,
        photoURL: avatar || "",
      });

      // 2️⃣ Send user to backend (extra fields)
      const res = await axiosInstance.post("/auth/register", {
        uid: userCredential.user.uid,
        name,
        email,
        bloodGroup,
        district,
        upazila,
        avatar: avatar || userCredential.user.photoURL,
      });

      // 3️⃣ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // ✅ FIX: Set token in axios headers immediately
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);

      navigate("/dashboard");
      alert("Registration Successful!");
    } catch (err) {
      console.error("Registration Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Email/Password Login
  // -------------------------
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // 1️⃣ Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Backend login with email AND password
      const res = await axiosInstance.post("/auth/login", { email, password });

      // 3️⃣ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // ✅ FIX: Set token in axios headers immediately
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Google Login
  // -------------------------
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      
      // 1️⃣ Firebase Google Sign-In
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // 2️⃣ Send to backend
      const res = await axiosInstance.post("/auth/google-login", {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        uid: firebaseUser.uid,
      });

      // 3️⃣ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // ✅ FIX: Set token in axios headers immediately
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err.message);
      alert(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Logout
  // -------------------------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // ✅ FIX: Remove token from axios headers
    delete axiosInstance.defaults.headers.common["Authorization"];
    
    navigate("/login");
  };

  // -------------------------
  // Update Profile
  // -------------------------
  const updateProfile = async (updatedData) => {
    try {
      if (updatedData.displayName && auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, { 
          displayName: updatedData.displayName 
        });
      }

      const res = await axiosInstance.put(`/users/${user._id}`, updatedData);
      
      const updatedUser = res.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      console.error("Update Profile Error:", err.response?.data?.message || err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    axiosInstance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
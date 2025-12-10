import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Firebase imports
import app from "../firebase/firebase.jsx"; // firebase.jsx
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
    baseURL: import.meta.env.VITE_API_URL, // Vite env variable
  });

  // Set token in axios headers if available
  useEffect(() => {
    if (user?.token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [user]);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser((prev) => ({
          ...prev,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        }));
      } else {
        setUser(null);
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
        avatar,
      });

      // 3️⃣ Combine backend + firebase data
      const combinedUser = { ...res.data, uid: userCredential.user.uid };
      setUser(combinedUser);
      localStorage.setItem("user", JSON.stringify(combinedUser));

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const res = await axiosInstance.post("/auth/login", { email });

      const combinedUser = {
        ...res.data,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
      };
      setUser(combinedUser);
      localStorage.setItem("user", JSON.stringify(combinedUser));
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
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Optionally send firebase user to backend
      const res = await axiosInstance.post("/auth/google-login", {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        uid: firebaseUser.uid,
      });

      const combinedUser = { ...res.data, uid: firebaseUser.uid, displayName: firebaseUser.displayName };
      setUser(combinedUser);
      localStorage.setItem("user", JSON.stringify(combinedUser));
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
    navigate("/login");
  };

  // -------------------------
  // Update Profile
  // -------------------------
  const updateProfile = async (updatedData) => {
    try {
      if (updatedData.displayName && auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, { displayName: updatedData.displayName });
      }

      const res = await axiosInstance.put(`/users/${user._id}`, updatedData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
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

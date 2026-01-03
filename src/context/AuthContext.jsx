import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
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

  //  FIX: Create axios instance ONCE using useMemo
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL:
        import.meta.env.VITE_API_URL ||
        "https://blood-donation-backend-rouge.vercel.app/api",
    });

    //  Request Interceptor - Always add fresh token from localStorage
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //  Response Interceptor - Handle 401 errors
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          console.error("401 Unauthorized - Clearing auth data");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []); // Empty array - create only ONCE

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && !user) {
        // Optionally sync with backend if needed
      }
    });
    return () => unsubscribe();
  }, [user]);

  // -------------------------
  // Email/Password Register
  // -------------------------
  const register = async (formData) => {
    try {
      setLoading(true);
      console.log(" Registration started with data:", formData);

      const { name, email, password, bloodGroup, district, upazila, avatar } =
        formData;

      // 1️ Firebase authentication
      console.log(" Creating Firebase user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await firebaseUpdateProfile(userCredential.user, {
        displayName: name,
        photoURL: avatar || "",
      });
      console.log(" Firebase user created");

      // 2️ Send user to backend WITH PASSWORD
      console.log(" Sending to backend with password...");
      const res = await axiosInstance.post("/auth/register", {
        uid: userCredential.user.uid,
        name,
        email,
        password,
        bloodGroup,
        district,
        upazila,
        avatar: avatar || userCredential.user.photoURL,
      });
      console.log(" Backend registration successful");

      // 3️ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      navigate("/dashboard");
      alert("Registration Successful!");
    } catch (err) {
      console.error(
        " Registration Error:",
        err.response?.data?.message || err.message
      );
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
      console.log(" Login started for:", email);

      // 1️ Firebase authentication
      console.log(" Firebase login...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(" Firebase login successful");

      // 2 Backend login with email AND password
      console.log(" Backend login...");
      const res = await axiosInstance.post("/auth/login", { email, password });
      console.log(" Backend login successful");

      // 3 Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.error(
        " Login Error:",
        err.response?.data?.message || err.message
      );
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

      // 1️ Firebase Google Sign-In
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // 2️ Send to backend
      const res = await axiosInstance.post("/auth/google-login", {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        uid: firebaseUser.uid,
      });

      // 3️ Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

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

    navigate("/login");
  };

  // -------------------------
  // Update Profile
  // -------------------------
  const updateProfile = async (updatedData) => {
    try {
      if (updatedData.displayName && auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: updatedData.displayName,
        });
      }

      const res = await axiosInstance.put(`/users/${user._id}`, updatedData);

      const updatedUser = res.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return updatedUser;
    } catch (err) {
      console.error(
        "Update Profile Error:",
        err.response?.data?.message || err.message
      );
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

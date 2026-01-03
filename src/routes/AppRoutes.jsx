// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import DonationRequests from "../pages/DonationRequests";
import DonationDetails from "../pages/DonationDetails";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllBloodRequests from "../pages/Dashboard/AllBloodRequests";
import Funding from "../pages/Funding";
import NotFound from "../pages/Notfound";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/donation-requests" element={<DonationRequests />} />
      
      {/* /donation-requests/:id to /donation/:id */}
      <Route path="/donation/:id" element={<DonationDetails />} />

      {/* ==================== DASHBOARD ROUTES ==================== */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
      <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/dashboard/my-donation-requests" element={<PrivateRoute><MyDonationRequests /></PrivateRoute>} />
      <Route path="/dashboard/create-donation-request" element={<PrivateRoute><CreateDonationRequest /></PrivateRoute>} />

      {/* ==================== ADMIN ROUTES ==================== */}
      <Route path="/dashboard/all-users" element={<AdminRoute><AllUsers /></AdminRoute>} />
      <Route path="/dashboard/all-blood-requests" element={<AdminRoute><AllBloodRequests /></AdminRoute>} />
      <Route path="/funding" element={<AdminRoute><Funding /></AdminRoute>} />

      {/* ==================== FALLBACK ==================== */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
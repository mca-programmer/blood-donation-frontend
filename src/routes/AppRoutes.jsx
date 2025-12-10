// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import DonationRequests from "../pages/DonationRequests";
import DonationDetails from "../pages/DonationDetails";
import Funding from "../pages/Funding";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllBloodRequests from "../pages/Dashboard/AllBloodRequests";

import { useAuth } from "../context/AuthContext";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/donation-requests" element={<DonationRequests />} />
      <Route path="/donation-requests/:id" element={<PrivateRoute><DonationDetails /></PrivateRoute>} />
      <Route path="/funding" element={<PrivateRoute><Funding /></PrivateRoute>} />

      {/* Dashboard Routes */}
      <Route path="/dashboard">
        <Route index element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="my-donation-requests" element={<PrivateRoute><MyDonationRequests /></PrivateRoute>} />
        <Route path="create-donation-request" element={<PrivateRoute><CreateDonationRequest /></PrivateRoute>} />
        <Route path="all-users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
        <Route path="all-blood-requests" element={<PrivateRoute><AllBloodRequests /></PrivateRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

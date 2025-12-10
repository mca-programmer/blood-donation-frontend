// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { path: "/dashboard", label: "Home" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/my-donation-requests", label: "My Requests" },
    { path: "/dashboard/create-donation-request", label: "Create Request" },
  ];

  if (user?.role === "admin") {
    links.push({ path: "/dashboard/all-users", label: "All Users" });
    links.push({ path: "/dashboard/all-blood-requests", label: "All Requests" });
    links.push({ path: "/dashboard/funding", label: "Funding" });
  }

  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4 hidden md:block">
      <ul className="menu p-2 rounded-box">
        {links.map((link) => (
          <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from '../assets/Blood logo.png'; // ✅ import correctly

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
    links.push({ path: "/funding", label: "Funding" });
  }

  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="BloodDonate Logo" className="w-10 h-10" />
          <span className="text-red-500 font-bold text-xl ml-2">BloodDonate</span>
        </Link>
      </div>

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

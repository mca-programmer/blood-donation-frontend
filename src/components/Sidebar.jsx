// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHome, FiUser, FiFileText, FiPlusCircle, FiUsers, FiArchive, FiDollarSign, FiMenu, FiX } from "react-icons/fi";
import Logo from '../assets/Blood logo.png';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { path: "/dashboard", label: "Home", icon: <FiHome /> },
    { path: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
    { path: "/dashboard/my-donation-requests", label: "My Requests", icon: <FiFileText /> },
    { path: "/dashboard/create-donation-request", label: "Create Request", icon: <FiPlusCircle /> },
  ];

  if (user?.role === "admin") {
    links.push({ path: "/dashboard/all-users", label: "All Users", icon: <FiUsers /> });
    links.push({ path: "/dashboard/all-blood-requests", label: "All Requests", icon: <FiArchive /> });
    links.push({ path: "/funding", label: "Funding", icon: <FiDollarSign /> });
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-gray-800 w-64 min-h-screen p-4 hidden md:block text-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="BloodDonate Logo" className="w-10 h-10" />
            <span className="text-red-500 font-bold text-xl ml-2">BloodDonate</span>
          </Link>
        </div>

        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 
                  ${location.pathname === link.path ? "bg-red-500 text-white" : "hover:bg-red-600 hover:text-white"}`}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-start justify-between bg-gray-800 px-4 py-3 text-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="BloodDonate Logo" className="w-8 h-8" />
          <span className="text-red-500 font-bold text-lg">BloodDonate</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-gray-200 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-red-500 font-bold text-xl">Menu</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 
                  ${location.pathname === link.path ? "bg-red-500 text-white" : "hover:bg-red-600 hover:text-white"}`}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

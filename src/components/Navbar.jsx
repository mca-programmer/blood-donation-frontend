// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white text-red-400 container mx-auto shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-600">
        BloodDonate
      </Link>

      <ul className="flex items-center space-x-4">
        <li>
          <Link
            to="/donation-requests"
            className="btn btn-sm btn-primary hover:text-red-500"
          >
            Requests
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login" className="btn btn-sm btn-outline btn-primary">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <li className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost rounded-btn">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

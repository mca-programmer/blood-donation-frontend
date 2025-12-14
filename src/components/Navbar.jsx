// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Blood logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const centerMenu = [
    { label: "Home", path: "/" },
    { label: "Requests", path: "/donation-requests" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-red-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="BloodDonate Logo" className="w-9 h-9" />
            <span className="text-2xl font-bold text-red-600">BloodDonate</span>
          </Link>
        </div>

        {/* Center: Menu */}
        <ul className="hidden md:flex items-center space-x-4">
          {centerMenu.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-700 border-none"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth Buttons / Dashboard */}
        <div className="hidden md:flex items-center space-x-2">
          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-outline border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-red-500 text-white hover:bg-red-700 border-none"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-sm btn-ghost rounded-full p-0"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-red-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold border-2 border-red-500">
                    {user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : user?.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard" className="text-red-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:bg-red-50 w-full text-left px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-red-600 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-red-100 shadow-lg px-6 pb-4 animate-slideDown">
          <ul className="space-y-3 pt-4">
            {centerMenu.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="group relative block px-3 py-2 rounded-lg font-medium text-red-600 transition-all duration-300
                       hover:bg-red-50 hover:pl-5 hover:text-red-700"
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-red-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  {item.label}
                </Link>
              </li>
            ))}

            {!user && ["Login", "Register"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="group relative block px-3 py-2 rounded-lg text-red-600 transition-all duration-300
                       hover:bg-red-50 hover:pl-5 hover:text-red-700"
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-red-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  {item}
                </Link>
              </li>
            ))}

            {user && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="group relative block px-3 py-2 rounded-lg text-red-600 transition-all duration-300
                         hover:bg-red-50 hover:pl-5 hover:text-red-700"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-red-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="group relative w-full text-left px-3 py-2 rounded-lg text-red-600 transition-all duration-300
                         hover:bg-red-50 hover:pl-5 hover:text-red-700"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-red-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

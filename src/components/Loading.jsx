// src/components/Loading.jsx
import React from "react";
import Logo from "../assets//Blood logo.png";

const Loading = ({ text = "Loading, please wait..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
      
      <div className="flex flex-col items-center text-center space-y-5">
        
        {/* Logo */}
        <div className="relative">
          <img
            src={Logo}
            alt="BloodDonate Logo"
            className="w-20 h-20 md:w-24 md:h-24 animate-pulse"
          />

          {/* Spinner ring */}
          <span className="absolute inset-0 rounded-full border-4 border-red-200 border-t-red-600 animate-spin"></span>
        </div>

        {/* Brand name */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-red-600 tracking-wide">
          BloodDonate
        </h2>

        {/* Loading text */}
        <p className="text-gray-600 text-sm md:text-base animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loading;

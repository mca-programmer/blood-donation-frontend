// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} BloodDonate. All rights reserved.
        </p>
        <p>
          <a
            href="mailto:support@blooddonate.com"
            className="text-red-400 hover:underline"
          >
            support@blooddonate.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

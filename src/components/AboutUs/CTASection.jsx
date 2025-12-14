// src/components/CTASection.jsx
import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-12 bg-red-600 container mx-auto text-white ">
      <div className=" px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Save Lives?</h2>
        <p className="mb-8">Join our community of donors or create a blood request to help someone in need today.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-50 transition"
          >
            Become a Donor
          </Link>
          <Link
            to="/dashboard/create-donation-request"
            className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-red-600 transition"
          >
            Create a Blood Request
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

// src/components/StatsSection.jsx
import React from "react";

const stats = [
  { label: "Total Donors", value: 1200 },
  { label: "Blood Requests Fulfilled", value: 850 },
  { label: "Lives Saved", value: 500 },
  { label: "Active Volunteers", value: 320 }, // extra stat for demo
];

const StatsSection = () => {
  return (
    <section className="bg-red-50 py-12 container mx-auto ">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Our Achievements</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-4xl sm:text-4xl font-extrabold text-red-600 mb-2">{stat.value}</p>
              <p className="text-gray-700 font-medium text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

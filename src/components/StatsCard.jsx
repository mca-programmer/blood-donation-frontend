// src/components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, count, icon }) => {
  return (
    <div className="card bg-white shadow p-4 rounded-lg flex items-center space-x-4">
      <div className="text-3xl text-red-500">{icon}</div>
      <div>
        <h4 className="text-gray-500">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default StatsCard;

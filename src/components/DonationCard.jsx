// src/components/DonationCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const DonationCard = ({ donation }) => {
  return (
    <div className="card bg-white shadow-md p-4 rounded-lg mb-4">
      <h3 className="font-bold text-lg">{donation.recipientName}</h3>
      <p className="text-sm text-gray-800">
        {donation.recipientDistrict}, {donation.recipientUpazila}
      </p>
      <p className="text-sm">Blood Group: {donation.bloodGroup}</p>
      <p className="text-sm">Date: {donation.date}</p>
      <p className="text-sm">Time: {donation.time}</p>
      <p
        className={`badge ${
          donation.status === "pending"
            ? "badge-warning"
            : donation.status === "inprogress"
            ? "badge-info"
            : "badge-success"
        }`}
      >
        {donation.status}
      </p>
      <div className="mt-2 flex space-x-2">
        <Link
          to={`/donation/${donation._id}`}
          className="btn btn-xs btn-primary"
        >
          View
        </Link>
        {/* Add edit/delete buttons conditionally based on role/status */}
      </div>
    </div>
  );
};

export default DonationCard;
